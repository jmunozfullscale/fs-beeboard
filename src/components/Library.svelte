<script>
  import { onMount } from 'svelte';
  import { db } from '../lib/firebase';
  import { collection, getDocs } from 'firebase/firestore';
  import { favorites } from '../stores';

  let games = [];
  let activeCategory = 'all';
  let activePlayerCount = 'all';
  let activePlaytime = 'all';
  let searchQuery = '';
  let showFavoritesOnly = false;
  
  let libraryGrid;

  const categoryLabels = {
    cozy: 'Cozy & Gateway',
    strategy: 'Strategy & Euro',
    party: 'Party & Bluffing',
    coop: 'Cooperative',
    twoplayer: 'Two-Player Duels'
  };

  onMount(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'games-oneshot'));
      games = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch(e) {
      console.error(e);
    }
  });

  $: filteredGames = games.filter(g => {
    if (showFavoritesOnly && !$favorites.includes(g.id)) return false;
    if (activeCategory !== 'all' && g.category !== activeCategory) return false;
    if (activePlayerCount !== 'all' && g.playerCount !== activePlayerCount) return false;
    if (activePlaytime !== 'all' && g.playtime !== activePlaytime) return false;
    if (searchQuery && !g.title.toLowerCase().includes(searchQuery.toLowerCase()) && !g.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  function toggleFav(id) {
    favorites.update(favs => {
      if (favs.includes(id)) return favs.filter(f => f !== id);
      return [...favs, id];
    });
  }

  function scrollLeft() {
    if (libraryGrid) libraryGrid.scrollBy({ left: -300, behavior: 'smooth' });
  }

  function scrollRight() {
    if (libraryGrid) libraryGrid.scrollBy({ left: 300, behavior: 'smooth' });
  }
</script>

<section id="library" class="section-padding bg-surface" style="background-color: var(--color-bg-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
  <div class="container">
    <div class="section-header">
      <span class="section-badge"><i class="fa-solid fa-boxes-stacked"></i> 200+ Titles</span>
      <h2>The Hive Library</h2>
      <p>Filter by genre, player count, or available time to discover your next favorite game.</p>
    </div>

    <div class="library-filter-panel">
      <div class="filter-group-row">
        <div class="filter-group">
          <span class="filter-label"><i class="fa-solid fa-layer-group"></i> Category:</span>
          <div class="filter-buttons-wrapper">
            {#each [{id: 'all', label: 'All Games'}, {id: 'cozy', label: 'Cozy & Gateway'}, {id: 'strategy', label: 'Strategy & Euro'}, {id: 'party', label: 'Party & Bluffing'}, {id: 'coop', label: 'Cooperative'}, {id: 'twoplayer', label: 'Two-Player Duels'}] as cat}
              <button class="filter-btn" class:active={activeCategory === cat.id} on:click={() => { activeCategory = cat.id; showFavoritesOnly = false; }}>{cat.label}</button>
            {/each}
          </div>
        </div>

        <div class="filter-group">
          <span class="filter-label"><i class="fa-solid fa-users"></i> Players:</span>
          <div class="filter-buttons-wrapper">
            {#each [{id: 'all', label: 'All Player Counts'}, {id: 'Solo', label: 'Solo'}, {id: '2P', label: '2P Only'}, {id: '3-4', label: '3 - 4P'}, {id: '5+', label: '5P+'}] as p}
              <button class="filter-btn" class:active={activePlayerCount === p.id} on:click={() => { activePlayerCount = p.id; showFavoritesOnly = false; }}>{p.label}</button>
            {/each}
          </div>
        </div>

        <div class="filter-group">
          <span class="filter-label"><i class="fa-solid fa-clock"></i> Playtime:</span>
          <div class="filter-buttons-wrapper">
            {#each [{id: 'all', label: 'All Playtimes'}, {id: 'short', label: '< 30m'}, {id: 'medium', label: '30m - 60m'}, {id: 'long', label: '> 60m'}] as t}
              <button class="filter-btn" class:active={activePlaytime === t.id} on:click={() => { activePlaytime = t.id; showFavoritesOnly = false; }}>{t.label}</button>
            {/each}
          </div>
        </div>
      </div>
    </div>

    <div class="library-scroller-controls">
      <div>
        <h3 style="font-size: 1.35rem; color: var(--color-text-dark);">Available Games Vault</h3>
        <span style="font-size: 0.85rem; font-weight: 700; color: var(--color-secondary);">{filteredGames.length} Titles Found</span>
      </div>

      <div style="display: flex; align-items: center; gap: 1rem;">
        <button class="btn-favorites-filter" class:active={showFavoritesOnly} on:click={() => showFavoritesOnly = !showFavoritesOnly} aria-label="Toggle favorites filter">
          <i class="fa-solid fa-heart"></i>
          <span>My Favorites</span>
          {#if $favorites.length > 0}
            <span class="favorites-count-badge" style="display: inline-flex;">{$favorites.length}</span>
          {/if}
        </button>
        <div class="scroll-nav-btns">
          <button class="scroll-nav-btn" on:click={scrollLeft} aria-label="Scroll left"><i class="fa-solid fa-chevron-left"></i></button>
          <button class="scroll-nav-btn" on:click={scrollRight} aria-label="Scroll right"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    </div>

    <div bind:this={libraryGrid} class="library-horizontal-grid">
      {#if filteredGames.length === 0}
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
              <button class="fav-btn fav-btn-sm" class:is-favorited={$favorites.includes(game.id)} on:click={() => toggleFav(game.id)} aria-label="Toggle favorite">
                <i class="{$favorites.includes(game.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
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
