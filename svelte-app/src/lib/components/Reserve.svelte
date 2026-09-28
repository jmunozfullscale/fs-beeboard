<!-- Migrated from index.html -->
<section id="reserve" class="section-padding">
      <div class="container">
        <div class="section-header">
          <span class="section-badge"><i class="fa-solid fa-chair"></i> Reserve Your Spot</span>
          <h2>Book Your Table At The Hive</h2>
          <p>Ensure your group has a reserved table, comfortable gaming chairs, and optional Game Master support.</p>
        </div>

        <div class="reservation-card">
          <form id="table-reservation-form">
            <div class="booking-form-grid">

              <div class="form-field">
                <label for="res-name"><i class="fa-solid fa-user"></i> Your Full Name</label>
                <input type="text" id="res-name" placeholder="e.g., Alex Morgan" required>
              </div>

              <div class="form-field">
                <label for="res-email"><i class="fa-solid fa-envelope"></i> Email Address</label>
                <input type="email" id="res-email" placeholder="alex@example.com" required>
              </div>

              <div class="form-field">
                <label for="res-date"><i class="fa-solid fa-calendar-days"></i> Booking Date</label>
                <input type="date" id="res-date" required>
              </div>

              <div class="form-field">
                <label for="res-time"><i class="fa-solid fa-clock"></i> Start Time</label>
                <select id="res-time" required>
                  <option value="12:00 PM">12:00 PM (Lunch Gaming)</option>
                  <option value="2:00 PM">2:00 PM (Afternoon Session)</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="6:00 PM" selected>6:00 PM (Prime Evening)</option>
                  <option value="8:00 PM">8:00 PM (Late Night Session)</option>
                </select>
              </div>

              <div class="form-field">
                <label for="reserve-time"><i class="fa-solid fa-hourglass-half"></i> Reservation Duration</label>
                <select id="reserve-time" required>
                  <option value="60">1 Hour</option>
                  <option value="120" selected>2 Hours</option>
                  <option value="180">3 Hours</option>
                  <option value="240">4 Hours</option>
                </select>
              </div>

              <div class="form-field">
                <label for="res-party"><i class="fa-solid fa-users"></i> Party Size</label>
                <select id="res-party" required>
                  <option value="1 Player">1 Player (Solo Gaming)</option>
                  <option value="2 Players">2 Players (Duel Table)</option>
                  <option value="3 - 4 Players" selected>3 - 4 Players (Standard Table)</option>
                  <option value="5 - 6 Players">5 - 6 Players (Large Group)</option>
                  <option value="7+ Players">7+ Players (Party Suite)</option>
                </select>
              </div>

              <div class="form-field">
                <label for="res-zone"><i class="fa-solid fa-compass"></i> Preferred Zone</label>
                <select id="res-zone">
                  <option value="main">Main Gaming Lounge</option>
                  <option value="rpg">Private RPG & D&D Sanctuary</option>
                  <option value="cozy">Cozy Sofa & Coffee Corner</option>
                </select>
              </div>

              <div class="form-field">
                <label for="reserve-game-request"><i class="fa-solid fa-dice"></i> Request a Game (Optional)</label>
                <select id="reserve-game-request">
                  <option value="">No specific game</option>
                  <!-- Populated dynamically by app.js -->
                </select>
              </div>

              <!-- Dedicated Game Master Rule Tutor Option -->
              <div class="form-group-full">
                <div class="gm-tutor-box">
                  <input type="checkbox" id="res-gm-tutor" checked>
                  <div class="gm-tutor-info">
                    <strong>Request Dedicated Game Master (Rule Tutor)</strong>
                    <p>Our Game Master will greet your table, recommend games tailored to your party, set up the board,
                      and teach the rules in minutes so you skip the manual!</p>
                  </div>
                </div>
              </div>

              <div class="form-group-full" style="margin-top: 1rem;">
                <button type="submit" class="btn btn-primary btn-block" style="font-size: 1.1rem; padding: 1rem;">
                  <i class="fa-solid fa-check-circle"></i> Confirm Table Reservation
                </button>
              </div>

            </div>
          </form>
        </div>

      </div>
    </section>
