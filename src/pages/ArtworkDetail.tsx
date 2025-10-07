import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getArtworkById } from '../data/data';
import { Volume2Icon, VolumeX, ZoomIn, ZoomOut } from "lucide-react";

export const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const artwork = getArtworkById(id || '');
  const [activeTab, setActiveTab] = useState<'description' | 'history' | 'cultural'>('description');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const lang = i18n.language as 'fr' | 'en' | 'wo';
  const imgRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

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

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startPos.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setOffset({ x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y });
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX - offset.x, y: touch.clientY - offset.y };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    setOffset({ x: touch.clientX - startPos.current.x, y: touch.clientY - startPos.current.y });
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div className="min-h-screen bg-black text-white py-8 px-4 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Image interactive */}
        <div
          ref={imgRef}
          className="relative overflow-hidden rounded-lg cursor-grab"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)`,
            }}
          >
            <img
              src={artwork.imageUrl}
              alt={artwork.title[lang]}
              className="w-full rounded-lg object-cover max-h-[500px]"
            />
          </div>

          {/* Zoom buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button onClick={() => setZoom(prev => Math.min(prev + 0.2, 3))} className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-3 rounded-full">
              <ZoomIn size={20}/>
            </button>
            <button onClick={() => setZoom(prev => Math.max(prev - 0.2, 1))} className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-3 rounded-full">
              <ZoomOut size={20}/>
            </button>
          </div>
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
