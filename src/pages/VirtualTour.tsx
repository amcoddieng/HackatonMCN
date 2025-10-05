// src/pages/VirtualTour.tsx

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, RotateCw, ZoomIn, ZoomOut, Maximize, Home, Eye } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { artworks } from '../data/data';

declare global {
  interface Window {
    pannellum: any;
  }
}

export const VirtualTour = () => {
  const { id } = useParams<{ id?: string }>();
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en' | 'wo';
  
  // Trouver l'index de l'œuvre si un ID est fourni
  const initialIndex = id 
    ? artworks.findIndex(artwork => artwork.id === id)
    : 0;
  
  const [currentArtworkIndex, setCurrentArtworkIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  );
  const [isLoading, setIsLoading] = useState(true);
  const viewerRef = useRef<HTMLDivElement>(null);
  const pannellumInstance = useRef<any>(null);

  const currentArtwork = artworks[currentArtworkIndex];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;
    document.body.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
    document.head.appendChild(link);

    script.onload = () => {
      setIsLoading(false);
    };

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.head.contains(link)) document.head.removeChild(link);
      if (pannellumInstance.current) {
        pannellumInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoading && viewerRef.current && window.pannellum) {
      if (pannellumInstance.current) {
        pannellumInstance.current.destroy();
      }

      pannellumInstance.current = window.pannellum.viewer(viewerRef.current, {
        type: 'equirectangular',
        panorama: currentArtwork.imageUrl,
        autoLoad: true,
        showControls: false,
        mouseZoom: true,
        draggable: true,
        hfov: 100,
        pitch: 0,
        yaw: 0,
      });
    }
  }, [currentArtworkIndex, isLoading, currentArtwork.imageUrl]);

  const nextArtwork = () => {
    setCurrentArtworkIndex((prev) => (prev + 1) % artworks.length);
  };

  const previousArtwork = () => {
    setCurrentArtworkIndex((prev) => (prev - 1 + artworks.length) % artworks.length);
  };

  const resetView = () => {
    if (pannellumInstance.current) {
      pannellumInstance.current.setPitch(0);
      pannellumInstance.current.setYaw(0);
      pannellumInstance.current.setHfov(100);
    }
  };

  const zoomIn = () => {
    if (pannellumInstance.current) {
      const currentHfov = pannellumInstance.current.getHfov();
      pannellumInstance.current.setHfov(Math.max(currentHfov - 10, 50));
    }
  };

  const zoomOut = () => {
    if (pannellumInstance.current) {
      const currentHfov = pannellumInstance.current.getHfov();
      pannellumInstance.current.setHfov(Math.min(currentHfov + 10, 120));
    }
  };

  const toggleFullscreen = () => {
    if (pannellumInstance.current) {
      pannellumInstance.current.toggleFullscreen();
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 border-b border-[#D4AF37]/30 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
   
          <h1 className="text-3xl md:text-5xl font-bold text-[#D4AF37] mb-2">
            {lang === 'fr' ? 'Visite Virtuelle 360°' :
             lang === 'en' ? 'Virtual Tour 360°' :
             'Visite Virtuelle 360°'}
          </h1>
          <p className="text-gray-400 text-lg">{currentArtwork.title[lang]}</p>
          <p className="text-gray-500 text-sm mt-2">
            {currentArtwork.description[lang].substring(0, 120)}...
          </p>
        </div>
      </div>

      {/* Viewer 360° */}
      <div className="relative w-full h-[70vh] bg-black">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-[#D4AF37] text-xl">
              {lang === 'fr' ? 'Chargement...' :
               lang === 'en' ? 'Loading...' :
               'Dafa daw...'}
            </div>
          </div>
        ) : (
          <div ref={viewerRef} className="w-full h-full" />
        )}

        {/* Contrôles */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/80 px-6 py-3 rounded-full border border-[#D4AF37]/30 backdrop-blur-sm">
          <button onClick={zoomOut} className="text-gray-300 hover:text-[#D4AF37] transition-colors" title="Zoom arrière">
            <ZoomOut size={24} />
          </button>
          <button onClick={resetView} className="text-gray-300 hover:text-[#D4AF37] transition-colors" title="Réinitialiser">
            <RotateCw size={24} />
          </button>
          <button onClick={zoomIn} className="text-gray-300 hover:text-[#D4AF37] transition-colors" title="Zoom avant">
            <ZoomIn size={24} />
          </button>
          <div className="w-px h-6 bg-gray-700"></div>
          <button onClick={toggleFullscreen} className="text-gray-300 hover:text-[#D4AF37] transition-colors" title="Plein écran">
            <Maximize size={24} />
          </button>
        </div>

        {/* Instructions */}
        <div className="absolute top-6 left-6 bg-black/80 px-4 py-2 rounded-lg border border-[#D4AF37]/30 backdrop-blur-sm">
          <p className="text-gray-300 text-sm">
            {lang === 'fr' ? 'Cliquez et glissez pour regarder autour' :
             lang === 'en' ? 'Click and drag to look around' :
             'Click te deplace ngir xool'}
          </p>
        </div>

        {/* Bouton Voir en AR - Bien visible au-dessus des contrôles */}
        {currentArtwork.arModel && (
          <Link 
            to={`/ar/${currentArtwork.id}`}
            className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-10"
          >
            <button className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-2xl hover:shadow-yellow-600/50 flex items-center space-x-3 animate-pulse hover:animate-none">
              <Eye size={24} />
              <span className="text-lg">
                {lang === 'fr' ? 'Voir en Réalité Augmentée' :
                 lang === 'en' ? 'View in Augmented Reality' :
                 'Xool ci Réalité Augmentée'}
              </span>
            </button>
          </Link>
        )}
      </div>

      {/* Navigation */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 border-t border-[#D4AF37]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={previousArtwork}
              className="flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">
                {lang === 'fr' ? 'Précédent' :
                 lang === 'en' ? 'Previous' :
                 'Bi jiitu'}
              </span>
            </button>

            <div className="text-center">
              <p className="text-[#D4AF37] font-bold text-lg mb-1">
                {currentArtworkIndex + 1} / {artworks.length}
              </p>
              <div className="flex space-x-2">
                {artworks.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentArtworkIndex ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextArtwork}
              className="flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
            >
              <span className="hidden sm:inline">
                {lang === 'fr' ? 'Suivant' :
                 lang === 'en' ? 'Next' :
                 'Bi ñëwaat'}
              </span>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Miniatures des œuvres */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                onClick={() => setCurrentArtworkIndex(index)}
                className={`relative overflow-hidden rounded-lg border-2 ${
                  index === currentArtworkIndex ? 'border-[#D4AF37]' : 'border-gray-700 hover:border-[#D4AF37]'
                } transition-all group`}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title[lang]}
                  className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                  <p className="text-white text-xs font-semibold line-clamp-2">
                    {artwork.title[lang]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};