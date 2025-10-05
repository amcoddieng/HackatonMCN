// src/pages/VirtualTour.tsx

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Info, MapPin, Home } from 'lucide-react';
import { artworks } from '../data/data';

// Images 360° FONCTIONNELLES depuis Unsplash
const museumRooms = [
  {
    id: 'hall',
    name: { fr: 'Hall d\'Entrée Principal', en: 'Main Entrance Hall', wo: 'Biir bu dugg bu bëri' },
    image360: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=2000&h=1000&fit=crop', // Musée
    hotspots: [
      { 
        pitch: 10, 
        yaw: 0, 
        type: 'info',
        artworkId: 'oeuvre1',
        text: { fr: 'Masque Cérémoniel', en: 'Ceremonial Mask', wo: 'Masque Cérémoniel' }
      },
      { 
        pitch: -5, 
        yaw: 90, 
        type: 'scene',
        targetRoom: 'masks',
        text: { fr: '→ Salle des Masques', en: '→ Mask Room', wo: '→ Biir bu Masque' }
      }
    ]
  },
  {
    id: 'masks',
    name: { fr: 'Salle des Masques Africains', en: 'African Masks Room', wo: 'Biir bu Masque yu Afrique' },
    image360: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=2000&h=1000&fit=crop', // Galerie art
    hotspots: [
      { 
        pitch: 5, 
        yaw: -30, 
        type: 'info',
        artworkId: 'oeuvre1',
        text: { fr: 'Masque Wolof', en: 'Wolof Mask', wo: 'Masque Wolof' }
      },
      { 
        pitch: 0, 
        yaw: 180, 
        type: 'scene',
        targetRoom: 'contemporary',
        text: { fr: '→ Art Contemporain', en: '→ Contemporary Art', wo: '→ Art Contemporain' }
      },
      { 
        pitch: -10, 
        yaw: 90, 
        type: 'scene',
        targetRoom: 'hall',
        text: { fr: '← Retour Hall', en: '← Back to Hall', wo: '← Dellu Hall' }
      }
    ]
  },
  {
    id: 'contemporary',
    name: { fr: 'Galerie d\'Art Contemporain', en: 'Contemporary Art Gallery', wo: 'Galerie Art Contemporain' },
    image360: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=2000&h=1000&fit=crop', // Galerie moderne
    hotspots: [
      { 
        pitch: 8, 
        yaw: 45, 
        type: 'info',
        artworkId: 'oeuvre5',
        text: { fr: 'Peinture Résistance', en: 'Resistance Painting', wo: 'Peinture Résistance' }
      },
      { 
        pitch: -5, 
        yaw: -90, 
        type: 'scene',
        targetRoom: 'mali',
        text: { fr: '→ Empire du Mali', en: '→ Mali Empire', wo: '→ Empire Mali' }
      }
    ]
  },
  {
    id: 'mali',
    name: { fr: 'Salle Empire du Mali', en: 'Mali Empire Room', wo: 'Biir Empire Mali' },
    image360: 'https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=2000&h=1000&fit=crop', // Salle historique
    hotspots: [
      { 
        pitch: 2, 
        yaw: 0, 
        type: 'info',
        artworkId: 'oeuvre6',
        text: { fr: 'Collier Royal', en: 'Royal Necklace', wo: 'Collier Royal' }
      },
      { 
        pitch: -8, 
        yaw: 135, 
        type: 'scene',
        targetRoom: 'hall',
        text: { fr: '← Retour Hall', en: '← Back to Hall', wo: '← Dellu Hall' }
      }
    ]
  }
];

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pannellum: any;
  }
}

export const VirtualTour = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en' | 'wo';
  
  const [currentRoomId, setCurrentRoomId] = useState('hall');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pannellumInstance = useRef<any>(null);

  const currentRoom = museumRooms.find(r => r.id === currentRoomId) || museumRooms[0];
  const currentArtwork = selectedArtwork ? artworks.find(a => a.id === selectedArtwork) : null;

  // Charger Pannellum
  useEffect(() => {
    if (scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';

    script.onload = () => {
      console.log('Pannellum chargé');
      setScriptLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error('Erreur chargement Pannellum');
      setIsLoading(false);
    };

    document.head.appendChild(link);
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
      if (document.head.contains(link)) document.head.removeChild(link);
      if (pannellumInstance.current) {
        try {
          pannellumInstance.current.destroy();
        } catch (e) {
          console.error('Erreur destruction viewer:', e);
        }
      }
    };
  }, []);

  // Initialiser le viewer
  useEffect(() => {
    if (!scriptLoaded || !viewerRef.current || !window.pannellum) return;

    try {
      if (pannellumInstance.current) {
        pannellumInstance.current.destroy();
      }

      // Configuration simplifiée des scènes
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scenes: any = {};
      
      museumRooms.forEach(room => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hotspots: any[] = [];
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        room.hotspots.forEach((spot, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const hotspot: any = {
            pitch: spot.pitch,
            yaw: spot.yaw,
            type: spot.type === 'info' ? 'info' : 'scene',
            text: spot.text[lang],
            cssClass: spot.type === 'info' ? 'hotspot-artwork' : 'hotspot-scene'
          };

          if (spot.type === 'info') {
            hotspot.clickHandlerFunc = () => {
              console.log('Hotspot cliqué:', spot.artworkId);
              setSelectedArtwork(spot.artworkId!);
            };
          } else {
            hotspot.sceneId = spot.targetRoom;
          }

          hotspots.push(hotspot);
        });

        scenes[room.id] = {
          type: 'equirectangular',
          panorama: room.image360,
          hotSpots: hotspots,
          autoLoad: true
        };
      });

      console.log('Initialisation viewer avec scènes:', Object.keys(scenes));

      pannellumInstance.current = window.pannellum.viewer(viewerRef.current, {
        default: {
          firstScene: currentRoomId,
          sceneFadeDuration: 1000,
          autoLoad: true
        },
        scenes: scenes
      });

      pannellumInstance.current.on('scenechange', (sceneId: string) => {
        console.log('Changement de scène:', sceneId);
        setCurrentRoomId(sceneId);
        setSelectedArtwork(null);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pannellumInstance.current.on('error', (err: any) => {
        console.error('Erreur Pannellum:', err);
      });

    } catch (error) {
      console.error('Erreur initialisation viewer:', error);
    }
  }, [scriptLoaded, lang]);

  const goToRoom = (roomId: string) => {
    if (pannellumInstance.current) {
      try {
        pannellumInstance.current.loadScene(roomId);
      } catch (error) {
        console.error('Erreur changement de scène:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 border-b border-[#D4AF37]/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#D4AF37] mb-1">
                Visite Virtuelle 360°
              </h1>
              <p className="text-gray-400">{currentRoom.name[lang]}</p>
            </div>
            <Link to="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              <Home size={24} />
            </Link>
          </div>
        </div>
      </div>

      {/* Viewer 360° */}
      <div className="relative w-full h-[75vh] bg-black">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#D4AF37] border-t-transparent mb-4"></div>
            <div className="text-[#D4AF37] text-xl">Chargement de la visite...</div>
          </div>
        ) : (
          <>
            <div ref={viewerRef} className="w-full h-full" id="panorama-viewer" />

            {/* Instructions */}
            <div className="absolute top-4 left-4 bg-black/90 px-4 py-3 rounded-lg border border-[#D4AF37]/30 max-w-xs">
              <div className="flex items-start space-x-2">
                <Info className="text-[#D4AF37] flex-shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-gray-300">
                  <p className="font-semibold text-[#D4AF37] mb-1">Navigation :</p>
                  <p>Glissez pour regarder autour</p>
                  <p>Cliquez sur les points pour interagir</p>
                </div>
              </div>
            </div>

            {/* Carte des salles */}
            <div className="absolute top-4 right-4 bg-black/90 px-4 py-3 rounded-lg border border-[#D4AF37]/30">
              <p className="text-[#D4AF37] font-semibold mb-2 flex items-center">
                <MapPin size={16} className="mr-2" />
                Plan du musée
              </p>
              <div className="space-y-2">
                {museumRooms.map(room => (
                  <button
                    key={room.id}
                    onClick={() => goToRoom(room.id)}
                    className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      room.id === currentRoomId
                        ? 'bg-[#D4AF37] text-black font-semibold'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {room.name[lang]}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modal œuvre */}
      {selectedArtwork && currentArtwork && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-[#D4AF37]">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-[#D4AF37]">{currentArtwork.title[lang]}</h2>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>
              <img
                src={currentArtwork.imageUrl}
                alt={currentArtwork.title[lang]}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-300 mb-4">{currentArtwork.description[lang]}</p>
              <div className="flex gap-3">
                <Link
                  to={`/oeuvre/${currentArtwork.id}`}
                  className="flex-1 px-4 py-2 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors text-center"
                >
                  Voir en détail
                </Link>
                <Link
                  to={`/ar/${currentArtwork.id}`}
                  className="flex-1 px-4 py-2 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all text-center"
                >
                  Voir en AR
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .hotspot-artwork {
          background-color: rgba(212, 175, 55, 0.8);
          border-radius: 50%;
          width: 30px;
          height: 30px;
        }
        .hotspot-scene {
          background-color: rgba(212, 175, 55, 0.6);
          border-radius: 4px;
        }
        .pnlm-hotspot-base {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};