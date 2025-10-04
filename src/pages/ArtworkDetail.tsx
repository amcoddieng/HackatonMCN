// src/pages/ArtworkDetail.tsx

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArtworkById } from '../data/data';

export const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const artwork = getArtworkById(id || '');

  if (!artwork) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">Œuvre non trouvée</p>
      </div>
    );
  }

  const lang = i18n.language as 'fr' | 'en' | 'wo';

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <img src={artwork.imageUrl} alt={artwork.title[lang]} className="w-full max-h-96 object-cover rounded-lg mb-6" />
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">{artwork.title[lang]}</h1>
        <p className="text-gray-300 mb-4">{artwork.description[lang]}</p>
        <div className="text-sm text-gray-400">
          <p><strong>Période:</strong> {artwork.period}</p>
          <p><strong>Origine:</strong> {artwork.origin}</p>
        </div>
      </div>
    </div>
  );
};