// src/pages/Account.tsx

import { useTranslation } from 'react-i18next';
import { getAuthUser, getUserProgress } from '../utils/localStorageHelpers';

export const Account = () => {
  const { t } = useTranslation();
  const user = getAuthUser();
  const progress = getUserProgress();

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">{t('account.title')}</h1>
          <p className="text-gray-400 mb-4">{t('account.loginRequired')}</p>
          <a href="/account" className="px-6 py-3 bg-yellow-600 text-black rounded-lg font-semibold">
            {t('auth.login')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">{t('account.title')}</h1>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p className="text-xl mb-4">Bienvenue, {user.name}</p>
          <p className="text-gray-400">Score: {progress.score}</p>
          <p className="text-gray-400">Badges: {progress.badges.length}</p>
        </div>
      </div>
    </div>
  );
};