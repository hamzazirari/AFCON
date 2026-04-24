import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const MatchCard = ({ match }) => {
  const { fixture, teams, goals } = match;
  const date = new Date(fixture.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'FT': return 'bg-gray-500';
      case 'Live':
      case '1H':
      case '2H':
      case 'HT': return 'bg-red-600 animate-pulse';
      case 'NS': return 'bg-primary';
      default: return 'bg-gray-400';
    }
  };

  const statusMap = {
    'FT': 'Terminé',
    'NS': 'À venir',
    '1H': 'En cours',
    '2H': 'En cours',
    'HT': 'Mi-temps',
  };

  return (
    <Link 
      to={`/match/${fixture.id}`}
      className="glass-card flex flex-col p-6 group hover:border-primary/30 hover:-translate-y-1 relative"
    >
      <div className="absolute top-4 right-4">
        <FavoriteButton fixtureId={fixture.id} />
      </div>

      <div className="text-center mb-6">
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded text-white ${getStatusColor(fixture.status.short)}`}>
          {statusMap[fixture.status.short] || fixture.status.long}
        </span>
        <p className="text-xs text-gray-400 mt-2 font-medium capitalize">{date}</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center w-1/3">
          <img src={teams.home.logo} alt={teams.home.name} className="w-16 h-16 object-contain mb-2 drop-shadow-xl" />
          <span className="text-sm font-bold text-center">{teams.home.name}</span>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <div className="text-4xl font-black flex items-center justify-center tabular-nums">
            {fixture.status.short === 'NS' ? (
              <span className="text-xl text-gray-500">VS</span>
            ) : (
              <>
                <span className="text-primary">{goals.home}</span>
                <span className="mx-2 text-gray-600 text-2xl">-</span>
                <span className="text-secondary">{goals.away}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center w-1/3">
          <img src={teams.away.logo} alt={teams.away.name} className="w-16 h-16 object-contain mb-2 drop-shadow-xl" />
          <span className="text-sm font-bold text-center">{teams.away.name}</span>
        </div>
      </div>

      <div className="mt-auto border-t border-white/5 pt-4 flex items-center justify-center text-[11px] text-gray-500 font-medium">
        <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {fixture.venue.name}, {fixture.venue.city}
      </div>
    </Link>
  );
};

export default MatchCard;
