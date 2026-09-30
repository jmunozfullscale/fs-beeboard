<script>
  export let game;
  export let onDelete; // function(id)
</script>

<div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border: 1px solid #eee; border-radius: 8px;">
  <div>
    <h4 style="margin: 0; color: var(--color-text-dark);">{game.title}</h4>
    <span style="font-size: 0.85rem; color: var(--color-text-muted);">{game.category} • {game.players} • {game.duration}</span>
  </div>
  <button on:click={() => onDelete(game.id)} style="background: none; border: none; color: #e53935; cursor: pointer; padding: 0.5rem;"><i class="fa-solid fa-trash"></i></button>
</div>
