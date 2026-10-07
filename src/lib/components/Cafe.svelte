<!-- Migrated from index.html -->
<section id="cafe" class="section-padding">
      <div class="container">

        <!-- Un-Carded Flex Header Row: Title & Subtitle Left | Guarantee Box Right -->
        <div class="cafe-header-row">
          <div class="cafe-header-left">
            <span class="section-badge"><i class="fa-solid fa-mug-hot"></i> Artisanal Eats</span>
            <h2>Nectar & Nibbles: The Honey Cafe</h2>
            <p>Hand-crafted beverages and mess-free snacks designed specifically for table gaming.</p>
          </div>

          <!-- Beeboard Guarantee Box on Right -->
          <div class="guarantee-box-inline">
            <div class="guarantee-box-title">
              <i class="fa-solid fa-shield-halved text-primary"></i>
              <span>The Beeboard Guarantee</span>
            </div>
            <div class="guarantee-box-pills">
              <span class="guarantee-pill"><i class="fa-solid fa-check text-primary"></i> 100μm Premium Sleeved
                Cards</span>
              <span class="guarantee-pill"><i class="fa-solid fa-check text-primary"></i> Recessed Table Cup
                Holders</span>
              <span class="guarantee-pill"><i class="fa-solid fa-check text-primary"></i> Drip-Free & Spill-Safe</span>
            </div>
          </div>
        </div>

        <!-- Full Width Menu Categories Grid -->
        <div class="menu-categories-wrapper">

          <!-- Category 1: Signature Coffee & Honey Drinks -->
          <div class="menu-category-block">
            <h3 class="menu-category-title"><i class="fa-solid fa-coffee"></i> Signature Espresso & Honey Drinks</h3>
            <div class="menu-items-grid">

                          <!-- Highlight Item 1 with Photo -->
                          <div class="menu-card">
                            <img src="assets/cafe_honey_latte.jpg" alt="Spiced Honey Bee-Latte with honeycomb"
                              class="menu-card-photo">
                            <div class="menu-card-header">
                              <span class="menu-item-name">Spiced Honey Bee-Latte <span
                                  style="font-size: 0.75rem; background: var(--color-bg-surface); color: var(--color-primary); padding: 0.2rem 0.6rem; border-radius: var(--radius-full); border: 1px solid var(--color-border); margin-left: 0.5rem;">⭐
                                  Staff Specialty</span></span>
                              <span class="menu-item-price">$5.75</span>
                            </div>
                            <p class="menu-item-desc">Double espresso, organic raw honey, steamed oat milk, and cinnamon dusting.
                              Served with fresh honeycomb.</p>
                          </div>

                          <div class="menu-card">
                            <div class="menu-card-header">
                              <span class="menu-item-name">Golden Chamomile Cold Brew</span>
                              <span class="menu-item-price">$5.25</span>
                            </div>
                            <p class="menu-item-desc">18-hour cold brew infused with honey chamomile and vanilla bean foam.</p>
                          </div>

                          <div class="menu-card">
                            <div class="menu-card-header">
                              <span class="menu-item-name">Meeple Mocha</span>
                              <span class="menu-item-price">$5.50</span>
                            </div>
                            <p class="menu-item-desc">Rich Belgian dark chocolate, espresso, and toasted honey drizzle.</p>
                          </div>
                        </div>
          </div>

          <!-- Category 2: Table-Friendly Nibbles -->
          <div class="menu-category-block">
            <h3 class="menu-category-title"><i class="fa-solid fa-cookie"></i> Game-Friendly Table Bites</h3>
            <div class="menu-items-grid">

              <!-- Highlight Item 2 with Photo -->
              <div class="menu-card" >
                <img src="assets/cafe_pretzel_bites.jpg" alt="Hexagon Pretzel Bites with honey mustard"
                  class="menu-card-photo">
                <div class="menu-card-header">
                  <span class="menu-item-name">Hexagon Pretzel Bites <span
                              style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; background: var(--color-primary); color: #111827; padding: 0.25rem 0.75rem; border-radius: var(--radius-full); border: 3px solid #111827; box-shadow: 2px 2px 0px #111827; margin-left: 0.5rem;">⭐
                              Table Favorite</span></span>
                  <span class="menu-item-price">$8.50</span>
                </div>
                <p class="menu-item-desc">Warm oven-baked pretzel hexagons served with warm honey mustard & warm queso
                  cheese dip.</p>
              </div>

              <div class="menu-card">
                <div class="menu-card-header">
                  <span class="menu-item-name">Guild Master Loaded Chips</span>
                  <span class="menu-item-price">$10.50</span>
                </div>
                <p class="menu-item-desc">Crispy house tortilla chips, guacamole, salsa verde, jalapenos, and melted
                  cheese.</p>
              </div>

              <div class="menu-card">
                <div class="menu-card-header">
                  <span class="menu-item-name">Artisanal Honey Panini</span>
                  <span class="menu-item-price">$11.75</span>
                </div>
                <p class="menu-item-desc">Smoked turkey, melted brie, arugula, and spicy honey glaze on sourdough.</p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

<style>
  .menu-items-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 1.5rem;
    align-items: start;
  }
  .menu-items-grid > :global(:nth-child(1)) {
    grid-column: 1;
    grid-row: 1 / span 2;
    height: 100%;
  }
  .menu-items-grid > :global(:nth-child(2)) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
  .menu-items-grid > :global(:nth-child(3)) {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
  }
  .menu-items-grid > :global(:nth-child(2)), .menu-items-grid > :global(:nth-child(3)) { grid-column: 2; }
</style>
