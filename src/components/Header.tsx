// src/components/Header.tsx

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Globe, Sun, Moon, Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import { changeLanguage, availableLanguages } from '../utils/i18n';
import { getAuthUser, removeAuthUser } from '../utils/localStorageHelpers';
import { useTheme } from '../contexts/ThemeContext';

export const Header = () => {
  const { i18n } = useTranslation();
  const { darkMode, toggleDarkMode } = useTheme();
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const authUser = getAuthUser();

  const handleLanguageChange = (lng: 'fr' | 'en' | 'wo') => {
    changeLanguage(lng);
    setShowLangMenu(false);
  };

  const handleLogout = () => {
    removeAuthUser();
    window.location.href = '/';
  };

  const navLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/catalogue', label: 'Catalogue' },
    { to: '/scan', label: 'Scanner QR' },
    { to: '/virtual-tour', label: 'Visite 360°' },
    { to: '/auth', label: 'Compte' },
  ];

  if (authUser?.isAdmin) {
    navLinks.push({ to: '/admin', label: 'Admin' });
  }

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'} border-b sticky top-0 z-50 transition-colors duration-300`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
              <span className="text-xl sm:text-2xl font-bold text-[#D4AF37]">L</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-[#D4AF37] tracking-wide">Light Of Africa</h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} uppercase tracking-widest`}>MCN Digital Experience</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`${darkMode ? 'text-gray-100 hover:text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'} transition-colors duration-300 font-medium hover:scale-105`}
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
                className={`flex items-center space-x-2 px-3 py-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg transition-all duration-300 hover:shadow-md`}
              >
                <User size={18} className="text-[#D4AF37]" />
                <span className={`text-sm ${darkMode ? 'text-gray-100' : 'text-black'}`}>{authUser.name.split(' ')[0]}</span>
              </Link>
            )}

            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`flex items-center space-x-2 ${darkMode ? 'text-gray-100 hover:text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'} transition-colors duration-300`}
                aria-label="Changer de langue"
              >
                <Globe size={20} />
                <span className="text-sm uppercase">{i18n.language}</span>
              </button>

              {showLangMenu && (
                <div className={`absolute right-0 mt-2 w-40 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden shadow-xl transition-all duration-300`}>
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code as 'fr' | 'en' | 'wo')}
                      className={`w-full px-4 py-2 text-left ${darkMode ? 'text-gray-100 hover:bg-[#D4AF37] hover:text-black' : 'text-gray-700 hover:bg-[#D4AF37] hover:text-white'} transition-colors duration-300 text-sm flex items-center space-x-2 ${i18n.language === lang.code ? 'bg-[#D4AF37]/20' : ''}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleDarkMode}
              className={`${darkMode ? 'text-gray-100 hover:text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'} transition-colors duration-300`}
              aria-label={darkMode ? 'Mode clair' : 'Mode sombre'}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Logout */}
            {authUser && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-red-500 hover:text-red-400 transition-colors duration-300 rounded-lg"
              >
                <LogOut size={18} />
                <span className="text-sm">Se déconnecter</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label="Menu"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {showMobileMenu && (
          <nav className={`md:hidden ${darkMode ? 'border-gray-600' : 'border-gray-200'} border-t py-4 transition-all duration-300`}>
            <div className="flex flex-col space-y-3 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'} hover:shadow-md`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center justify-between px-4 py-2">
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} `}>Langue</span>
                <select
                  value={i18n.language}
                  onChange={(e) => handleLanguageChange(e.target.value as 'fr' | 'en' | 'wo')}
                  className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-gray-100 text-black border-gray-300'} border transition-all duration-300`}
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={toggleDarkMode}
                className={`flex items-center justify-between px-4 py-2 rounded-lg transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} hover:shadow-md`}
              >
                <span className={`text-sm ${darkMode ? 'text-gray-100' : 'text-gray-700'}`}>{darkMode ? 'Mode clair' : 'Mode sombre'}</span>
                {darkMode ? <Sun size={20} className="text-[#D4AF37]" /> : <Moon size={20} className="text-[#D4AF37]" />}
              </button>

              {!authUser ? (
                <Link
                  to="/account"
                  className="px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 text-center hover:shadow-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Connexion
                </Link>
              ) : (
                <div className="flex items-center space-x-3 px-4">
                  <Link
                    to="/account"
                    className={`flex-1 px-4 py-2 rounded-lg transition-all duration-300 ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-black'} hover:shadow-md`}
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <User size={18} className="text-[#D4AF37]" />
                      <span className="text-sm">{authUser.name.split(' ')[0]}</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all duration-300"
                  >
                    Se déconnecter
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};