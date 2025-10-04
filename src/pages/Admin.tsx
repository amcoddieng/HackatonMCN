// src/pages/Admin.tsx

import { useTranslation } from 'react-i18next';
import { getAuthUser, getStats } from '../utils/localStorageHelpers';

export const Admin = () => {
  const { t } = useTranslation();
  const user = getAuthUser();
  const stats = getStats();

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl text-red-400">{t('admin.accessDenied')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">{t('admin.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-6 rounded-lg">
            <p className="text-gray-400">{t('admin.visitors')}</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.uniqueVisitors}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <p className="text-gray-400">{t('admin.scans')}</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.qrScans}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <p className="text-gray-400">{t('admin.quizzes')}</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.quizzesCompleted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};