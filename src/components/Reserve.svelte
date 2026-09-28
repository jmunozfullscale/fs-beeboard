<script>
  let name = '';
  let email = '';
  let date = '';
  let time = '6:00 PM';
  let duration = '120';
  let party = '3 - 4 Players';
  let zone = 'main';
  let requestedGame = '';
  let gmTutor = true;
  
  import { onMount } from 'svelte';
  import { db } from '../lib/firebase';
  import { collection, getDocs } from 'firebase/firestore';

  let gamesDatabase = [];

  onMount(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'games-oneshot'));
      gamesDatabase = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch(e) {
      console.error(e);
    }
  });

  function handleSubmit() {
    if (requestedGame) {
      const game = gamesDatabase.find(g => g.id === requestedGame);
      if (game) {
        const match = game.duration.match(/(\d+)(?!.*\d)/);
        const mins = match ? parseInt(match[1]) : 0;
        if (parseInt(duration) < mins) {
          alert(`⚠️ WARNING: ${game.title} typically takes ${game.duration}. Your ${duration}-minute slot might not be long enough! Please select a longer duration.`);
          return;
        }
      }
    }
    alert(`🐝 Reservation Confirmed!\n\nThank you, ${name}!\nYour table for ${party} is booked for ${date} at ${time} for ${duration} minutes.\n${requestedGame ? `✓ We will have ${gamesDatabase.find(g => g.id === requestedGame).title} ready.` : ''}\n${gmTutor ? '✓ Dedicated Game Master requested for rule tutorial.' : ''}\n\nWe look forward to seeing you at the Hive!`);
    name = '';
    email = '';
    date = '';
    time = '6:00 PM';
    duration = '120';
    party = '3 - 4 Players';
    zone = 'main';
    requestedGame = '';
    gmTutor = true;
  }
</script>

<section id="reserve" class="section-padding">
  <div class="container">
    <div class="section-header">
      <span class="section-badge"><i class="fa-solid fa-chair"></i> Reserve Your Spot</span>
      <h2>Book Your Table At The Hive</h2>
      <p>Ensure your group has a reserved table, comfortable gaming chairs, and optional Game Master support.</p>
    </div>

    <div class="reservation-card">
      <form id="table-reservation-form" on:submit|preventDefault={handleSubmit}>
        <div class="booking-form-grid">
          <div class="form-field">
            <label for="res-name"><i class="fa-solid fa-user"></i> Your Full Name</label>
            <input type="text" id="res-name" bind:value={name} placeholder="e.g., Alex Morgan" required>
          </div>
          <div class="form-field">
            <label for="res-email"><i class="fa-solid fa-envelope"></i> Email Address</label>
            <input type="email" id="res-email" bind:value={email} placeholder="alex@example.com" required>
          </div>
          <div class="form-field">
            <label for="res-date"><i class="fa-solid fa-calendar-days"></i> Booking Date</label>
            <input type="date" id="res-date" bind:value={date} required>
          </div>
          <div class="form-field">
            <label for="res-time"><i class="fa-solid fa-clock"></i> Start Time</label>
            <select id="res-time" bind:value={time} required>
              <option value="12:00 PM">12:00 PM (Lunch Gaming)</option>
              <option value="2:00 PM">2:00 PM (Afternoon Session)</option>
              <option value="4:00 PM">4:00 PM</option>
              <option value="6:00 PM">6:00 PM (Prime Evening)</option>
              <option value="8:00 PM">8:00 PM (Late Night Session)</option>
            </select>
          </div>
          <div class="form-field">
            <label for="reserve-time"><i class="fa-solid fa-hourglass-half"></i> Reservation Duration</label>
            <select id="reserve-time" bind:value={duration} required>
              <option value="60">1 Hour</option>
              <option value="120">2 Hours</option>
              <option value="180">3 Hours</option>
              <option value="240">4 Hours</option>
            </select>
          </div>
          <div class="form-field">
            <label for="res-party"><i class="fa-solid fa-users"></i> Party Size</label>
            <select id="res-party" bind:value={party} required>
              <option value="1 Player">1 Player (Solo Gaming)</option>
              <option value="2 Players">2 Players (Duel Table)</option>
              <option value="3 - 4 Players">3 - 4 Players (Standard Table)</option>
              <option value="5 - 6 Players">5 - 6 Players (Large Group)</option>
              <option value="7+ Players">7+ Players (Party Suite)</option>
            </select>
          </div>
          <div class="form-field">
            <label for="res-zone"><i class="fa-solid fa-compass"></i> Preferred Zone</label>
            <select id="res-zone" bind:value={zone}>
              <option value="main">Main Gaming Lounge</option>
              <option value="rpg">Private RPG & D&D Sanctuary</option>
              <option value="cozy">Cozy Sofa & Coffee Corner</option>
            </select>
          </div>
          <div class="form-field">
            <label for="reserve-game-request"><i class="fa-solid fa-dice"></i> Request a Game (Optional)</label>
            <select id="reserve-game-request" bind:value={requestedGame}>
              <option value="">No specific game</option>
              {#each gamesDatabase as game}
                <option value={game.id}>{game.title}</option>
              {/each}
            </select>
          </div>
          <div class="form-group-full">
            <div class="gm-tutor-box">
              <input type="checkbox" id="res-gm-tutor" bind:checked={gmTutor}>
              <div class="gm-tutor-info">
                <strong>Request Dedicated Game Master (Rule Tutor)</strong>
                <p>Our Game Master will greet your table, recommend games tailored to your party, set up the board, and teach the rules in minutes so you skip the manual!</p>
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
