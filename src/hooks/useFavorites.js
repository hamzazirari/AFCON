import { useEffect } from 'react';
import useMatchStore from '../store/useMatchStore';

export const useFavorites = () => {
  const { 
    favorites, 
    toggleFavorite, 
    loadFavoritesFromStorage, 
    isFavorite 
  } = useMatchStore();

  useEffect(() => {
    loadFavoritesFromStorage();
  }, [loadFavoritesFromStorage]);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};

export default useFavorites;
