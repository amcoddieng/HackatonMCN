// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { Home } from './pages/Home';
import { Catalogue } from './pages/Catalogue';
import { ArtworkDetail } from './pages/ArtworkDetail';
import { Scan } from './pages/Scan';
import { VirtualTour } from './pages/VirtualTour';
import { ARViewPage } from './pages/ARViewPage';
import { Account } from './pages/Account';
import { Admin } from './pages/Admin';
import { VisitPlanner } from './pages/VisitPlanner';
import { Contribution } from './pages/Contribution';
import { initializeLocalStorage } from './utils/localStorageHelpers';
import './utils/i18n';

function App() {
  // État du thème (Dark Mode par défaut)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('loa_theme');
    return saved ? saved === 'dark' : true;
  });

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('loa_theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Initialiser le localStorage au premier chargement
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black flex flex-col">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1">
          <Routes>
            {/* Pages principales */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/oeuvre/:id" element={<ArtworkDetail />} />
            
            {/* Scanner QR */}
            <Route path="/scan" element={<Scan />} />
            
            {/* Visite Virtuelle 360° */}
            <Route path="/virtual-tour" element={<VirtualTour />} />
            <Route path="/visite-virtuelle" element={<VirtualTour />} />
            <Route path="/visite-virtuelle/:id" element={<VirtualTour />} />
            
            {/* Réalité Augmentée */}
            <Route path="/ar/:id" element={<ARViewPage />} />
            
            {/* Compte utilisateur */}
            <Route path="/account" element={<Account />} />
            
            {/* Admin Dashboard */}
            <Route path="/admin" element={<Admin />} />
            
            {/* Planification de visite */}
            <Route path="/visit-planner" element={<VisitPlanner />} />
            
            {/* Contribution */}
            <Route path="/contribution" element={<Contribution />} />
            
            {/* Route 404 - Redirection vers Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;