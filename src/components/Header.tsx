// src/components/Header.tsx

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Globe, Sun, Moon, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { changeLanguage, availableLanguages } from '../utils/i18n';
import { getAuthUser } from '../utils/localStorageHelpers';

interface HeaderProps {
  darkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const Header = ({ darkMode = true, toggleDarkMode }: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const authUser = getAuthUser();

  const handleLanguageChange = (lng: 'fr' | 'en' | 'wo') => {
    changeLanguage(lng);
    setShowLangMenu(false);
  };

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/catalogue', label: 'Catalogue' },
    { to: '/scan', label: 'Scanner QR' },
    { to: '/virtual-tour', label: 'Visite 360°' },
    { to: '/account', label: 'Compte' },
  ];

  if (authUser?.isAdmin) {
    navLinks.push({ to: '/admin', label: 'Admin' });
  }

  return (
    <header className={`${darkMode ? 'bg-black' : 'bg-white'} border-b ${darkMode ? 'border-gray-900' : 'border-gray-200'} sticky top-0 z-50 transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center`}>
              <span className="text-xl sm:text-2xl font-bold text-[#D4AF37]">L</span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg sm:text-xl font-bold text-[#D4AF37] tracking-wide`}>
                Light Of Africa
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'} uppercase tracking-widest`}>
                MCN Digital Experience
              </p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${darkMode ? 'text-gray-300 hover:text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'} transition-colors font-medium`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {authUser && (
              <Link
                to="/account"
                className={`flex items-center space-x-2 px-3 py-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-colors`}
              >
                <User size={18} className="text-[#D4AF37]" />
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-black'}`}>
                  {authUser.name.split(' ')[0]}
                </span>
              </Link>
            )}

            {/* Sélecteur de langue */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center space-x-2 ${darkMode ? 'text-gray-300 hover:text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'} transition-colors`}
                aria-label="Changer de langue"
              >
                <Globe size={20} />
                <span className="text-sm uppercase">{i18n.language}</span>
              </button>

              {showLangMenu && (
                <div className={`absolute right-0 mt-2 w-40 ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden shadow-xl`}>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as 'fr' | 'en' | 'wo')}
                      className={`w-full px-4 py-2 text-left ${darkMode ? 'text-gray-300 hover:bg-[#D4AF37] hover:text-black' : 'text-gray-700 hover:bg-[#D4AF37] hover:text-white'} transition-colors text-sm flex items-center space-x-2 ${i18n.language === lang.code ? 'bg-[#D4AF37]/20' : ''}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Toggle Dark/Light Mode */}
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className={`${darkMode ? 'text-gray-300 hover:text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'} transition-colors`}
                aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
          </div>

          {/* Menu Mobile Button */}
          <button
            className={`md:hidden ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {showMobileMenu && (
          <nav className={`md:hidden ${darkMode ? 'border-gray-800' : 'border-gray-200'} border-t py-4`}>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="flex items-center justify-between px-4 py-2">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Langue</span>
                <select
                  value={i18n.language}
                  onChange={(e) => handleLanguageChange(e.target.value as 'fr' | 'en' | 'wo')}
                  className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {toggleDarkMode && (
                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center justify-between px-4 py-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                >
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {darkMode ? 'Mode clair' : 'Mode sombre'}
                  </span>
                  {darkMode ? <Sun size={20} className="text-[#D4AF37]" /> : <Moon size={20} className="text-[#D4AF37]" />}
                </button>
              )}

              {!authUser && (
                <Link
                  to="/account"
                  className="px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors text-center"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Connexion
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};