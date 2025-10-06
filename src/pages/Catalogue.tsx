import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { artworks, categories, Artwork } from '../data/data';
import { useTheme } from '../contexts/ThemeContext';

export const Catalogue = () => {
  const { t, i18n } = useTranslation();
  const { darkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const lang = i18n.language as 'fr' | 'en' | 'wo';
  const ITEMS_PER_PAGE = 12;

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesSearch = search
      ? artwork.title[lang].toLowerCase().includes(search.toLowerCase()) ||
        artwork.description[lang].toLowerCase().includes(search.toLowerCase())
      : true;
    const matchesCategory = category === '' || artwork.category === category;
    return matchesSearch && matchesCategory;
  });

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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-black'} py-12`}>
      <div className="container mx-auto px-4">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-8`}>{t('catalogue.title')}</h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className={`border ${darkMode ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-black'} rounded-lg py-2 px-4 w-full md:w-1/2`}
          />

          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            className={`border ${darkMode ? 'border-gray-700 bg-gray-900 text-gray-100' : 'border-gray-300 bg-white text-black'} rounded-lg py-2 px-4 w-full md:w-1/2`}
          >
            <option value="">{t('allCategories')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {currentArtworks.length === 0 ? (
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{t('catalogue.noResults')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentArtworks.map((artwork: Artwork) => (
              <a
                key={artwork.id}
                href={`/oeuvre/${artwork.id}`}
                className={`${darkMode ? 'bg-gray-900 hover:border-yellow-600' : 'bg-white hover:border-yellow-500 border-gray-200'} rounded-lg overflow-hidden border transition-all block`}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title[lang]}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-black'} mb-2`}>{artwork.title[lang]}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{artwork.category}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-black'} px-4 py-2 rounded disabled:opacity-50`}
            >
              {t('previous')}
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-200 text-black'} px-4 py-2 rounded disabled:opacity-50`}
            >
              {t('next')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};