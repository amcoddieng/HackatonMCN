// src/pages/Catalogue.tsx

import { useTranslation } from 'react-i18next';
import { artworks } from '../data/data';

export const Catalogue = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">{t('catalogue.title')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <a
              key={artwork.id}
              href={`/oeuvre/${artwork.id}`}
              className="bg-gray-900 rounded-lg overflow-hidden hover:border-yellow-600 border border-transparent transition-all block"
            >
              <img src={artwork.imageUrl} alt={artwork.title.fr} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{artwork.title.fr}</h3>
                <p className="text-gray-400 text-sm">{artwork.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};