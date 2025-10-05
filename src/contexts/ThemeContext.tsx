// src/contexts/ThemeContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Initialiser depuis localStorage ou par défaut à true (dark mode)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('loa_theme');
    return saved ? saved === 'dark' : true;
  });

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('loa_theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Pas besoin d'useEffect car on sauvegarde directement dans toggleDarkMode

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};