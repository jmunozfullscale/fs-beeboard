<script>
  export let onLogin; // function(email, password)
  export let errorMsg = '';
  
  let email = '';
  let password = '';

  function handleSubmit() {
    onLogin(email, password);
  }
</script>

<div class="admin-login-card" style="max-width: 400px; margin: 4rem auto; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
  <h2 style="text-align: center; margin-bottom: 1.5rem; color: var(--color-primary);"><i class="fa-solid fa-lock"></i> Game Master Login</h2>
  {#if errorMsg}
    <div style="background: #ffebee; color: #c62828; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem; font-size: 0.9rem;">{errorMsg}</div>
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <div style="margin-bottom: 1rem;">
      <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
      <input type="email" bind:value={email} required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 4px;">
    </div>
    <div style="margin-bottom: 1.5rem;">
      <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Password</label>
      <input type="password" bind:value={password} required style="width: 100%; padding: 0.75rem; border: 1px solid var(--color-border); border-radius: 4px;">
    </div>
    <button type="submit" class="btn btn-primary" style="width: 100%;">Access Database</button>
  </form>
</div>
