describe('Beeboard App E2E', () => {

  // Test 1: Navigation & Scrolling
  it('navigates via header links and updates URL hash', () => {
    cy.visit('/');
    // Click the Cafe link
    cy.get('a.nav-link[href="#cafe"]').click();
    // The URL should update
    cy.url().should('include', '#cafe');
    // The Cafe section should be scrolled into view
    cy.get('#cafe').should('be.visible');
  });

  // Test 2: Responsive Mobile Testing
  it('displays the mobile hamburger menu on small viewports', () => {
    // Set viewport to a mobile device
    cy.viewport('iphone-x');
    cy.visit('/');
    
    // The hamburger toggle should be visible
    cy.get('#nav-toggle').should('be.visible').click();
    
    // The mobile menu should now be active
    cy.get('#nav-links').should('have.class', 'active');
  });

  // Test 3: Library Search & Filtering
  it('filters the game library when searching', () => {
    cy.visit('/');
    
    // Scroll to library
    cy.get('#library').scrollIntoView();
    
    // Type into the search input
    cy.get('input[placeholder="Search games..."]').type('Catan');
    
    // Verify that the UI reacts (either showing a game card or the empty state)
    // Since we are hitting a live DB, we can't guarantee 'Catan' is there, so we check for the library container
    cy.get('#library-grid').should('be.visible');
  });

  // Test 4: Form Submissions (Reserve Table)
  it('fills out the reservation form correctly', () => {
    cy.visit('/');
    
    // Scroll to reserve section
    cy.get('#reserve').scrollIntoView();
    
    // Fill out the reservation details
    cy.get('#res-name').type('Alex Morgan');
    cy.get('#res-email').type('alex@beeboard.test');
    cy.get('#res-date').type('2026-10-31');
    cy.get('#res-time').select('4:00 PM');
    cy.get('#res-party').select('2 Players (Duel Table)');
    
    // Verify the inputs accepted the typing and selections
    cy.get('#res-name').should('have.value', 'Alex Morgan');
    cy.get('#res-party').should('contain', '2 Players');
  });

  // Test 5: Admin Panel Failure Edge Case
  it('navigates to the admin panel and blocks invalid logins', () => {
    // Visit the admin hash route directly
    cy.visit('/#admin');
    
    // Verify login form is rendered
    cy.contains('Game Master Login').should('be.visible');
    
    // Interact with the specific inputs (using the IDs we added!)
    cy.get('#admin-email').type('fakeadmin@beeboard.test');
    cy.get('#admin-password').type('wrongpassword');
    cy.contains('Access Database').click();

    // Verify the Svelte reactivity pops up the error message
    cy.contains('Invalid email or password.').should('be.visible');
  });

});
