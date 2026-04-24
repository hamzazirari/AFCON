import React from 'react';
import useMatchStore from '../store/useMatchStore';

const FavoriteButton = ({ fixtureId }) => {
  const { toggleFavorite, isFavorite } = useMatchStore();
  const active = isFavorite(fixtureId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(fixtureId);
      }}
      className={`p-2 rounded-full transition-all duration-300 ${
        active 
          ? 'bg-gold/20 text-gold scale-110' 
          : 'bg-white/5 text-gray-500 hover:text-gray-300'
      }`}
      title={active ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <svg 
        className="w-6 h-6" 
        fill={active ? "currentColor" : "none"} 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" 
        />
      </svg>
    </button>
  );
};

export default FavoriteButton;
