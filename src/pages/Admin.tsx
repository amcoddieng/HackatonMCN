// src/pages/Admin.tsx

import { useTranslation } from 'react-i18next';
import { getAuthUser, getStats } from '../utils/localStorageHelpers';
import { useTheme } from '../contexts/ThemeContext';

export const Admin = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const user = getAuthUser();
  const stats = getStats();

  if (!user || !user.isAdmin) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'} flex items-center justify-center`}>
        <p className="text-xl text-red-400">{t('admin.accessDenied')}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'} py-12`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-8`}>{t('admin.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'} p-6 rounded-lg`}>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t('admin.visitors')}</p>
            <p className={`text-3xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{stats.uniqueVisitors}</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'} p-6 rounded-lg`}>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t('admin.scans')}</p>
            <p className={`text-3xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{stats.qrScans}</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'} p-6 rounded-lg`}>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t('admin.quizzes')}</p>
            <p className={`text-3xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>{stats.quizzesCompleted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};