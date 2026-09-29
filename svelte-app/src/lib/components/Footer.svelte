<script>
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    alert('🐝 Welcome to the Swarm! Check your inbox for sweet perks.');
    e.target.reset();
  }
</script>

<footer class="main-footer">
    <div class="container">

      <div class="footer-grid-3">

        <!-- Footer Sec 1: Newsletter Signup -->
        <div class="footer-sec-1">
          <h4 class="footer-newsletter-title">Join the Swarm</h4>
          <p class="footer-newsletter-body">
            Receive nectar-sweet invites to new game nights, tasting menus, and tournament releases.
          </p>
          <form class="newsletter-form-group"
            on:submit={handleNewsletterSubmit}>
            <input type="email" placeholder="Enter your email address..." required>
            <button type="submit" class="btn btn-primary" style="padding: 0.75rem 1.25rem;">Join</button>
          </form>
        </div>

        <!-- Footer Sec 2: Address & Operating Hours -->
        <div class="footer-sec-2">
          <h4 class="footer-section-title">Visit the Hive</h4>
          <div class="footer-info-text">
            <p style="margin-bottom: 0.6rem;"><i class="fa-solid fa-location-dot text-primary"></i> <strong>124
                Honeycomb Way</strong>, Game District</p>
            <p><strong>Tue - Thu:</strong> 12:00 PM – 10:00 PM</p>
            <p><strong>Fri - Sat:</strong> 12:00 PM – 12:00 AM (Midnight)</p>
            <p><strong>Sunday:</strong> 11:00 AM – 9:00 PM (Monday Closed)</p>
          </div>
        </div>

        <!-- Footer Sec 3: Social Links -->
        <div class="footer-sec-3">
          <h4 class="footer-section-title">Connect With Us</h4>
          <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1rem;">
            Follow our weekly game releases & community highlights.
          </p>
          <div class="footer-social-icons">
            <a href="#" class="social-icon-btn" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-icon-btn" aria-label="Discord"><i class="fa-brands fa-discord"></i></a>
            <a href="#" class="social-icon-btn" aria-label="Facebook"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" class="social-icon-btn" aria-label="TikTok"><i class="fa-brands fa-tiktok"></i></a>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 Beeboard Cafe. All rights reserved. Built with ❤️ for tabletop gaming lovers.</p>
      </div>

    </div>
  </footer>
