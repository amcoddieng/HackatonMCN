// src/pages/ARViewPage.tsx

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ARViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">{t('arExperience')}</h1>
        <p className="text-gray-400">Réalité Augmentée - Œuvre {id}</p>
      </div>
    </div>
  );
};