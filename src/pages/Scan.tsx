// src/pages/Scan.tsx

import { useTranslation } from 'react-i18next';

export const Scan = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">{t('scanArtwork')}</h1>
        <p className="text-gray-400">{t('scanInstructions')}</p>
        <div className="mt-8 w-64 h-64 border-4 border-yellow-600 rounded-lg mx-auto"></div>
      </div>
    </div>
  );
};