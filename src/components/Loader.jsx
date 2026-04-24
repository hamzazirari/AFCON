import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-400 font-medium">Chargement des données...</p>
    </div>
  );
};

export default Loader;
