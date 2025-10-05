import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArtworkById } from '../data/data';
import { useTheme } from '../contexts/ThemeContext';
import '@google/model-viewer';

export const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const { darkMode } = useTheme();
  const artwork = getArtworkById(id || '');
  const [activeTab, setActiveTab] = useState<'description' | 'history' | 'cultural'>('description');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lang = i18n.language as 'fr' | 'en' | 'wo';

  const getActiveText = () => {
    if (!artwork) return '';
    switch (activeTab) {
      case 'description':
        return artwork.description[lang];
      case 'history':
        return artwork.history[lang];
      case 'cultural':
        return artwork.culturalSignificance[lang];
      default:
        return '';
    }
  };

  const toggleSpeech = () => {
    const text = getActiveText();
    if (!text) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'wo-SN';
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [activeTab]);

  if (!artwork) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'} flex items-center justify-center`}>
        <p className="text-xl">{t('artworkNotFound', 'Œuvre non trouvée')}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-50 text-black'} py-12`}>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={artwork.imageUrl}
            alt={artwork.title[lang]}
            className="w-full rounded-lg object-cover max-h-[500px]"
          />
          {artwork.arModel && (
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
              {t('viewInAR', 'Voir en Réalité Augmentée')}
            </button>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-2`}>{artwork.title[lang]}</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
            <span className="mr-4"><i className="fas fa-calendar-alt"></i> {artwork.period}</span>
            <span className="mr-4"><i className="fas fa-map-marker-alt"></i> {artwork.origin}</span>
            <span><i className="fas fa-tag"></i> {artwork.category}</span>
          </p>
          <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mt-4 flex-grow`}>
            <p>{artwork.description[lang].slice(0, 700)}...</p>
          </div>
          <div className="mt-4">
            <a href={artwork.videoUrl} target="_blank" rel="noopener noreferrer">
              <button className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                {t('viewVideo', 'Voir la vidéo')}
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className={`flex border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'description' ? `border-b-2 border-yellow-400 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}` : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            onClick={() => setActiveTab('description')}
          >
            {t('description', 'Description')}
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'history' ? `border-b-2 border-yellow-400 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}` : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            onClick={() => setActiveTab('history')}
          >
            {t('history', 'Histoire')}
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'cultural' ? `border-b-2 border-yellow-400 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}` : darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            onClick={() => setActiveTab('cultural')}
          >
            {t('culturalSignificance', 'Signification Culturelle')}
          </button>
        </div>

        <div className={`${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-700 border border-gray-200'} p-6 rounded-b-lg shadow-md mt-2 min-h-[150px]`}>
          <p>{getActiveText()}</p>
          <button
            onClick={toggleSpeech}
            className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
          >
            {isSpeaking ? t('stopReading', 'Arrêter') : t('readDescription', 'Lire le texte')}
          </button>
        </div>
      </div>
    </div>
  );
};