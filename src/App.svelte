<script>
  import Header from './components/Header.svelte';
  import Hero from './components/Hero.svelte';
  import Featured from './components/Featured.svelte';
  import Library from './components/Library.svelte';
  import Cafe from './components/Cafe.svelte';
  import Events from './components/Events.svelte';
  import Reserve from './components/Reserve.svelte';
  import Feedback from './components/Feedback.svelte';
  import Footer from './components/Footer.svelte';
  import Admin from './components/Admin.svelte';
  import { onMount } from 'svelte';

  let hash = '';

  onMount(() => {
    hash = window.location.hash;
    const updateHash = () => { hash = window.location.hash; };
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  });
</script>

<Header />

<main>
  {#if hash === '#admin'}
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
