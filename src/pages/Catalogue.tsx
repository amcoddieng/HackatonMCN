import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { artworks, categories, Artwork } from '../data/data';

export const Catalogue = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const lang = i18n.language as 'fr' | 'en' | 'wo';
  const ITEMS_PER_PAGE = 12; // nombre d'œuvres par page

  // Filtrage des œuvres
  const filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch = search
      ? artwork.title[lang].toLowerCase().includes(search.toLowerCase()) ||
        artwork.description[lang].toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory = category === '' || artwork.category === category;
    return matchesSearch && matchesCategory;
  });

  // Pagination : calcul des indices
  const totalPages = Math.ceil(filteredArtworks.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArtworks = filteredArtworks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8">{t('catalogue.title')}</h1>

        {/* Recherche et filtre */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="border border-gray-700 bg-gray-800 text-white rounded-lg py-2 px-4 w-full md:w-1/2"
          />

          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            className="border border-gray-700 bg-gray-800 text-white rounded-lg py-2 px-4 w-full md:w-1/2"
          >
            <option value="">{t('allCategories')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Affichage des œuvres */}
        {currentArtworks.length === 0 ? (
          <p className="text-gray-400">{t('catalogue.noResults')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentArtworks.map((artwork: Artwork) => (
              <a
                key={artwork.id}
                href={`/oeuvre/${artwork.id}`}
                className="bg-gray-900 rounded-lg overflow-hidden hover:border-yellow-600 border border-transparent transition-all block"
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title[lang]}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{artwork.title[lang]}</h3>
                  <p className="text-gray-400 text-sm">{artwork.category}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {t('previous')}
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {t('next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
