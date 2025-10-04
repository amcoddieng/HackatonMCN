// src/components/Header.tsx

import { useTranslation } from 'react-i18next';
import { Globe, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { changeLanguage, availableLanguages } from '../utils/i18n';

interface HeaderProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const Header = ({ darkMode = true, toggleDarkMode }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const handleLanguageChange = (lng: 'fr' | 'en' | 'wo') => {
    changeLanguage(lng);
    setShowLangMenu(false);
  };

  return (
    <header className="bg-black border-b border-gray-900 sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
              <span className="text-2xl font-bold text-[#D4AF37]">L</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#D4AF37] tracking-wide">Light Of Africa</h1>
              <p className="text-xs text-gray-500 uppercase tracking-widest">MCN Digital Experience</p>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Accueil
            </a>
            <a href="/catalogue" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Catalogue
            </a>
            <a href="/scan" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Scanner QR
            </a>
            <a href="/virtual-tour" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Visite Virtuelle
            </a>
            <a href="/account" className="text-gray-300 hover:text-[#D4AF37] transition-colors">
              Compte
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 text-gray-300 hover:text-[#D4AF37] transition-colors"
              >
                <Globe size={20} />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-xl">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as 'fr' | 'en' | 'wo')}
                      className="w-full px-4 py-2 text-left text-gray-300 hover:bg-[#D4AF37] hover:text-black transition-colors text-sm"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Toggle Dark Mode */}
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};