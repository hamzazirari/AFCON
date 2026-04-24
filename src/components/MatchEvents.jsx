import React from 'react';

const EventIcon = ({ type, detail }) => {
  if (type === 'Goal') return <span>⚽</span>;
  if (type === 'Card' && detail === 'Yellow Card') return <span className="text-yellow-400">🟨</span>;
  if (type === 'Card' && detail === 'Red Card') return <span className="text-red-600">🟥</span>;
  if (type === 'subst') return <span className="text-blue-400">🔄</span>;
  return null;
};

const MatchEvents = ({ events }) => {
  if (!events || events.length === 0) return null;

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold border-b border-white/5 pb-4 mb-6">Événements</h3>
      
      <div className="relative border-l border-white/10 ml-4 space-y-8 pb-4">
        {events.map((event, index) => (
          <div key={index} className="relative pl-8">
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-card border-2 border-white/20"></div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-primary tabular-nums w-8">{event.time.elapsed}'</span>
              <EventIcon type={event.type} detail={event.detail} />
              <div className="flex flex-col">
                <span className="text-sm font-bold">{event.player.name}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                  {event.team.name} • {event.detail}
                  {event.assist?.name && ` (Assist: ${event.assist.name})`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchEvents;
