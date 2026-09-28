<script>
  import { onMount } from 'svelte';
  
  let navActive = false;
  let currentSection = '';

  onMount(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 120;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSection = section.id;
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<header id="main-header">
  <div class="container nav-wrapper">
    <a href="#" class="logo-brand" aria-label="Beeboard Cafe Homepage">
      <img src="/assets/logo.svg" alt="Beeboard Geometric Logo" class="logo-img">
      <span class="logo-text">Bee<span class="text-gradient">board</span></span>
    </a>

    <nav id="nav-menu">
      <ul id="nav-links" class="nav-list" class:active={navActive}>
        <li><a href="#featured" class="nav-link" class:active={currentSection === 'featured'} on:click={() => navActive = false}>Featured Games</a></li>
        <li><a href="#library" class="nav-link" class:active={currentSection === 'library'} on:click={() => navActive = false}>The Hive Library</a></li>
        <li><a href="#cafe" class="nav-link" class:active={currentSection === 'cafe'} on:click={() => navActive = false}>Honey Cafe</a></li>
        <li><a href="#events" class="nav-link" class:active={currentSection === 'events'} on:click={() => navActive = false}>Weekly Events</a></li>
        {#if window.location.hash === '#admin'}
          <li><a href="#admin" class="nav-link" class:active={currentSection === 'admin'}>Admin</a></li>
        {/if}
      </ul>
    </nav>

    <div class="header-actions">
      <a href="#reserve" class="btn btn-primary">
        <i class="fa-solid fa-calendar-check"></i>
        <span>Book a Table</span>
      </a>
      <button class="mobile-toggle" aria-expanded={navActive} on:click={() => navActive = !navActive}>
        <i class="fa-solid {navActive ? 'fa-xmark' : 'fa-bars'}"></i>
      </button>
    </div>
  </div>
</header>
