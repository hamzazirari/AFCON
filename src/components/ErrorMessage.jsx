import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-900/20 border border-secondary text-secondary p-6 rounded-xl flex flex-col items-center text-center my-8">
      <svg className="w-12 h-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 className="text-xl font-bold mb-1">Oups ! Une erreur est survenue</h3>
      <p className="text-sm opacity-90">{message}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/80 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
};

export default ErrorMessage;
