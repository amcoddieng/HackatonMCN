// src/pages/VirtualTour.tsx

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, RotateCw, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

// Images 360° mockées
const rooms = [
  {
    id: 1,
    name: { fr: 'Hall d\'Entrée', en: 'Entrance Hall', wo: 'Biir bu dugg' },
    image: 'https://pannellum.org/images/alma.jpg',
    description: { 
      fr: 'Découvrez le majestueux hall d\'entrée du Musée des Civilisations Noires',
      en: 'Discover the majestic entrance hall of the Museum of Black Civilizations',
      wo: 'Gis biir bu dugg bu Musée des Civilisations Noires'
    }
  },
  {
    id: 2,
    name: { fr: 'Salle des Masques', en: 'Mask Room', wo: 'Biir bu Masque' },
    image: 'https://pannellum.org/images/cerro-toco-0.jpg',
    description: { 
      fr: 'Explorez notre collection exceptionnelle de masques traditionnels africains',
      en: 'Explore our exceptional collection of traditional African masks',
      wo: 'Xool collection bu masque yu aada yu Afrique'
    }
  },
  {
    id: 3,
    name: { fr: 'Galerie d\'Art Contemporain', en: 'Contemporary Art Gallery', wo: 'Galerie bu Art Contemporain' },
    image: 'https://pannellum.org/images/jfk.jpg',
    description: { 
      fr: 'Admirez les œuvres d\'artistes africains contemporains',
      en: 'Admire the works of contemporary African artists',
      wo: 'Xool liggéey yu artiste contemporain yu Afrique'
    }
  },
  {
    id: 4,
    name: { fr: 'Salle de l\'Empire du Mali', en: 'Mali Empire Room', wo: 'Biir bu Empire Mali' },
    image: 'https://pannellum.org/images/bma-0.jpg',
    description: { 
      fr: 'Plongez dans l\'histoire glorieuse de l\'Empire du Mali',
      en: 'Dive into the glorious history of the Mali Empire',
      wo: 'Dugg ci historia bu mag bu Empire Mali'
    }
  }
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pannellum: any;
  }
}

export const VirtualTour = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en' | 'wo';
  
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const viewerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pannellumInstance = useRef<any>(null);

  const currentRoom = rooms[currentRoomIndex];

  useEffect(() => {
    // Charger le script Pannellum
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
      document.body.removeChild(script);
      document.head.removeChild(link);
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
        panorama: currentRoom.image,
        autoLoad: true,
        showControls: false,
        mouseZoom: true,
        draggable: true,
        hfov: 100,
        pitch: 0,
        yaw: 0,
      });
    }
  }, [currentRoomIndex, isLoading, currentRoom.image]);

  const nextRoom = () => {
    setCurrentRoomIndex((prev) => (prev + 1) % rooms.length);
  };

  const previousRoom = () => {
    setCurrentRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
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
          <p className="text-gray-400 text-lg">{currentRoom.name[lang]}</p>
          <p className="text-gray-500 text-sm mt-2">{currentRoom.description[lang]}</p>
        </div>
      </div>

      {/* Viewer 360° */}
      <div className="relative w-full h-[70vh] bg-black">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-[#D4AF37] text-xl">Chargement...</div>
          </div>
        ) : (
          <div ref={viewerRef} className="w-full h-full" />
        )}

        {/* Contrôles */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/80 px-6 py-3 rounded-full border border-[#D4AF37]/30">
          <button onClick={zoomOut} className="text-gray-300 hover:text-[#D4AF37] transition-colors">
            <ZoomOut size={24} />
          </button>
          <button onClick={resetView} className="text-gray-300 hover:text-[#D4AF37] transition-colors">
            <RotateCw size={24} />
          </button>
          <button onClick={zoomIn} className="text-gray-300 hover:text-[#D4AF37] transition-colors">
            <ZoomIn size={24} />
          </button>
          <div className="w-px h-6 bg-gray-700"></div>
          <button onClick={toggleFullscreen} className="text-gray-300 hover:text-[#D4AF37] transition-colors">
            <Maximize size={24} />
          </button>
        </div>

        {/* Instructions */}
        <div className="absolute top-6 left-6 bg-black/80 px-4 py-2 rounded-lg border border-[#D4AF37]/30">
          <p className="text-gray-300 text-sm">
            {lang === 'fr' ? '🖱️ Cliquez et glissez pour regarder autour' :
             lang === 'en' ? '🖱️ Click and drag to look around' :
             '🖱️ Click te deplace ngir xool'}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-8 border-t border-[#D4AF37]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={previousRoom}
              className="flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">Précédent</span>
            </button>

            <div className="text-center">
              <p className="text-[#D4AF37] font-bold text-lg mb-1">
                {currentRoomIndex + 1} / {rooms.length}
              </p>
              <div className="flex space-x-2">
                {rooms.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentRoomIndex ? 'bg-[#D4AF37]' : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={nextRoom}
              className="flex items-center space-x-2 px-6 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
            >
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Miniatures */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {rooms.map((room, index) => (
              <button
                key={room.id}
                onClick={() => setCurrentRoomIndex(index)}
                className={`relative overflow-hidden rounded-lg border-2 ${
                  index === currentRoomIndex ? 'border-[#D4AF37]' : 'border-gray-700 hover:border-[#D4AF37]'
                } transition-all group`}
              >
                <img
                  src={room.image}
                  alt={room.name[lang]}
                  className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                  <p className="text-white text-xs font-semibold">{room.name[lang]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};