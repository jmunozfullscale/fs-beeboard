<script>
  import { onMount } from 'svelte';
  import { db } from '../firebase.js';
  import { collection, getDocs } from 'firebase/firestore';

  const categoryLabels = {
    cozy: 'Cozy & Gateway',
    strategy: 'Strategy & Euro',
    party: 'Party & Bluffing',
    coop: 'Cooperative',
    twoplayer: 'Two-Player Duels'
  };

  let gamesDatabase = [];
  let activeCategory = 'all';
  let activePlayerCount = 'all';
  let activePlaytime = 'all';
  let searchQuery = '';
  let showFavoritesOnly = false;
  let favorites = [];

  let gridRef;

  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      favorites = favorites.filter(fav => fav !== id);
    } else {
      favorites = [...favorites, id];
    }
    localStorage.setItem('beeboard_favorites', JSON.stringify(favorites));
    window.dispatchEvent(new Event('local-storage'));
  }

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

    window.addEventListener('local-storage', () => {
      const stored = localStorage.getItem('beeboard_favorites');
      if (stored) favorites = JSON.parse(stored) || [];
    });
  });

  $: filteredGames = gamesDatabase.filter(g => {
    if (showFavoritesOnly && !favorites.includes(g.id)) return false;
    if (activeCategory !== 'all' && g.category !== activeCategory) return false;
    if (activePlayerCount !== 'all' && g.playerCount !== activePlayerCount) return false;
    if (activePlaytime !== 'all' && g.playtime !== activePlaytime) return false;
    if (searchQuery) {
      const sq = searchQuery.toLowerCase();
      if (!g.title.toLowerCase().includes(sq) && !g.desc.toLowerCase().includes(sq)) return false;
    }
    return true;
  });

  function scroll(dir) {
    if (gridRef) {
      gridRef.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  }
</script>

<section id="library" class="section-padding bg-surface" style="background-color: var(--color-bg-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <div class="section-header">
      <span class="section-badge"><i class="fa-solid fa-boxes-stacked"></i> {gamesDatabase.length}+ Titles</span>
      <h2>The Hive Library</h2>
      <p>Filter by genre, player count, or available time to discover your next favorite game.</p>
    </div>

    <!-- Interactive Multi-Criteria Filter Control Panel -->
    <div class="library-filter-panel">
      <!-- Search Input Wrapper (Newly added in Svelte for quick Library search) -->
      <div style="margin-bottom: 1.5rem; display: flex; justify-content: center;">
        <input type="text" placeholder="Search games..." bind:value={searchQuery} style="padding: 0.5rem 1rem; border-radius: var(--radius-sm); border: 1px solid var(--color-border); width: 100%; max-width: 400px; font-size: 1rem;">
      </div>
      
      <div class="filter-group-row">
        <!-- Category Filter Row -->
        <div class="filter-group">
          <span class="filter-label"><i class="fa-solid fa-layer-group"></i> Category:</span>
          <div class="filter-buttons-wrapper">
            {#each [['all', 'All Games'], ['cozy', 'Cozy & Gateway'], ['strategy', 'Strategy & Euro'], ['party', 'Party & Bluffing'], ['coop', 'Cooperative'], ['twoplayer', 'Two-Player Duels']] as [val, label]}
              <button class="filter-btn" class:active={activeCategory === val} on:click={() => {activeCategory = val; showFavoritesOnly = false;}}>{label}</button>
            {/each}
          </div>
        </div>

        <!-- Player Count Filter Row -->
        <div class="filter-group">
          <span class="filter-label"><i class="fa-solid fa-users"></i> Players:</span>
          <div class="filter-buttons-wrapper">
            {#each [['all', 'All Player Counts'], ['Solo', 'Solo'], ['2P', '2P Only'], ['3-4', '3 - 4P'], ['5+', '5P+']] as [val, label]}
              <button class="filter-btn" class:active={activePlayerCount === val} on:click={() => {activePlayerCount = val; showFavoritesOnly = false;}}>{label}</button>
            {/each}
          </div>
        </div>

        <!-- Playtime Filter Row -->
        <div class="filter-group">
          <span class="filter-label"><i class="fa-solid fa-clock"></i> Playtime:</span>
          <div class="filter-buttons-wrapper">
            {#each [['all', 'All Playtimes'], ['short', '< 30m'], ['medium', '30m - 60m'], ['long', '> 60m']] as [val, label]}
              <button class="filter-btn" class:active={activePlaytime === val} on:click={() => {activePlaytime = val; showFavoritesOnly = false;}}>{label}</button>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <!-- Scroller Controls Header -->
    <div class="library-scroller-controls">
      <div>
        <h3 style="font-size: 1.35rem; color: var(--color-text-dark);">Available Games Vault</h3>
        <span id="library-count" style="font-size: 0.85rem; font-weight: 700; color: var(--color-secondary);">{filteredGames.length} Titles Found</span>
      </div>

      <div style="display: flex; align-items: center; gap: 1rem;">
        <button id="favorites-filter-btn" class="btn-favorites-filter" class:active={showFavoritesOnly} on:click={() => showFavoritesOnly = !showFavoritesOnly} aria-label="Toggle favorites filter">
          <i class="fa-solid fa-heart"></i>
          <span>My Favorites</span>
          {#if favorites.length > 0}
            <span class="favorites-count-badge">{favorites.length}</span>
          {/if}
        </button>
        <div class="scroll-nav-btns">
          <button class="scroll-nav-btn" on:click={() => scroll(-1)} aria-label="Scroll left"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="scroll-nav-btn" on:click={() => scroll(1)} aria-label="Scroll right"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </div>

    <!-- Horizontal Scroller Container (Game Cards Rendered Here) -->
    <div id="library-grid" class="library-horizontal-grid" bind:this={gridRef}>
      {#if gamesDatabase.length === 0}
        <div style="flex: 1; text-align: center; padding: 4rem 1rem;" class="card">
          <h3 style="color: var(--color-primary); margin-bottom: 1rem;">Fetching Games from Firestore...</h3>
        </div>
      {:else if filteredGames.length === 0}
        <div style="flex: 1; text-align: center; padding: 4rem 1rem;" class="card">
          <i class="fa-solid fa-face-meh" style="font-size: 3rem; color: var(--color-primary); margin-bottom: 1rem;"></i>
          <h3>No games match your selected criteria.</h3>
          <p style="color: var(--color-text-muted);">Try resetting or broadening your filters!</p>
        </div>
      {:else}
        {#each filteredGames as game}
          <div class="library-card">
            <div class="library-card-photo">
              <i class="fa-solid {game.icon} library-photo-icon"></i>
              <button class="fav-btn fav-btn-sm" class:is-favorited={favorites.includes(game.id)} on:click={() => toggleFavorite(game.id)} aria-label="Toggle favorite">
                <i class="fa-heart {favorites.includes(game.id) ? 'fa-solid' : 'fa-regular'}"></i>
              </button>
            </div>
            <h3 class="library-card-title">{game.title}</h3>
            <div class="library-card-stats">
              <span><i class="fa-solid fa-users"></i> {game.players}</span>
              <span>•</span>
              <span><i class="fa-solid fa-clock"></i> {game.duration}</span>
            </div>
            <span class="library-genre-tag">{categoryLabels[game.category] || 'Tabletop'}</span>
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>
