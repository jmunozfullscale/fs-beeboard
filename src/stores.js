import { writable } from 'svelte/store';

let initialFavorites = [];
try {
  const stored = localStorage.getItem('beeboard_favorites');
  if (stored) initialFavorites = JSON.parse(stored);
} catch (e) {
  console.warn('Failed to parse favorites from localStorage:', e);
}

export const favorites = writable(initialFavorites);

favorites.subscribe(value => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('beeboard_favorites', JSON.stringify(value));
  }
});
