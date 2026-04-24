import React from 'react';

const ManOfTheMatch = ({ events, match }) => {
  // Simple heuristic: find player with most goals, or first goal scorer
  const goals = events.filter(e => e.type === 'Goal');
  
  if (goals.length === 0) {
    return (
      <div className="glass-card p-6 border-gold/20">
        <h3 className="text-gold font-bold flex items-center">
          <span className="mr-2">🏅</span> Homme du match
        </h3>
        <p className="text-gray-400 text-sm mt-2">Non disponible</p>
      </div>
    );
  }

  // Count goals per player
  const playerGoals = {};
  goals.forEach(g => {
    playerGoals[g.player.name] = (playerGoals[g.player.name] || 0) + 1;
  });

  const motmName = Object.keys(playerGoals).reduce((a, b) => playerGoals[a] > playerGoals[b] ? a : b);
  const motmEvent = goals.find(g => g.player.name === motmName);

  return (
    <div className="glass-card p-6 bg-gradient-to-br from-card to-gold/10 border-gold/30">
      <h3 className="text-gold font-bold flex items-center uppercase tracking-widest text-xs mb-4">
        <span className="mr-2 text-xl">🏅</span> Homme du match
      </h3>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-white/5 border border-gold/50 overflow-hidden flex items-center justify-center">
             <img 
               src={`https://media.api-sports.io/football/players/${motmEvent.player.id}.png`} 
               alt={motmName}
               onError={(e) => { e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'; }}
               className="w-full h-full object-cover"
             />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-gold text-dark text-[10px] font-bold px-1 rounded">
            {playerGoals[motmName]} ⚽
          </div>
        </div>

        <div>
          <h4 className="text-xl font-black text-white">{motmName}</h4>
          <p className="text-sm font-bold text-gold/80 flex items-center">
            <img src={motmEvent.team.logo} className="w-4 h-4 mr-2 object-contain" alt="" />
            {motmEvent.team.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManOfTheMatch;
