import React, { useEffect } from 'react';
import useMatchStore from '../store/useMatchStore';
import MatchCard from '../components/MatchCard';
import Pagination from '../components/Pagination';
import FavoritesSection from '../components/FavoritesSection';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const { 
    fetchMatches, 
    loadFavoritesFromStorage, 
    isLoading, 
    error, 
    getPaginatedMatches, 
    currentPage, 
    getTotalPages, 
    setPage,
    matches
  } = useMatchStore();

  useEffect(() => {
    fetchMatches();
    loadFavoritesFromStorage();
  }, [fetchMatches, loadFavoritesFromStorage]);

  const paginatedMatches = getPaginatedMatches();
  const totalPages = getTotalPages();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center space-x-3 mb-4">
          <div className="w-12 h-1 h-px bg-primary rounded-full"></div>
          <span className="text-primary font-black uppercase tracking-[0.3em] text-xs">AFCON MOROCCO 2026</span>
          <div className="w-12 h-1 h-px bg-secondary rounded-full"></div>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">
          Quarts de finale
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Suivez en direct les résultats et les statistiques des moments forts de la Coupe d'Afrique des Nations 2026.
        </p>
      </header>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : matches.length === 0 ? (
        <div className="text-center py-20 px-6 glass-card border-white/5">
           <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           <h3 className="text-xl font-bold text-gray-300">Aucun match disponible</h3>
           <p className="text-sm text-gray-500 mt-2">Les matchs des Quarts de finale ne sont pas encore programmés ou disponibles.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {paginatedMatches.map((match) => (
              <MatchCard key={match.fixture.id} match={match} />
            ))}
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />

          <FavoritesSection />
        </>
      )}
    </div>
  );
};

export default HomePage;
