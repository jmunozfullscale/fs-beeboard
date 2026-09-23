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
const gamesDatabase = [
  // COZY & GATEWAY
  { id: 'wingspan', title: 'Wingspan', category: 'cozy', players: '1–5 Players', playerCount: '3-4', duration: '40–70 mins', playtime: 'medium', complexity: '2.4 / 5', desc: 'Attract a beautiful array of birds to your wildlife preserve in this engine-building favorite.', icon: 'fa-crow', featured: true },
  { id: 'harmonies', title: 'Harmonies', category: 'cozy', players: '1–4 Players', playerCount: '3-4', duration: '30–45 mins', playtime: 'medium', complexity: '2.1 / 5', desc: 'Create landscapes and habitats to welcome animals in this cozy tile placement masterpiece.', icon: 'fa-tree', featured: true },
  { id: 'cascadia', title: 'Cascadia', category: 'cozy', players: '1–4 Players', playerCount: '3-4', duration: '30–45 mins', playtime: 'medium', complexity: '1.9 / 5', desc: 'Draft wildlife habitats and populate the Pacific Northwest landscape.', icon: 'fa-mountain', featured: false },
  { id: 'ticket-to-ride', title: 'Ticket to Ride', category: 'cozy', players: '2–5 Players', playerCount: '5+', duration: '30–60 mins', playtime: 'medium', complexity: '1.8 / 5', desc: 'Cross-country train adventure connecting iconic cities across the map.', icon: 'fa-train', featured: false },
  { id: 'azul', title: 'Azul', category: 'cozy', players: '2–4 Players', playerCount: '3-4', duration: '30–45 mins', playtime: 'medium', complexity: '1.8 / 5', desc: 'Draft colorful Portuguese tiles to embellish the royal palace of Evora.', icon: 'fa-shapes', featured: false },
  { id: 'carcassonne', title: 'Carcassonne', category: 'cozy', players: '2–5 Players', playerCount: '5+', duration: '35–45 mins', playtime: 'medium', complexity: '1.9 / 5', desc: 'Build medieval landscapes of castles, roads, rivers, and monasteries.', icon: 'fa-chess-rook', featured: false },
  { id: 'splendor', title: 'Splendor', category: 'cozy', players: '2–4 Players', playerCount: '3-4', duration: '30 mins', playtime: 'short', complexity: '1.8 / 5', desc: 'Renaissance merchant gem drafting and prestige points engine builder.', icon: 'fa-gem', featured: false },
  { id: 'dixit', title: 'Dixit', category: 'cozy', players: '3–8 Players', playerCount: '5+', duration: '30 mins', playtime: 'short', complexity: '1.2 / 5', desc: 'Whimsical dreamlike storytelling and visual clue matching game.', icon: 'fa-wand-magic-sparkles', featured: false },
  { id: 'takenoko', title: 'Takenoko', category: 'cozy', players: '2–4 Players', playerCount: '3-4', duration: '45 mins', playtime: 'medium', complexity: '2.0 / 5', desc: 'Care for the Emperor\'s bamboo garden and feed a giant hungry panda.', icon: 'fa-seedling', featured: false },
  { id: 'century', title: 'Century: Spice Road', category: 'cozy', players: '2–5 Players', playerCount: '5+', duration: '30–45 mins', playtime: 'medium', complexity: '1.8 / 5', desc: 'Trade exotic spices along the ancient spice route.', icon: 'fa-pepper-hot', featured: false },

  // STRATEGY & EURO
  { id: 'everdell', title: 'Everdell', category: 'strategy', players: '1–4 Players', playerCount: '3-4', duration: '40–80 mins', playtime: 'long', complexity: '2.8 / 5', desc: 'Build a bustling woodland city under the branches of the Ever Tree.', icon: 'fa-box-open', featured: true },
  { id: 'terraforming-mars', title: 'Terraforming Mars', category: 'strategy', players: '1–5 Players', playerCount: '3-4', duration: '120 mins', playtime: 'long', complexity: '3.3 / 5', desc: 'Corporations compete to make Mars habitable with temperature, oxygen, and ocean projects.', icon: 'fa-globe', featured: false },
  { id: 'scythe', title: 'Scythe', category: 'strategy', players: '1–5 Players', playerCount: '5+', duration: '90–115 mins', playtime: 'long', complexity: '3.4 / 5', desc: 'Alternate-history 1920s dieselpunk mech combat and resource farming.', icon: 'fa-robot', featured: false },
  { id: 'brass-birmingham', title: 'Brass: Birmingham', category: 'strategy', players: '2–4 Players', playerCount: '3-4', duration: '120 mins', playtime: 'long', complexity: '3.9 / 5', desc: 'Industrial revolution economic strategy in West Midlands coal & cotton networks.', icon: 'fa-industry', featured: false },
  { id: 'concordia', title: 'Concordia', category: 'strategy', players: '2–5 Players', playerCount: '5+', duration: '100 mins', playtime: 'long', complexity: '3.0 / 5', desc: 'Peaceful Roman empire economic expansion driven by hand management.', icon: 'fa-building-columns', featured: false },
  { id: 'viticulture', title: 'Viticulture EE', category: 'strategy', players: '1–6 Players', playerCount: '5+', duration: '90 mins', playtime: 'long', complexity: '2.9 / 5', desc: 'Inherit a Tuscan vineyard and produce world-renowned wines.', icon: 'fa-wine-glass', featured: false },
  { id: 'ark-nova', title: 'Ark Nova', category: 'strategy', players: '1–4 Players', playerCount: '3-4', duration: '90–150 mins', playtime: 'long', complexity: '3.7 / 5', desc: 'Design a modern scientifically managed zoo and fund global conservation.', icon: 'fa-hippo', featured: false },
  { id: 'dune-imperium', title: 'Dune: Imperium', category: 'strategy', players: '1–4 Players', playerCount: '3-4', duration: '60–120 mins', playtime: 'long', complexity: '3.0 / 5', desc: 'Deck-building and worker placement for control of the desert planet Arrakis.', icon: 'fa-sun', featured: false },
  { id: 'castles-burgundy', title: 'The Castles of Burgundy', category: 'strategy', players: '1–4 Players', playerCount: '3-4', duration: '70–90 mins', playtime: 'long', complexity: '3.0 / 5', desc: 'Draft dice and build 15th-century French estates.', icon: 'fa-chess-king', featured: false },
  { id: 'great-western-trail', title: 'Great Western Trail', category: 'strategy', players: '1–4 Players', playerCount: '3-4', duration: '75–150 mins', playtime: 'long', complexity: '3.7 / 5', desc: 'Herd cattle across 19th-century America to Kansas City.', icon: 'fa-hat-cowboy', featured: false },

  // PARTY & BLUFFING
  { id: 'secret-hitler', title: 'Secret Hitler', category: 'party', players: '5–10 Players', playerCount: '5+', duration: '45 mins', playtime: 'medium', complexity: '1.7 / 5', desc: 'Dramatic social deduction and political intrigue among Liberals and Fascists.', icon: 'fa-mask', featured: false },
  { id: 'codenames', title: 'Codenames', category: 'party', players: '2–8 Players', playerCount: '5+', duration: '15 mins', playtime: 'short', complexity: '1.3 / 5', desc: 'Spymasters give one-word clues to reveal secret secret agents on the grid.', icon: 'fa-user-secret', featured: false },
  { id: 'chameleon', title: 'The Chameleon', category: 'party', players: '3–8 Players', playerCount: '5+', duration: '15 mins', playtime: 'short', complexity: '1.1 / 5', desc: 'Catch the player who doesn\'t know the secret word before they blend in!', icon: 'fa-dragon', featured: false },
  { id: 'coup', title: 'Coup', category: 'party', players: '2–6 Players', playerCount: '5+', duration: '15 mins', playtime: 'short', complexity: '1.4 / 5', desc: 'Bluff, bribe, and manipulate your way to sole political power in Italian city-state.', icon: 'fa-coins', featured: false },
  { id: 'just-one', title: 'Just One', category: 'party', players: '3–7 Players', playerCount: '5+', duration: '20 mins', playtime: 'short', complexity: '1.0 / 5', desc: 'Cooperative party game where players write 1-word clues to help guess mystery words.', icon: 'fa-pen-fancy', featured: false },
  { id: 'wavelength', title: 'Wavelength', category: 'party', players: '2–12 Players', playerCount: '5+', duration: '30 mins', playtime: 'short', complexity: '1.1 / 5', desc: 'Telepathic party game where teams guess where target falls on spectrum.', icon: 'fa-wave-square', featured: false },
  { id: 'decrypto', title: 'Decrypto', category: 'party', players: '3–8 Players', playerCount: '5+', duration: '30 mins', playtime: 'short', complexity: '1.8 / 5', desc: 'Transmit secret codes without allowing enemy team to intercept messages.', icon: 'fa-key', featured: false },
  { id: 'skull', title: 'Skull', category: 'party', players: '3–6 Players', playerCount: '5+', duration: '30 mins', playtime: 'short', complexity: '1.1 / 5', desc: 'Pure bluffing and double-guessing with rose and skull coasters.', icon: 'fa-skull', featured: false },
  { id: 'one-night-werewolf', title: 'One Night Werewolf', category: 'party', players: '3–10 Players', playerCount: '5+', duration: '10 mins', playtime: 'short', complexity: '1.4 / 5', desc: 'Fast 10-minute werewolf deduction game powered by companion mobile app.', icon: 'fa-moon', featured: false },
  { id: 'monikers', title: 'Monikers', category: 'party', players: '4–12 Players', playerCount: '5+', duration: '30 mins', playtime: 'short', complexity: '1.1 / 5', desc: 'Hilarious charades and guessing game based on pop culture trivia.', icon: 'fa-face-laugh-beam', featured: false },

  // COOPERATIVE
  { id: 'pandemic', title: 'Pandemic', category: 'coop', players: '2–4 Players', playerCount: '3-4', duration: '45 mins', playtime: 'medium', complexity: '2.4 / 5', desc: 'Team of specialists race to cure global outbreaks before time runs out.', icon: 'fa-vial', featured: false },
  { id: 'spirit-island', title: 'Spirit Island', category: 'coop', players: '1–4 Players', playerCount: '3-4', duration: '90–120 mins', playtime: 'long', complexity: '4.1 / 5', desc: 'Powerful elemental spirits defend their island home against invading colonizers.', icon: 'fa-fire', featured: false },
  { id: 'crew-deep-sea', title: 'The Crew: Deep Sea', category: 'coop', players: '2–5 Players', playerCount: '3-4', duration: '20 mins', playtime: 'short', complexity: '2.0 / 5', desc: 'Cooperative trick-taking card game searching for the lost continent of Mu.', icon: 'fa-water', featured: false },
  { id: 'forbidden-island', title: 'Forbidden Island', category: 'coop', players: '2–4 Players', playerCount: '3-4', duration: '30 mins', playtime: 'short', complexity: '1.7 / 5', desc: 'Capture four sacred treasures before the island sinks beneath the waves.', icon: 'fa-anchor', featured: false },
  { id: 'horrified', title: 'Horrified', category: 'coop', players: '1–5 Players', playerCount: '3-4', duration: '60 mins', playtime: 'medium', complexity: '2.1 / 5', desc: 'Defend the village against Dracula, Frankenstein, Mummy, and classic monsters.', icon: 'fa-ghost', featured: false },
  { id: 'paleo', title: 'Paleo', category: 'coop', players: '2–4 Players', playerCount: '3-4', duration: '45–60 mins', playtime: 'medium', complexity: '2.6 / 5', desc: 'Stone Age survival adventure keeping your tribe fed and safe.', icon: 'fa-bone', featured: false },
  { id: 'sleeping-gods', title: 'Sleeping Gods', category: 'coop', players: '1–4 Players', playerCount: '3-4', duration: '120 mins', playtime: 'long', complexity: '3.3 / 5', desc: 'Open-world narrative campaign exploring uncharted waters on the steamship Manticore.', icon: 'fa-compass', featured: false },
  { id: 'micromacro', title: 'MicroMacro', category: 'coop', players: '1–4 Players', playerCount: '3-4', duration: '15–45 mins', playtime: 'short', complexity: '1.1 / 5', desc: 'Cooperative detective search game on a gigantic illustrated city map.', icon: 'fa-magnifying-glass-location', featured: false },
  { id: 'flash-point', title: 'Flash Point: Fire Rescue', category: 'coop', players: '1–6 Players', playerCount: '5+', duration: '45 mins', playtime: 'medium', complexity: '2.2 / 5', desc: 'Firefighters coordinate to rescue victims from a burning building.', icon: 'fa-fire-extinguisher', featured: false },
  { id: 'the-mind', title: 'The Mind', category: 'coop', players: '2–4 Players', playerCount: '3-4', duration: '15 mins', playtime: 'short', complexity: '1.1 / 5', desc: 'Silent psychic card synchronization without speaking a single word.', icon: 'fa-brain', featured: false },

  // TWO-PLAYER DUELS
  { id: 'hive-pocket', title: 'Hive Pocket', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '20 mins', playtime: 'short', complexity: '2.3 / 5', desc: 'Tactical bug tile placement duel to surround the enemy Queen Bee.', icon: 'fa-hexagon-nodes', featured: true },
  { id: '7-wonders-duel', title: '7 Wonders Duel', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '30 mins', playtime: 'short', complexity: '2.2 / 5', desc: 'Head-to-head ancient civilization card drafting and military dominance.', icon: 'fa-landmark', featured: false },
  { id: 'jaipur', title: 'Jaipur', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '30 mins', playtime: 'short', complexity: '1.5 / 5', desc: 'Fast-paced trading duel to become the Maharaja\'s official merchant.', icon: 'fa-gem', featured: false },
  { id: 'lost-cities', title: 'Lost Cities', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '30 mins', playtime: 'short', complexity: '1.5 / 5', desc: 'Archaeological expedition card game balancing risk and reward.', icon: 'fa-map', featured: false },
  { id: 'patchwork', title: 'Patchwork', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '30 mins', playtime: 'short', complexity: '1.6 / 5', desc: 'Draft polyomino fabric patches to sew the highest scoring quilt.', icon: 'fa-scissors', featured: false },
  { id: 'star-realms', title: 'Star Realms', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '20 mins', playtime: 'short', complexity: '1.9 / 5', desc: 'Fast deckbuilding space combat duel to destroy your opponent\'s authority.', icon: 'fa-shuttle-space', featured: false },
  { id: 'unmatched', title: 'Unmatched: Cobble & Fog', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '20–40 mins', playtime: 'short', complexity: '2.0 / 5', desc: 'Tactical miniature duels pitting Sherlock Holmes against Dracula or Invisible Man.', icon: 'fa-khanda', featured: false },
  { id: 'watergate', title: 'Watergate', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '30–60 mins', playtime: 'medium', complexity: '2.3 / 5', desc: 'Tense political card duel between Nixon Administration and Washington Post editor.', icon: 'fa-newspaper', featured: false },
  { id: 'targi', title: 'Targi', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '60 mins', playtime: 'medium', complexity: '2.3 / 5', desc: 'Desert tribal worker placement and trade route control.', icon: 'fa-caravan', featured: false },
  { id: 'riftforce', title: 'Riftforce', category: 'twoplayer', players: '2 Players Only', playerCount: '2P', duration: '30 mins', playtime: 'short', complexity: '2.0 / 5', desc: 'Elemental guild drafting and rift battle duel.', icon: 'fa-bolt', featured: false }
];

// --- APP INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  console.log('🐝 Beeboard Cafe Phase 3 Engine Online!');

  initNavigation();
  initScrollSpy();
  renderStaffPicks();
  renderLibraryGames(gamesDatabase);
  initLibraryFilters();
  initScrollerButtons();
  initReservationForm();
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

  function applyFilters() {
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
