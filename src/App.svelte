<script>
  import './assets/styles/main.scss';
  import Header from './lib/components/Header.svelte';
  import Hero from './lib/components/Hero.svelte';
  import Featured from './lib/components/Featured.svelte';
  import Library from './lib/components/Library.svelte';
  import Cafe from './lib/components/Cafe.svelte';
  import Events from './lib/components/Events.svelte';
  import Reserve from './lib/components/Reserve.svelte';
  import Feedback from './lib/components/Feedback.svelte';
  import Footer from './lib/components/Footer.svelte';
  import Admin from './lib/components/Admin.svelte';
  import { onMount } from 'svelte';

  let currentHash = '';

  onMount(() => {
    currentHash = window.location.hash;
    window.addEventListener('hashchange', () => {
      currentHash = window.location.hash;
    });
  });
</script>

<Header />
<main>
  {#if currentHash === '#admin'}
    <Admin />
  {:else}
    <Hero />
    <Featured />
    <Library />
    <Cafe />
    <Events />
    <Reserve />
    <Feedback />
  {/if}
</main>
<Footer />
