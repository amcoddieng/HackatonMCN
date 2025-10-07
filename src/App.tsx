// src/App.tsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
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
import { Auth } from './pages/Auth';

function App() {
  // Initialiser le localStorage au premier chargement
  useEffect(() => {
    initializeLocalStorage();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          
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
              
              {/* Connexion & Inscription */}
              <Route path="/auth" element={<Auth />} />

              {/* Route 404 - Redirection vers Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;