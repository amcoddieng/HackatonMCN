// src/pages/VirtualTour.tsx

import { useTranslation } from 'react-i18next';

export const VirtualTour = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">{t('virtualVisit')}</h1>
        <p className="text-gray-400">Visite virtuelle 360° - À venir</p>
      </div>
    </div>
  );
};