import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  getMatchDetails, 
  getMatchStatistics, 
  getMatchEvents, 
  getMatchLineups 
} from '../api/footballApi';
import MatchStats from '../components/MatchStats';
import MatchEvents from '../components/MatchEvents';
import ManOfTheMatch from '../components/ManOfTheMatch';
import Lineups from '../components/Lineups';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import FavoriteButton from '../components/FavoriteButton';

const MatchDetailPage = () => {
  const { fixtureId } = useParams();
  const [data, setData] = useState({
    match: null,
    stats: [],
    events: [],
    lineups: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [match, stats, events, lineups] = await Promise.all([
          getMatchDetails(fixtureId),
          getMatchStatistics(fixtureId),
          getMatchEvents(fixtureId),
          getMatchLineups(fixtureId)
        ]);

        if (!match) {
          throw new Error('Match non trouvé');
        }

        setData({
          match,
          stats,
          events,
          lineups,
          isLoading: false,
          error: null
        });
      } catch (err) {
        setData(prev => ({ 
          ...prev, 
          isLoading: false, 
          error: err.message || 'Erreur lors du chargement des détails.' 
        }));
      }
    };

    fetchData();
  }, [fixtureId]);

  if (data.isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader /></div>;
  if (data.error) return <div className="max-w-4xl mx-auto px-4 py-20"><ErrorMessage message={data.error} /></div>;

  const { match, stats, events, lineups } = data;
  const date = new Date(match.fixture.date).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link 
        to="/" 
        className="inline-flex items-center text-primary font-bold hover:translate-x-[-4px] transition-transform mb-8 group"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7 7-7" />
        </svg>
        Retour à l'accueil
      </Link>

      {/* Hero Match Header */}
      <div className="glass-card p-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
        <div className="absolute top-6 right-6">
           <FavoriteButton fixtureId={match.fixture.id} />
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="text-center mb-10">
               <span className="text-xs font-black uppercase bg-white/10 px-3 py-1 rounded-full tracking-widest text-gray-300">
                  {match.fixture.venue.name} • {match.fixture.venue.city}
               </span>
               <p className="text-sm text-gray-400 mt-4 font-medium capitalize">{date}</p>
            </div>

            <div className="flex items-center justify-between w-full max-w-3xl">
                <div className="flex flex-col items-center flex-1">
                   <img src={match.teams.home.logo} alt="" className="w-24 h-24 md:w-32 md:h-32 object-contain mb-4 drop-shadow-2xl" />
                   <h2 className="text-xl md:text-2xl font-black text-center">{match.teams.home.name}</h2>
                </div>

                <div className="flex flex-col items-center px-8">
                   <div className="text-6xl md:text-8xl font-black flex items-center tabular-nums">
                      <span className="text-primary">{match.goals.home ?? 0}</span>
                      <span className="mx-4 text-white/20">-</span>
                      <span className="text-secondary">{match.goals.away ?? 0}</span>
                   </div>
                   <span className="mt-4 px-4 py-1 bg-white/5 rounded font-bold text-xs uppercase tracking-widest text-gray-500">
                      {match.fixture.status.long}
                   </span>
                </div>

                <div className="flex flex-col items-center flex-1">
                   <img src={match.teams.away.logo} alt="" className="w-24 h-24 md:w-32 md:h-32 object-contain mb-4 drop-shadow-2xl" />
                   <h2 className="text-xl md:text-2xl font-black text-center">{match.teams.away.name}</h2>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <ManOfTheMatch events={events} match={match} />
            <MatchEvents events={events} />
            <Lineups lineups={lineups} />
         </div>
         <div className="space-y-8">
            <MatchStats statistics={stats} />
            
            <div className="glass-card p-6 bg-primary/5 border-primary/20">
               <h4 className="font-bold mb-2">Arbitre</h4>
               <p className="text-sm text-gray-400">{match.fixture.referee || 'Non spécifié'}</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default MatchDetailPage;
