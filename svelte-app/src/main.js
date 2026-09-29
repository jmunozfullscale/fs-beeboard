import { mount } from 'svelte';
import './assets/styles/main.scss';
import App from './App.svelte';

const app = mount(App, {
  target: document.getElementById('app'),
});

export default app;
