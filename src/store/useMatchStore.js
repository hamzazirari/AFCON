import { create } from 'zustand';
import { getQuarterFinalMatches } from '../api/footballApi';

const useMatchStore = create((set, get) => ({
  matches: [],
  currentPage: 1,
  isLoading: false,
  error: null,
  favorites: [],

  fetchMatches: async () => {
    set({ isLoading: true, error: null });
    const data = await getQuarterFinalMatches();
    
    if (data === null) {
      set({ isLoading: false, error: 'Impossible de récupérer les matchs. Vérifiez votre clé API.' });
    } else {
      set({ matches: data, isLoading: false });
    }
  },

  setPage: (page) => {
    set({ currentPage: page });
  },

  toggleFavorite: (fixtureId) => {
    const { favorites } = get();
    let newFavorites;
    
    if (favorites.includes(fixtureId)) {
      newFavorites = favorites.filter(id => id !== fixtureId);
    } else {
      newFavorites = [...favorites, fixtureId];
    }
    
    set({ favorites: newFavorites });
    localStorage.setItem('afcon_favorites', JSON.stringify(newFavorites));
  },

  loadFavoritesFromStorage: () => {
    const stored = localStorage.getItem('afcon_favorites');
    if (stored) {
      set({ favorites: JSON.parse(stored) });
    }
  },

  // Getters / Computed
  getPaginatedMatches: () => {
    const { matches, currentPage } = get();
    const startIndex = (currentPage - 1) * 2;
    return matches.slice(startIndex, startIndex + 2);
  },

  getTotalPages: () => {
    const { matches } = get();
    return Math.ceil(matches.length / 2) || 1;
  },

  isFavorite: (fixtureId) => {
    return get().favorites.includes(fixtureId);
  }
}));

export default useMatchStore;
