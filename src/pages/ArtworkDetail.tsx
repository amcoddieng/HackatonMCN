import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArtworkById } from '../data/data';
import '@google/model-viewer';

export const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const artwork = getArtworkById(id || '');
  const [activeTab, setActiveTab] = useState<'description' | 'history' | 'cultural'>('description');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const lang = i18n.language as 'fr' | 'en' | 'wo';

  // Retourne le texte de l'onglet actif
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

  // Fonction pour lire / arrêter la voix
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

  // Arrêter la lecture si on change d'onglet
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
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image + AR */}
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

        {/* Infos + onglets */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{artwork.title[lang]}</h1>
          <p className="text-gray-400 mb-1">
            {/* mettre icone fonte awesome */}
            <span className="mr-4"><i className="fas fa-calendar-alt"></i> {artwork.period}</span>
            <span className="mr-4"><i className="fas fa-map-marker-alt"></i> {artwork.origin}</span>
            <span><i className="fas fa-tag"></i> {artwork.category}</span>
          </p>
                    {/* une petite text extrait de la description */}
          <div className="text-gray-300 mt-4 flex-grow">
            <p>{artwork.description[lang].slice(0, 700)}...</p>
        </div>
        {/* ajoutons un bouton pour rediriger vers une page contenant la video */}
        <div className="mt-4">
          <a href={artwork.videoUrl} target="_blank" rel="noopener noreferrer">
            <button className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
              {t('viewVideo', 'Voir la vidéo')}
            </button>
          </a>
        </div>
      </div>
    </div>
                {/* Onglets */}
          <div className="mt-6">
            <div className="flex border-b border-gray-700">
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'description' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('description')}
              >
                {t('description', 'Description')}
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('history')}
              >
                {t('history', 'Histoire')}
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === 'cultural' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                onClick={() => setActiveTab('cultural')}
              >
                {t('culturalSignificance', 'Signification Culturelle')}
              </button>
            </div>

            {/* Contenu onglet */}
            <div className="bg-gray-900 p-6 rounded-b-lg shadow-md mt-2 text-gray-300 min-h-[150px]">
              <p>{getActiveText()}</p>
              <button
                onClick={toggleSpeech}
                className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
              >
                {isSpeaking ? t('stopReading', 'Arrêter') : t('readDescription', 'Lire le texte')}
              </button>
            </div>

            {/* Vidéo */}
            {artwork.videoUrl && (
              <div className="mt-4">
                <video controls className="w-full rounded-lg">
                  <source src={artwork.videoUrl} type="video/mp4" />
                  {t('videoNotSupported', 'Votre navigateur ne supporte pas la lecture vidéo')}
                </video>
              </div>
            )}
          </div>
    </div>
  );
};
