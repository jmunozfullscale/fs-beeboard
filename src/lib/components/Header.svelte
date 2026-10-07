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
      <div class="logo-icon-box"><i class="fa-solid fa-dice-d20"></i></div>
      <span class="logo-text">Bee<span class="logo-text-highlight">board</span></span>
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

<style>
  .logo-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    transition: transform 0.15s ease;
  }
  .logo-brand:hover { transform: translate(-2px, -2px); }
  .logo-brand:hover .logo-icon-box { box-shadow: 4px 4px 0px #111827; }
  .logo-icon-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background-color: var(--color-primary, #D97706);
    color: #111827;
    border: 3px solid #111827;
    font-size: 1.2rem;
    box-shadow: 2px 2px 0px #111827;
    transition: box-shadow 0.15s ease;
  }
  .logo-text {
    font-family: var(--font-headline, sans-serif);
    font-size: 1.5rem;
    font-weight: 900;
    color: #111827;
    letter-spacing: -0.5px;
    text-transform: uppercase;
  }
  .logo-text-highlight {
    color: #FFFFFF;
    text-shadow: 2px 2px 0px var(--color-primary, #D97706),
    -1px -1px 0 #111827,
    1px -1px 0 #111827,
    -1px  1px 0 #111827,
    1px  1px 0 #111827;
  }
</style>
