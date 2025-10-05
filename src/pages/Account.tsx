// src/pages/Account.tsx

import { useTranslation } from 'react-i18next';
import { getAuthUser, getUserProgress } from '../utils/localStorageHelpers';
import { useTheme } from '../contexts/ThemeContext';

export const Account = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const user = getAuthUser();
  const progress = getUserProgress();

  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-4`}>{t('account.title')}</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{t('account.loginRequired')}</p>
          <a href="/account" className={`px-6 py-3 ${darkMode ? 'bg-yellow-600' : 'bg-yellow-500'} text-black rounded-lg font-semibold`}>
            {t('auth.login')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'} py-12`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-8`}>{t('account.title')}</h1>
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'} p-6 rounded-lg`}>
          <p className="text-xl mb-4">Bienvenue, {user.name}</p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Score: {progress.score}</p>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Badges: {progress.badges.length}</p>
        </div>
      </div>
    </div>
  );
};