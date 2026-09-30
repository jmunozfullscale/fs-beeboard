<script>
  import { onMount, onDestroy } from 'svelte';
  import { auth, db } from '../firebase.js';
  import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
  import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

  let user = null;
  let email = '';
  let password = '';
  let errorMsg = '';
  let games = [];
  
  // New Game Form
  let newTitle = '';
  let newPlayers = '';
  let newDuration = '';
  let newComplexity = 'Medium';
  let newCategory = 'strategy';
  let newDesc = '';
  let newIcon = 'fa-dice';
  let isFeatured = false;

  const unsubscribe = onAuthStateChanged(auth, (u) => {
    user = u;
    if (user) {
      loadGames();
    }
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function login() {
    try {
      errorMsg = '';
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      errorMsg = 'Invalid email or password.';
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function loadGames() {
    const snap = await getDocs(collection(db, 'games'));
    games = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }

  async function addGame() {
    if (!newTitle) return;
    try {
      const newGame = {
        title: newTitle,
        players: newPlayers,
        duration: newDuration,
        complexity: newComplexity,
        category: newCategory,
        desc: newDesc,
        icon: newIcon,
        featured: isFeatured,
        playerCount: getPlayerCountCategory(newPlayers),
        playtime: getPlaytimeCategory(newDuration)
      };
      
      // Auto-generate ID or let Firestore do it
      const docRef = await addDoc(collection(db, 'games'), newGame);
      newGame.id = docRef.id;
      games = [...games, newGame];
      
      // Reset form
      newTitle = ''; newPlayers = ''; newDesc = '';
    } catch (e) {
      alert("Error adding game: " + e.message);
    }
  }

  async function deleteGame(id) {
    if (!confirm("Are you sure you want to delete this game?")) return;
    try {
      await deleteDoc(doc(db, 'games', id));
      games = games.filter(g => g.id !== id);
    } catch(e) {
      alert("Error deleting game: " + e.message);
    }
  }

  function getPlayerCountCategory(p) {
    if (p.includes('1')) return 'Solo';
    if (p.includes('2') && !p.includes('3') && !p.includes('4')) return '2P';
    if (p.includes('5') || p.includes('6')) return '5+';
    return '3-4';
  }

  function getPlaytimeCategory(d) {
    if (d.includes('15') || d.includes('20')) return 'short';
    if (d.includes('90') || d.includes('120')) return 'long';
    return 'medium';
  }
</script>

<section id="admin-panel" class="section-padding bg-surface" style="min-height: 80vh;">
  <div class="container">
    
    {#if !user}
      <div class="admin-login-card" style="max-width: 400px; margin: 4rem auto; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; margin-bottom: 1.5rem; color: var(--color-primary);"><i class="fa-solid fa-lock"></i> Game Master Login</h2>
        {#if errorMsg}
          <div style="background: #ffebee; color: #c62828; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem; font-size: 0.9rem;">{errorMsg}</div>
        {/if}
        <form on:submit|preventDefault={login}>
          <div style="margin-bottom: 1rem;">
            <label for="admin-email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
            <input id="admin-email" type="email" bind:value={email} required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 4px;">
          </div>
          <div style="margin-bottom: 1.5rem;">
            <label for="admin-password" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Password</label>
            <input id="admin-password" type="password" bind:value={password} required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 4px;">
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Access Database</button>
        </form>
      </div>
    {:else}
      <div class="admin-dashboard">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid var(--color-border); padding-bottom: 1rem;">
          <h2><i class="fa-solid fa-database"></i> Database Management</h2>
          <button class="btn btn-outline" on:click={logout}><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
          <!-- Add New Game Form -->
          <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid var(--color-border);">
            <h3 style="margin-bottom: 1rem; color: var(--color-secondary);">Add New Game</h3>
            <form on:submit|preventDefault={addGame}>
              <input type="text" bind:value={newTitle} placeholder="Game Title" required style="width: 100%; margin-bottom: 1rem; padding: 0.5rem;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <input type="text" bind:value={newPlayers} placeholder="Players (e.g. 1-4)" required style="padding: 0.5rem;">
                <input type="text" bind:value={newDuration} placeholder="Time (e.g. 45m)" required style="padding: 0.5rem;">
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <select bind:value={newCategory} style="padding: 0.5rem;">
                  <option value="cozy">Cozy & Gateway</option>
                  <option value="strategy">Strategy & Euro</option>
                  <option value="party">Party & Bluffing</option>
                  <option value="coop">Cooperative</option>
                  <option value="twoplayer">Two-Player Duels</option>
                </select>
                <select bind:value={newComplexity} style="padding: 0.5rem;">
                  <option value="Light">Light</option>
                  <option value="Medium">Medium</option>
                  <option value="Heavy">Heavy</option>
                </select>
              </div>
              <textarea bind:value={newDesc} placeholder="Short Description..." required style="width: 100%; height: 80px; margin-bottom: 1rem; padding: 0.5rem;"></textarea>
              <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; cursor: pointer;">
                <input type="checkbox" bind:checked={isFeatured}> Feature in Staff Picks
              </label>
              <button type="submit" class="btn btn-primary" style="width: 100%;">Add to Database</button>
            </form>
          </div>

          <!-- Game List -->
          <div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid var(--color-border); max-height: 600px; overflow-y: auto;">
            <h3 style="margin-bottom: 1rem; color: var(--color-secondary);">Current Inventory ({games.length})</h3>
            {#if games.length === 0}
              <p>Loading...</p>
            {/if}
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              {#each games as game}
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #eee; border-radius: 8px;">
                  <div>
                    <h4 style="margin: 0; color: var(--color-text-dark);">{game.title}</h4>
                    <span style="font-size: 0.85rem; color: var(--color-text-muted);">{game.category} • {game.players} • {game.duration}</span>
                  </div>
                  <button on:click={() => deleteGame(game.id)} style="background: none; border: none; color: #e53935; cursor: pointer; padding: 0.5rem;"><i class="fa-solid fa-trash"></i></button>
                </div>
              {/each}
            </div>
          </div>
        </div>

      </div>
    {/if}
  </div>
</section>
