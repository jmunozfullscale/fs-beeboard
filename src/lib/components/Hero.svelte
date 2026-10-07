<!-- Migrated from index.html -->
<section id="hero" class="hero-section">
      <div class="container hero-grid">

        <!-- Hero Content Column -->
        <div class="hero-content">
          <!-- Badge removed -->

          <h1 class="hero-title" style="text-shadow: 4px 4px 0px var(--color-tertiary);">
            Gather Around <span class="highlight-block">the Hive.</span>
          </h1>

          <p class="hero-subtitle">
            Unplug and level up your leisure time. Dive into our library of over 200+ hand-picked board games, paired
            with artisanal coffee, craft brews, and dedicated Game Masters to teach you every rule.
          </p>

          <!-- Quick Game Vault Search Bar -->
          <div class="hero-search-box">
            <div class="search-input-group">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input type="text" id="hero-game-search"
                placeholder="Search 200+ games (e.g., Wingspan, Catan, Ticket to Ride)..."
                aria-label="Search board games library">
            </div>

            <div class="search-chips">
              <span class="chip-label">Quick Genres:</span>
              <a href="#library" class="chip"
                >Cozy & Gateway</a>
              <a href="#library" class="chip"
                >Strategy</a>
              <a href="#library" class="chip"
                >Party & Bluffing</a>
              <a href="#library" class="chip"
                >2-Player Duels</a>
            </div>
          </div>

          <!-- Key Shop Metrics Row -->
          <div class="metrics-row">
            <div class="metric-item">
              <span class="metric-value">200+</span>
              <span class="metric-label">Hand-Picked Titles</span>
            </div>

            <div class="metric-divider"></div>

            <div class="metric-item">
              <span class="metric-value">4.9 ★</span>
              <span class="metric-label">Community Rating</span>
            </div>

            <div class="metric-divider"></div>

            <div class="metric-item">
              <span class="metric-value">Bespoke</span>
              <span class="metric-label">Gaming Tables</span>
            </div>
          </div>
        </div>

        <!-- Hero Cozy Cafe Ambient Visual -->
        <div class="hero-visual">
          <div class="hero-image-wrapper">
            <img src="assets/cozy_cafe_hero.jpg"
              alt="Cozy board game cafe interior with custom oak tables, coffee, and game shelf">

            <div class="hero-image-badge">
                          <div class="badge-icon">
                            <i class="fa-solid fa-graduation-cap"></i>
                          </div>
                          <div class="badge-text">
                            <strong>Friendly Game Masters</strong>
                            <p>Zero rulebook reading required! We set up & teach.</p>
                          </div>
                        </div>
          </div>
        </div>

      </div>
    </section>

<style>
  .hero-title { text-shadow: 4px 4px 0px var(--color-tertiary); }
  .highlight-block {
    display: inline-block;
    background-color: var(--color-primary);
    color: #fff;
    padding: 0 1rem;
    border: 3px solid #111827;
    box-shadow: 4px 4px 0px #111827;
    transform: rotate(-2deg);
    text-shadow: none;
    margin-left: 0.5rem;
  }
  :global(.hero-image-wrapper) { overflow: visible !important; }
  :global(.hero-image-wrapper img) {
    border-radius: calc(var(--radius-lg, 12px) - 4px) !important;
  }
  .hero-image-badge {
    position: absolute;
    bottom: -2.5rem;
    right: -2.5rem;
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1.2rem 1.4rem;
    background: var(--color-tertiary, #FDE68A);
    border: 3px solid #111827;
    border-radius: 0;
    color: #111827;
    z-index: 2;
    box-shadow: 8px 8px 0px #111827;
  }
  .badge-icon { font-size: 1.6rem; }
  .badge-text strong { display: block; font-weight: 900; font-size: 1.1rem; }
  .badge-text p { margin: 0; font-size: 0.9rem; }
</style>
