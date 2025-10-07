import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { artworks, categories, Artwork } from '../data/data';

export const Catalogue = () => {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const lang = i18n.language as 'fr' | 'en' | 'wo';
  const ITEMS_PER_PAGE = 9;

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

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // 🌟 Animation globale du conteneur
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: 'beforeChildren' },
    },
  };

  // 🎨 Animation de chaque œuvre
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 80, damping: 12 },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      filter: 'blur(6px)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: '#000' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black text-white py-12 relative overflow-hidden"
    >
      {/* Effet lumineux de fond */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] opacity-70"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-10 text-center drop-shadow-lg"
        >
          {t('catalogue.title')}
        </motion.h1>

        {/* Barre de recherche & filtre */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-10 flex flex-col md:flex-row gap-4 justify-center"
        >
          <input
            type="text"
            placeholder={t('search')}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="border border-gray-700 bg-gray-800 text-white rounded-xl py-3 px-5 w-full md:w-1/2 focus:ring-2 focus:ring-yellow-500 transition-all"
          />
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            className="border border-gray-700 bg-gray-800 text-white rounded-xl py-3 px-5 w-full md:w-1/2 focus:ring-2 focus:ring-yellow-500 transition-all"
          >
            <option value="">{t('allCategories')}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </motion.div>

        {/* Affichage des œuvres */}
        <AnimatePresence mode="wait">
          {currentArtworks.length === 0 ? (
            <motion.p
              key="noResults"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 text-center mt-10"
            >
              {t('catalogue.noResults')}
            </motion.p>
          ) : (
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
              {currentArtworks.map((artwork: Artwork) => (
                <motion.a
                  key={artwork.id}
                  href={`/oeuvre/${artwork.id}`}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.08,
                    rotateY: 4,
                    boxShadow: '0 0 25px rgba(255,215,0,0.6)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  className="bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700 hover:border-yellow-500 transition-all duration-500"
                >
                  <motion.img
                    src={artwork.imageUrl}
                    alt={artwork.title[lang]}
                    className="w-full h-52 object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-1 text-yellow-400 drop-shadow">
                      {artwork.title[lang]}
                    </h3>
                    <p className="text-gray-400 text-sm italic">{artwork.category}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center items-center gap-4 mt-12"
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-all disabled:opacity-40"
            >
              {t('previous')}
            </button>
            <span className="text-yellow-400 font-bold text-lg">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-xl transition-all disabled:opacity-40"
            >
              {t('next')}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
