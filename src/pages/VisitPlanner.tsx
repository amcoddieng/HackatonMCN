// src/pages/VisitPlanner.tsx

import { useTranslation } from 'react-i18next';

export const VisitPlanner = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">{t('reservation.title')}</h1>
        <div className="bg-gray-900 p-6 rounded-lg max-w-md mx-auto">
          <p className="text-gray-400 mb-4">Formulaire de réservation - À venir</p>
        </div>
      </div>
    </div>
  );
};