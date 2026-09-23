/**
 * BEEBOARD CAFE - PHASE 3 ENGINE
 * Features: BoardGameGeek Database (40+ Titles), Multi-Criteria Filter Engine, 
 * Mobile Nav Toggle (Folding Phone Compatible), ScrollSpy, Toast Alerts
 */

// Category Label Mapping for Genre Tags
const categoryLabels = {
  cozy: 'Cozy & Gateway',
  strategy: 'Strategy & Euro',
  party: 'Party & Bluffing',
  coop: 'Cooperative',
  twoplayer: 'Two-Player Duels'
};

// --- BGG DATABASE OF GAMES (10+ Games Per Category) ---
let gamesDatabase = [];

// --- FAVORITES SYSTEM (localStorage Persistence) ---

function getFavorites() {
  try {
    const stored = localStorage.getItem('beeboard_favorites');
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn('Beeboard: Failed to parse favorites from localStorage:', e);
    return [];
  }
}

function saveFavorites(favorites) {
  localStorage.setItem('beeboard_favorites', JSON.stringify(favorites));
}

function toggleFavorite(gameId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(gameId);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(gameId);
  }
  saveFavorites(favorites);

  // Update heart button visual state in-place (avoids full re-render)
  document.querySelectorAll(`.fav-btn[data-game-id="${gameId}"]`).forEach(btn => {
    const isFav = isFavorite(gameId);
    btn.classList.toggle('is-favorited', isFav);
    const icon = btn.querySelector('i');
    icon.className = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  });

  updateFavoritesCount();

  // If favorites-only view is active, re-render to remove unfavorited items
  if (showFavoritesOnly) {
    const favGames = gamesDatabase.filter(g => getFavorites().includes(g.id));
    renderLibraryGames(favGames);
  }
}

function isFavorite(gameId) {
  return getFavorites().includes(gameId);
}

function updateFavoritesCount() {
  const badge = document.getElementById('favorites-count');
  const count = getFavorites().length;
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

let showFavoritesOnly = false;

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  console.log('🐝 Beeboard Cafe Phase 3 Engine Online!');

  initNavigation();
  initScrollSpy();
  renderStaffPicks();
  
  try {
    const response = await fetch('data/games.json');
    gamesDatabase = await response.json();
    renderLibraryGames(gamesDatabase);
  } catch (error) {
    console.error('Error loading games data:', error);
  }
  initLibraryFilters();
  initScrollerButtons();
  initReservationForm();
  initFavorites();
});

/**
 * Mobile Navigation Toggle & Smooth Scrolling
 * Compatible with folding phone displays & mobile browsers
 */
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.contains('active');
      navToggle.setAttribute('aria-expanded', !isActive);
      navLinks.classList.toggle('active');
      
      // Swap Hamburger icon to Close icon
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (!isActive) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    // Close mobile menu on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });

    // Close when tapping outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        const icon = navToggle.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      }
    });
  }
}

/**
 * ScrollSpy: Automatically Highlight Nav Link on Scroll
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/**
 * Render Staff Picks Section Cards
 */
function renderStaffPicks() {
  const container = document.getElementById('staff-picks-container');
  if (!container) return;

  const featuredGames = gamesDatabase.filter(g => g.featured);

  container.innerHTML = featuredGames.map(game => `
    <div class="game-card">
      <div class="game-card-header">
        <i class="fa-solid ${game.icon} game-icon-visual"></i>
        <span class="game-badge-tag">Staff Favorite</span>
        <button class="fav-btn ${isFavorite(game.id) ? 'is-favorited' : ''}" data-game-id="${game.id}" aria-label="Toggle favorite">
          <i class="${isFavorite(game.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>
      <div class="game-card-body">
        <h3 class="game-title">${game.title}</h3>
        <div class="game-meta-pills">
          <span class="meta-pill"><i class="fa-solid fa-users"></i> ${game.players}</span>
          <span class="meta-pill"><i class="fa-solid fa-clock"></i> ${game.duration}</span>
          <span class="meta-pill"><i class="fa-solid fa-gauge-high"></i> ${game.complexity}</span>
        </div>
        <p class="game-desc">${game.desc}</p>
        <div class="game-card-footer">
          <span>In-Cafe Play</span>
          <span>Included with Pass</span>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Render Hive Library Cards (Square Photo Top, Title, Stats, Genre Tag)
 */
function renderLibraryGames(gamesList) {
  const grid = document.getElementById('library-grid');
  const countBadge = document.getElementById('library-count');
  
  if (!grid) return;

  if (countBadge) {
    countBadge.textContent = `${gamesList.length} Titles Found`;
  }

  if (gamesList.length === 0) {
    grid.innerHTML = `
      <div style="flex: 1; text-align: center; padding: 4rem 1rem;" class="card">
        <i class="fa-solid fa-face-meh" style="font-size: 3rem; color: var(--color-primary); margin-bottom: 1rem;"></i>
        <h3>No games match your selected criteria.</h3>
        <p style="color: var(--color-text-muted);">Try resetting or broadening your filters!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = gamesList.map(game => `
    <div class="library-card">
      <div class="library-card-photo">
        <i class="fa-solid ${game.icon} library-photo-icon"></i>
        <button class="fav-btn fav-btn-sm ${isFavorite(game.id) ? 'is-favorited' : ''}" data-game-id="${game.id}" aria-label="Toggle favorite">
          <i class="${isFavorite(game.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
      </div>
      <h3 class="library-card-title">${game.title}</h3>
      <div class="library-card-stats">
        <span><i class="fa-solid fa-users"></i> ${game.players}</span>
        <span>•</span>
        <span><i class="fa-solid fa-clock"></i> ${game.duration}</span>
      </div>
      <span class="library-genre-tag">${categoryLabels[game.category] || 'Tabletop'}</span>
    </div>
  `).join('');
}

/**
 * Horizontal Scroller Left/Right Navigation Buttons
 */
function initScrollerButtons() {
  const grid = document.getElementById('library-grid');
  const btnLeft = document.getElementById('scroll-left');
  const btnRight = document.getElementById('scroll-right');

  if (grid && btnLeft && btnRight) {
    btnLeft.addEventListener('click', () => {
      grid.scrollBy({ left: -300, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      grid.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
}

/**
 * Filter Engine Controller
 */
function initLibraryFilters() {
  let activeCategory = 'all';
  let activePlayerCount = 'all';
  let activePlaytime = 'all';
  let searchQuery = '';

  const categoryBtns = document.querySelectorAll('[data-filter-category]');
  const playerBtns = document.querySelectorAll('[data-filter-players]');
  const playtimeBtns = document.querySelectorAll('[data-filter-playtime]');
  const searchInput = document.getElementById('hero-game-search');

  function resetFavoritesFilter() {
    showFavoritesOnly = false;
    const favBtn = document.getElementById('favorites-filter-btn');
    if (favBtn) favBtn.classList.remove('active');
  }

  function applyFilters() {
    // Reset favorites toggle when standard filters are used
    resetFavoritesFilter();

    let filtered = gamesDatabase;

    if (activeCategory !== 'all') {
      filtered = filtered.filter(g => g.category === activeCategory);
    }

    if (activePlayerCount !== 'all') {
      filtered = filtered.filter(g => g.playerCount === activePlayerCount);
    }

    if (activePlaytime !== 'all') {
      filtered = filtered.filter(g => g.playtime === activePlaytime);
    }

    if (searchQuery) {
      filtered = filtered.filter(g => 
        g.title.toLowerCase().includes(searchQuery) || 
        g.desc.toLowerCase().includes(searchQuery)
      );
    }

    renderLibraryGames(filtered);
  }

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.filterCategory;
      applyFilters();
    });
  });

  playerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playerBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePlayerCount = btn.dataset.filterPlayers;
      applyFilters();
    });
  });

  playtimeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playtimeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activePlaytime = btn.dataset.filterPlaytime;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

/**
 * Reservation Form Submission Handler
 */
function initReservationForm() {
  const form = document.getElementById('table-reservation-form');
  const gameSelect = document.getElementById('reserve-game-request');
  const timeSelect = document.getElementById('reserve-time');

  if (!form) return;

  // Populate the game select dropdown dynamically from gamesDatabase
  if (gameSelect && typeof gamesDatabase !== 'undefined') {
    gamesDatabase.forEach(game => {
      const option = document.createElement('option');
      option.value = game.id;
      option.textContent = game.title;
      gameSelect.appendChild(option);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('res-name').value;
    const date = document.getElementById('res-date').value;
    const time = document.getElementById('res-time').value;
    const durationMins = timeSelect ? parseInt(timeSelect.value) : 120;
    const requestedGameId = gameSelect ? gameSelect.value : '';
    const party = document.getElementById('res-party').value;
    const gmRequested = document.getElementById('res-gm-tutor').checked;

    if (requestedGameId) {
      const requestedGame = gamesDatabase.find(g => g.id === requestedGameId);
      if (requestedGame) {
        const durationMatch = requestedGame.duration.match(/(\d+)(?!.*\d)/);
        const gameMaxMins = durationMatch ? parseInt(durationMatch[1]) : 0;
        
        if (durationMins < gameMaxMins) {
          alert(`⚠️ WARNING: ${requestedGame.title} typically takes ${requestedGame.duration}. Your ${durationMins}-minute slot might not be long enough! Please select a longer duration.`);
          return; // Prevent booking
        }
      }
    }

    alert(`🐝 Reservation Confirmed!\n\nThank you, ${name}!\nYour table for ${party} is booked for ${date} at ${time} for ${durationMins} minutes.\n${requestedGameId ? `✓ We will have ${gamesDatabase.find(g => g.id === requestedGameId).title} ready.` : ''}\n${gmRequested ? '✓ Dedicated Game Master requested for rule tutorial.' : ''}\n\nWe look forward to seeing you at the Hive!`);
    
    form.reset();
  });
}

/**
 * Favorites System: Event Delegation & Filter Toggle
 */
function initFavorites() {
  // Global event delegation for all .fav-btn clicks (present and future)
  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.fav-btn');
    if (!favBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const gameId = favBtn.dataset.gameId;
    toggleFavorite(gameId);
  });

  // "My Favorites" filter toggle in the library section
  const favFilterBtn = document.getElementById('favorites-filter-btn');
  if (favFilterBtn) {
    favFilterBtn.addEventListener('click', () => {
      showFavoritesOnly = !showFavoritesOnly;
      favFilterBtn.classList.toggle('active', showFavoritesOnly);

      if (showFavoritesOnly) {
        const favIds = getFavorites();
        const favGames = gamesDatabase.filter(g => favIds.includes(g.id));
        renderLibraryGames(favGames);
      } else {
        renderLibraryGames(gamesDatabase);
      }
    });
  }

  // Initialize favorites count on page load
  updateFavoritesCount();
}
