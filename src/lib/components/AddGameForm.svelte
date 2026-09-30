<script>
  export let onAdd; // function(newGame)

  let newTitle = '';
  let newPlayers = '';
  let newDuration = '';
  let newComplexity = 'Medium';
  let newCategory = 'strategy';
  let newDesc = '';
  let newIcon = 'fa-dice';
  let isFeatured = false;

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

  function handleSubmit() {
    if (!newTitle) return;
    
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
    
    onAdd(newGame);
    
    // Reset form
    newTitle = ''; newPlayers = ''; newDesc = '';
  }
</script>

<div style="background: white; padding: 2rem; border-radius: 12px; border: 1px solid var(--color-border);">
  <h3 style="margin-bottom: 1rem; color: var(--color-secondary);">Add New Game</h3>
  <form on:submit|preventDefault={handleSubmit}>
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
