<script>
  import { onMount } from 'svelte';
  import { db } from '../firebase.js';
  import { collection, getDocs } from 'firebase/firestore';

  let gamesDatabase = [];
  let favorites = [];

  onMount(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'games'));
      gamesDatabase = snapshot.docs.map(doc => doc.data());
    } catch(e) {
      console.error('Error fetching games:', e);
    }

    try {
      const stored = localStorage.getItem('beeboard_favorites');
      if (stored) favorites = JSON.parse(stored) || [];
    } catch(e) {}
    
    // Listen to changes from Library.svelte or other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'beeboard_favorites') {
        favorites = JSON.parse(e.newValue) || [];
      }
    });

    window.addEventListener('local-storage', () => {
      const stored = localStorage.getItem('beeboard_favorites');
      if (stored) favorites = JSON.parse(stored) || [];
    });
  });

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
    } else {
      favorites = [...favorites, id];
    }
    localStorage.setItem('beeboard_favorites', JSON.stringify(favorites));
    window.dispatchEvent(new Event('local-storage'));
  }
  
  // Filter for featured games (Reactive!)
  $: featuredGames = gamesDatabase.filter(g => g.featured);
</script>

<section id="featured" class="section-padding" style="border-top: 1px solid var(--color-border);">
  <div class="container">
    <div class="section-header">
      <span class="section-badge"><i class="fa-solid fa-crown"></i> Curated Favorites</span>
      <h2>Staff Picks & Best of the Hive</h2>
      <p>Hand-selected tabletop jewels recommended by our lead Game Masters for guaranteed fun.</p>
    </div>

    <div id="staff-picks-container" class="featured-grid">
      {#if featuredGames.length === 0}
        <p style="text-align: center; color: var(--color-text-muted);">Loading Staff Picks from the cloud...</p>
      {/if}
      {#each featuredGames as game}
        <div class="game-card">
          <div class="game-card-header">
            <i class="fa-solid {game.icon} game-icon-visual"></i>
            <span class="game-badge-tag">Staff Favorite</span>
            <button class="fav-btn" class:is-favorited={favorites.includes(game.id)} on:click={() => toggleFavorite(game.id)} aria-label="Toggle favorite">
              <i class="fa-heart {favorites.includes(game.id) ? 'fa-solid' : 'fa-regular'}"></i>
            </button>
          </div>
          <div class="game-card-body">
            <h3 class="game-title">{game.title}</h3>
            <div class="game-meta-pills">
              <span class="meta-pill"><i class="fa-solid fa-users"></i> {game.players}</span>
              <span class="meta-pill"><i class="fa-solid fa-clock"></i> {game.duration}</span>
              <span class="meta-pill"><i class="fa-solid fa-gauge-high"></i> {game.complexity}</span>
            </div>
            <p class="game-desc">{game.desc}</p>
            <button class="btn btn-outline" style="width: 100%; margin-top: auto;">Reserve Table</button>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
