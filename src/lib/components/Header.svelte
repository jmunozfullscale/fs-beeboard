<script>
  import { onMount, onDestroy } from 'svelte';

  let isMobileMenuOpen = false;
  let activeSection = '';

  function toggleMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }

  function closeMenu() {
    isMobileMenuOpen = false;
  }

  function handleScroll() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    activeSection = current;
  }

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', handleScroll);
    }
  });
</script>

<header id="main-header">
  <div class="container nav-wrapper">
    <a href="#" class="logo-brand" aria-label="Beeboard Cafe Homepage">
      <img src="assets/logo.svg" alt="Beeboard Geometric Logo" class="logo-img">
      <span class="logo-text">Bee<span class="text-gradient">board</span></span>
    </a>

    <!-- Desktop Navigation Links -->
    <nav id="nav-menu">
      <ul id="nav-links" class="nav-list {isMobileMenuOpen ? 'active' : ''}">
        <li><a href="#featured" class="nav-link" class:active={activeSection === 'featured'} on:click={closeMenu}>Featured Games</a></li>
        <li><a href="#library" class="nav-link" class:active={activeSection === 'library'} on:click={closeMenu}>The Hive Library</a></li>
        <li><a href="#cafe" class="nav-link" class:active={activeSection === 'cafe'} on:click={closeMenu}>Honey Cafe</a></li>
        <li><a href="#events" class="nav-link" class:active={activeSection === 'events'} on:click={closeMenu}>Weekly Events</a></li>
      </ul>
    </nav>

    <!-- Action & Mobile Controls -->
    <div class="header-actions">
      <a href="#reserve" class="btn btn-primary">
        <i class="fa-solid fa-calendar-check"></i>
        <span>Book a Table</span>
      </a>
      <button id="nav-toggle" class="mobile-toggle" aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen} on:click={toggleMenu}>
        <i class="fa-solid {isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}"></i>
      </button>
    </div>
  </div>
</header>
