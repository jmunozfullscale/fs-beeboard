<script>
  import { onMount, onDestroy } from 'svelte';
  import { auth } from '../firebase.js';
  import { onAuthStateChanged } from 'firebase/auth';
  import { login as loginService, logout as logoutService, loadGames as loadGamesService, addGame as addGameService, deleteGame as deleteGameService } from '../services/adminService.js';

  import LoginForm from './LoginForm.svelte';
  import AddGameForm from './AddGameForm.svelte';
  import GameList from './GameList.svelte';

  let user = null;
  let errorMsg = '';
  let games = [];

  const unsubscribe = onAuthStateChanged(auth, (u) => {
    user = u;
    if (user) {
      fetchGames();
    }
  });

  onDestroy(() => {
    unsubscribe();
  });

  async function handleLogin(email, password) {
    try {
      errorMsg = '';
      await loginService(email, password);
    } catch (e) {
      errorMsg = 'Invalid email or password.';
    }
  }

  async function handleLogout() {
    await logoutService();
  }

  async function fetchGames() {
    games = await loadGamesService();
  }

  async function handleAddGame(newGame) {
    try {
      const addedGame = await addGameService(newGame);
      games = [...games, addedGame];
    } catch (e) {
      alert("Error adding game: " + e.message);
    }
  }

  async function handleDeleteGame(id) {
    if (!confirm("Are you sure you want to delete this game?")) return;
    try {
      await deleteGameService(id);
      games = games.filter(g => g.id !== id);
    } catch(e) {
      alert("Error deleting game: " + e.message);
    }
  }
</script>

<section id="admin-panel" class="section-padding bg-surface" style="min-height: 80vh;">
  <div class="container">
    
    {#if !user}
      <LoginForm onLogin={handleLogin} errorMsg={errorMsg} />
    {:else}
      <div class="admin-dashboard">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid var(--color-border); padding-bottom: 1rem;">
          <h2><i class="fa-solid fa-database"></i> Database Management</h2>
          <button class="btn btn-outline" on:click={handleLogout}><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
          <AddGameForm onAdd={handleAddGame} />
          <GameList {games} onDelete={handleDeleteGame} />
        </div>

      </div>
    {/if}
  </div>
</section>
