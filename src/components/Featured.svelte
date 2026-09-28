<script>
  import { onMount } from 'svelte';
  import { db } from '../lib/firebase';
  import { collection, getDocs, query, where } from 'firebase/firestore';
  import { favorites } from '../stores';
  
  let featuredGames = [];

  onMount(async () => {
    try {
      const q = query(collection(db, 'games-oneshot'), where('featured', '==', true));
      const snapshot = await getDocs(q);
      featuredGames = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch(e) {
      console.error(e);
    }
  });

  function toggleFav(id) {
    favorites.update(favs => {
      if (favs.includes(id)) return favs.filter(f => f !== id);
      return [...favs, id];
    });
  }
</script>

<section id="featured" class="section-padding" style="border-top: 1px solid var(--color-border);">
  <div class="container">
    <div class="section-header">
      <span class="section-badge"><i class="fa-solid fa-crown"></i> Curated Favorites</span>
      <h2>Staff Picks & Best of the Hive</h2>
      <p>Hand-selected tabletop jewels recommended by our lead Game Masters for guaranteed fun.</p>
    </div>

    <div class="featured-grid">
      {#each featuredGames as game}
        <div class="game-card">
          <div class="game-card-header">
            <i class="fa-solid {game.icon} game-icon-visual"></i>
            <span class="game-badge-tag">Staff Favorite</span>
            <button class="fav-btn" class:is-favorited={$favorites.includes(game.id)} on:click={() => toggleFav(game.id)} aria-label="Toggle favorite">
              <i class="{$favorites.includes(game.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
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
            <div class="game-card-footer">
              <span>In-Cafe Play</span>
              <span>Included with Pass</span>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
