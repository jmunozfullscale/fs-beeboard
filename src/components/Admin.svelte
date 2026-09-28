<script>
  import { auth, db } from '../lib/firebase';
  import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
  import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
  import { onMount } from 'svelte';

  let email = '';
  let password = '';
  let user = null;
  let errorMsg = '';
  let games = [];

  let newTitle = '';
  let newCategory = 'cozy';
  let newPlayers = '';
  let newDuration = '';
  let newComplexity = 'Light';
  let newDesc = '';
  let newIcon = 'fa-dice';
  let newFeatured = false;

  onMount(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      user = u;
      if (user) loadGames();
    });
    return unsubscribe;
  });

  async function loadGames() {
    try {
      const snap = await getDocs(collection(db, 'games-oneshot'));
      games = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (e) {
      console.error(e);
    }
  }

  async function login() {
    try {
      errorMsg = '';
      await signInWithEmailAndPassword(auth, email, password);
    } catch(e) {
      errorMsg = e.message;
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function addGame() {
    try {
      await addDoc(collection(db, 'games-oneshot'), {
        title: newTitle,
        category: newCategory,
        players: newPlayers,
        duration: newDuration,
        complexity: newComplexity,
        desc: newDesc,
        icon: newIcon,
        featured: newFeatured
      });
      alert('Game added successfully!');
      newTitle = ''; newPlayers = ''; newDuration = ''; newDesc = ''; newFeatured = false;
      loadGames();
    } catch(e) {
      alert('Error: ' + e.message);
    }
  }

  async function removeGame(id) {
    if (confirm('Are you sure you want to delete this game?')) {
      try {
        await deleteDoc(doc(db, 'games-oneshot', id));
        loadGames();
      } catch(e) {
        alert('Error: ' + e.message);
      }
    }
  }
</script>

<section id="admin" class="section-padding" style="background-color: var(--color-bg-surface); min-height: 80vh;">
  <div class="container">
    <div class="section-header">
      <span class="section-badge"><i class="fa-solid fa-lock"></i> Game Master Portal</span>
      <h2>Admin Dashboard</h2>
    </div>

    {#if !user}
      <div class="reservation-card" style="max-width: 400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 12px; box-shadow: var(--shadow-sm);">
        <form on:submit|preventDefault={login}>
          <div class="form-field" style="margin-bottom: 1rem;">
            <label for="admin-email">Email</label>
            <input type="email" id="admin-email" bind:value={email} style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 6px;" required>
          </div>
          <div class="form-field" style="margin-bottom: 1rem;">
            <label for="admin-pwd">Password</label>
            <input type="password" id="admin-pwd" bind:value={password} style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 6px;" required>
          </div>
          {#if errorMsg}
            <p style="color: red; margin-bottom: 1rem; font-size: 0.9rem;">{errorMsg}</p>
          {/if}
          <button type="submit" class="btn btn-primary btn-block" style="width: 100%; padding: 0.75rem;">Login</button>
        </form>
      </div>
    {:else}
      <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: var(--shadow-sm);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <h3>Welcome, {user.email}</h3>
          <button class="btn" style="background: #e2e8f0; padding: 0.5rem 1rem; border-radius: 6px;" on:click={logout}>Logout</button>
        </div>

        <h4>Add New Game</h4>
        <form on:submit|preventDefault={addGame} style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; background: var(--color-bg-ivory); padding: 1.5rem; border: 1px solid var(--color-border); border-radius: 8px;">
          <div class="form-field">
            <label>Title</label>
            <input type="text" bind:value={newTitle} style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border); border-radius: 6px;" required>
          </div>
          <div class="form-field">
            <label>Category</label>
            <select bind:value={newCategory} style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border); border-radius: 6px;">
              <option value="cozy">Cozy & Gateway</option>
              <option value="strategy">Strategy & Euro</option>
              <option value="party">Party & Bluffing</option>
              <option value="coop">Cooperative</option>
              <option value="twoplayer">Two-Player Duels</option>
            </select>
          </div>
          <div class="form-field">
            <label>Players (e.g. 1-4)</label>
            <input type="text" bind:value={newPlayers} style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border); border-radius: 6px;" required>
          </div>
          <div class="form-field">
            <label>Duration (e.g. 30-60m)</label>
            <input type="text" bind:value={newDuration} style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border); border-radius: 6px;" required>
          </div>
          <div class="form-field">
            <label>Complexity (e.g. Light)</label>
            <input type="text" bind:value={newComplexity} style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border); border-radius: 6px;" required>
          </div>
          <div class="form-field">
            <label>Icon Class (e.g. fa-dice)</label>
            <input type="text" bind:value={newIcon} style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border); border-radius: 6px;" required>
          </div>
          <div class="form-field" style="grid-column: span 2;">
            <label>Description</label>
            <input type="text" bind:value={newDesc} style="width: 100%; padding: 0.5rem; border: 1px solid var(--color-border); border-radius: 6px;" required>
          </div>
          <div class="form-field" style="grid-column: span 2; display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" bind:checked={newFeatured} id="isFeatured">
            <label for="isFeatured" style="margin: 0;">Featured (Staff Pick)</label>
          </div>
          <button type="submit" class="btn btn-primary" style="grid-column: span 2; padding: 0.75rem;">Add Game</button>
        </form>

        <h4>Manage Existing Games</h4>
        <div style="max-height: 400px; overflow-y: auto; border: 1px solid var(--color-border); border-radius: 8px;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
              <tr style="background: var(--color-bg-surface); border-bottom: 1px solid var(--color-border);">
                <th style="padding: 0.75rem;">Title</th>
                <th style="padding: 0.75rem;">Category</th>
                <th style="padding: 0.75rem;">Action</th>
              </tr>
            </thead>
            <tbody>
              {#each games as game}
                <tr style="border-bottom: 1px solid #eee;">
                  <td style="padding: 0.75rem;">{game.title}</td>
                  <td style="padding: 0.75rem;">{game.category}</td>
                  <td style="padding: 0.75rem;">
                    <button style="color: red; background: none; border: none; cursor: pointer; font-weight: bold;" on:click={() => removeGame(game.id)}>Delete</button>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    {/if}
  </div>
</section>
