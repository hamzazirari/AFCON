import React from 'react';

const MatchStats = ({ statistics }) => {
  if (!statistics || statistics.length < 2) return null;

  const homeStats = statistics[0].statistics;
  const awayStats = statistics[1].statistics;

  const getStatValue = (stats, type) => {
    const stat = stats.find(s => s.type === type);
    return stat ? stat.value : 0;
  };

  const statTypes = [
    { label: 'Possession', type: 'Ball Possession', suffix: '' },
    { label: 'Tirs au but', type: 'Total Shots', suffix: '' },
    { label: 'Tirs cadrés', type: 'Shots on Goal', suffix: '' },
    { label: 'Corners', type: 'Corner Kicks', suffix: '' },
    { label: 'Fautes', type: 'Fouls', suffix: '' },
    { label: 'Cartons Jaunes', type: 'Yellow Cards', suffix: '' },
  ];

  const parseValue = (val) => {
    if (typeof val === 'string' && val.includes('%')) {
      return parseInt(val.replace('%', ''));
    }
    return val || 0;
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <h3 className="text-xl font-bold border-b border-white/5 pb-4">Statistiques</h3>
      
      {statTypes.map((stat) => {
        const homeVal = getStatValue(homeStats, stat.type);
        const awayVal = getStatValue(awayStats, stat.type);
        const homeNum = parseValue(homeVal);
        const awayNum = parseValue(awayVal);
        const total = homeNum + awayNum || 1;
        const homePercent = (homeNum / total) * 100;

        return (
          <div key={stat.type} className="space-y-2">
            <div className="flex justify-between text-sm font-semibold uppercase text-gray-400">
              <span>{homeVal || '0'}{stat.suffix}</span>
              <span>{stat.label}</span>
              <span>{awayVal || '0'}{stat.suffix}</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${homePercent}%` }}
              ></div>
              <div 
                className="h-full bg-secondary" 
                style={{ width: `${100 - homePercent}%` }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchStats;
