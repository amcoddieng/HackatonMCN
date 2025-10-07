import { useTranslation } from 'react-i18next';
import { getAuthUser, getUserProgress } from '../utils/localStorageHelpers';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

export const Account = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const user = getAuthUser();
  const progress = getUserProgress();

  if (!user) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-black"} flex items-center justify-center transition-all duration-300`}>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{t('account.title')}</h1>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>{t('account.loginRequired')}</p>
          <Link to="/auth" className="px-6 py-3 bg-yellow-600 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300">
            {t('auth.login')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-black"} py-12 transition-all duration-300`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">{t('account.title')}</h1>
        <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-gray-50 text-black"} p-6 rounded-lg transition-all duration-300 hover:shadow-lg`}>
          <p className="text-xl mb-4">{t('account.welcome')}, {user.name}</p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{t('account.score')}: {progress?.score ?? 0}</p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{t('account.badges')}: {progress?.badges?.length ?? 0}</p>
        </div>
      </div>
    </div>
  );
};