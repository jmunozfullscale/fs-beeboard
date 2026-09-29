const fs = require('fs');

// Fix Footer.svelte
let footer = fs.readFileSync('src/lib/components/Footer.svelte', 'utf8');
footer = footer.replace(/onsubmit="[^"]+"/g, 'on:submit={handleNewsletterSubmit}');
footer = footer.replace('<!-- Migrated from index.html -->', `<script>
  function handleNewsletterSubmit(e) {
    e.preventDefault();
    alert('🐝 Welcome to the Swarm! Check your inbox for sweet perks.');
    e.target.reset();
  }
</script>
`);
fs.writeFileSync('src/lib/components/Footer.svelte', footer, 'utf8');

// Fix Hero.svelte
let hero = fs.readFileSync('src/lib/components/Hero.svelte', 'utf8');
hero = hero.replace(/onclick="[^"]+"/g, '');
fs.writeFileSync('src/lib/components/Hero.svelte', hero, 'utf8');

console.log('Fixed event handlers in Footer.svelte and Hero.svelte');
