import React from 'react';
import useMatchStore from '../store/useMatchStore';
import { Link } from 'react-router-dom';

const FavoritesSection = () => {
  const { matches, favorites, toggleFavorite } = useMatchStore();
  
  const favoriteMatches = matches.filter(m => favorites.includes(m.fixture.id));

  if (favoriteMatches.length === 0) return null;

  return (
    <section className="mt-16 mb-12">
      <div className="flex items-center space-x-3 mb-6">
        <h2 className="text-2xl font-black flex items-center">
          <span className="text-gold mr-2 text-3xl">★</span> Mes Favoris
        </h2>
        <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {favoriteMatches.length} Match{favoriteMatches.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {favoriteMatches.map((match) => (
          <div key={match.fixture.id} className="glass-card p-4 relative group">
             <button 
                onClick={() => toggleFavorite(match.fixture.id)}
                className="absolute top-2 right-2 text-gold p-1 hover:text-white transition-colors"
                title="Retirer des favoris"
             >
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
               </svg>
             </button>

             <Link to={`/match/${match.fixture.id}`} className="block">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex flex-col items-center flex-1">
                      <img src={match.teams.home.logo} alt="" className="w-8 h-8 object-contain mb-1" />
                      <span className="text-[10px] font-bold text-center truncate w-full">{match.teams.home.name}</span>
                   </div>
                   <div className="mx-2 text-sm font-black text-primary">
                      {match.goals.home ?? 0} - {match.goals.away ?? 0}
                   </div>
                   <div className="flex flex-col items-center flex-1">
                      <img src={match.teams.away.logo} alt="" className="w-8 h-8 object-contain mb-1" />
                      <span className="text-[10px] font-bold text-center truncate w-full">{match.teams.away.name}</span>
                   </div>
                </div>
                <div className="text-center text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                   {match.fixture.status.long}
                </div>
             </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoritesSection;
