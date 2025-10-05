import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArtworkById } from '../data/data';
import '@google/model-viewer';
import { Volume2Icon, VolumeX } from "lucide-react";

export const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
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
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">{t('artworkNotFound', 'Œuvre non trouvée')}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image + AR */}
        <div className="relative">
          <img
            src={artwork.imageUrl}
            alt={artwork.title[lang]}
            className="w-full rounded-lg object-cover max-h-[500px]"
          />
          {artwork.arModel && (
            <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded text-sm md:text-base">
              {t('viewInAR', 'Voir en Réalité Augmentée')}
            </button>
          )}
        </div>

        {/* Infos + onglets */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{artwork.title[lang]}</h1>
          <p className="text-gray-400 mb-4 flex flex-wrap gap-2 md:gap-4">
            <span className="flex items-center gap-1"><i className="fas fa-calendar-alt"></i> {artwork.period}</span>
            <span className="flex items-center gap-1"><i className="fas fa-map-marker-alt"></i> {artwork.origin}</span>
            <span className="flex items-center gap-1"><i className="fas fa-tag"></i> {artwork.category}</span>
          </p>

          {/* Onglets */}
          <div className="mt-4 flex flex-col">
            <div className="flex border-b border-gray-700">
              {['description', 'history', 'cultural'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 font-medium ${activeTab === tab ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                  onClick={() => setActiveTab(tab as any)}
                >
                  {t(tab, tab.charAt(0).toUpperCase() + tab.slice(1))}
                </button>
              ))}
            </div>

            <div className="bg-gray-900 p-6 rounded-b-lg shadow-md mt-2 text-gray-300 min-h-[150px] flex flex-col">
              <p className="flex-grow">{getActiveText()}</p>

              {/* Boutons responsive */}
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                <button
                  onClick={toggleSpeech}
                  className="flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded transition"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX size={20} />
                      {t('stopReading', 'Arrêter')}
                    </>
                  ) : (
                    <>
                      <Volume2Icon size={20} />
                      {t('readDescription', 'Lire le texte')}
                    </>
                  )}
                </button>

                {artwork.videoUrl && (
                  <a href={artwork.videoUrl} target="_blank" rel="noopener noreferrer">
                    <button className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded w-full sm:w-auto">
                      {t('viewVideo', 'Voir la vidéo')}
                    </button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
