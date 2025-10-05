// src/pages/Contribution.tsx

import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

export const Contribution = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'} py-12`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-8`}>{t('community.contribute')}</h1>
        <div className={`${darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'} p-6 rounded-lg max-w-md mx-auto`}>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600 mb-4'}>Formulaire de contribution - À venir</p>
        </div>
      </div>
    </div>
  );
};