import React from 'react';

const TeamLineup = ({ lineup }) => {
  if (!lineup) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-lg">
        <img src={lineup.team.logo} alt={lineup.team.name} className="w-10 h-10 object-contain" />
        <div>
          <h4 className="font-bold text-white leading-none">{lineup.team.name}</h4>
          <span className="text-xs text-primary font-medium">{lineup.formation}</span>
        </div>
      </div>

      <div>
        <h5 className="text-[10px] uppercase font-bold text-gray-500 mb-3 tracking-widest px-2">Titulaires</h5>
        <div className="space-y-1">
          {lineup.startXI.map(({ player }) => (
            <div key={player.id} className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition-colors group">
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold text-gray-500 w-5">{player.number}</span>
                <span className="text-sm font-medium group-hover:text-white transition-colors">{player.name}</span>
              </div>
              <span className="text-[10px] text-gray-600 font-bold uppercase">{player.pos}</span>
            </div>
          ))}
        </div>
      </div>

      {lineup.substitutes.length > 0 && (
        <div>
          <h5 className="text-[10px] uppercase font-bold text-gray-500 mb-3 tracking-widest px-2">Remplaçants</h5>
          <div className="space-y-1 opacity-70">
            {lineup.substitutes.map(({ player }) => (
              <div key={player.id} className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-bold text-gray-500 w-5">{player.number}</span>
                  <span className="text-sm font-medium">{player.name}</span>
                </div>
                <span className="text-[10px] text-gray-600 font-bold uppercase">{player.pos}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Lineups = ({ lineups }) => {
  if (!lineups || lineups.length === 0) return null;

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold border-b border-white/5 pb-4 mb-8">Compositions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <TeamLineup lineup={lineups[0]} />
        <TeamLineup lineup={lineups[1]} />
      </div>
    </div>
  );
};

export default Lineups;
