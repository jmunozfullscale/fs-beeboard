<script>
  import GameListItem from './GameListItem.svelte';

  export let games = [];
  export let onDelete; // function(id)
</script>

<div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid var(--color-border); max-height: 600px; overflow-y: auto;">
  <h3 style="margin-bottom: 1rem; color: var(--color-secondary);">Current Inventory ({games.length})</h3>
  {#if games.length === 0}
    <p>Loading...</p>
  {/if}
  <div style="display: flex; flex-direction: column; gap: 1rem;">
    {#each games as game (game.id)}
      <GameListItem {game} {onDelete} />
    {/each}
  </div>
</div>
