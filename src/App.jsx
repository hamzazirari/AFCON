import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MatchDetailPage from './pages/MatchDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        {/* Simple Navbar */}
        <nav className="border-b border-white/5 py-6 bg-dark/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <a href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-black text-xl group-hover:rotate-12 transition-transform">
                M
              </div>
              <div>
                <span className="block leading-none font-black text-lg tracking-tighter">AFCON</span>
                <span className="block leading-none text-[10px] uppercase font-bold text-gray-500 tracking-widest">Morocco 2026</span>
              </div>
            </a>
            
            <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest text-gray-400">
               <a href="/" className="hover:text-primary transition-colors text-white">Matchs</a>
               <span className="opacity-20">|</span>
               <span className="cursor-not-allowed">Équipes</span>
               <span className="opacity-20">|</span>
               <span className="cursor-not-allowed">Stades</span>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/match/:fixtureId" element={<MatchDetailPage />} />
          </Routes>
        </main>

        <footer className="mt-20 border-t border-white/5 py-12 text-center">
           <p className="text-gray-500 text-sm font-medium">
             © 2026 AFCON Morocco Results — Développé pour la passion du football africain.
           </p>
           <div className="mt-4 flex justify-center space-x-4 opacity-30 grayscale hover:grayscale-0 transition-all">
              <img src="https://media.api-sports.io/football/leagues/6.png" alt="AFCON" className="h-8 object-contain" />
              <img src="https://media.api-sports.io/football/players/2289.png" alt="API Football" className="h-8 object-contain" />
           </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
