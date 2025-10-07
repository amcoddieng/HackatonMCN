import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeLocalStorage } from './utils/localStorageHelpers';



// Initialiser le localStorage au premier chargement
initializeLocalStorage();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
