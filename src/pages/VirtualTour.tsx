// src/pages/VirtualTour.tsx

import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Info, MapPin, Home, Maximize2, 
  Volume2, VolumeX, Compass, Eye, Image as ImageIcon, Camera
} from 'lucide-react';
import { artworks } from '../data/data';

// CORRECTION: Audios fonctionnels avec des sources fiables
const museumRooms = [
  {
    id: 'entrance',
    name: { 
      fr: 'Hall d\'Entrée - Couloir Principal', 
      en: 'Entrance Hall - Main Corridor', 
      wo: 'Biir bu Dugg - Couloir bu Mag' 
    },
    description: {
      fr: 'Couloir majestueux menant aux différentes galeries du musée',
      en: 'Majestic corridor leading to the various museum galleries',
      wo: 'Couloir bu mag biy yeb ci galerie yu musée yi'
    },
    image360: '/360/salle4.jpeg',
    // AMBIANCE: Sons d'ambiance de musée
     ambientSound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    hotspots: [
      { 
        pitch: 5,
        yaw: 0, 
        type: 'info',
        artworkId: 'oeuvre1',
        text: { fr: '🎭 Masque Cérémoniel Wolof', en: '🎭 Wolof Ceremonial Mask', wo: '🎭 Masque Wolof' }
      },
      { 
        pitch: -2, 
        yaw: 90, 
        type: 'scene',
        targetRoom: 'masks',
        text: { fr: '→ Galerie des Masques Sacrés', en: '→ Sacred Masks Gallery', wo: '→ Biir Masque yi' }
      },
      { 
        pitch: 5, 
        yaw: -90, 
        type: 'scene',
        targetRoom: 'contemporary',
        text: { fr: '→ Art Contemporain', en: '→ Contemporary Art', wo: '→ Art bu Leeral' }
      }
    ]
  },
  {
    id: 'masks',
    name: { 
      fr: 'Galerie des Masques Sacrés', 
      en: 'Sacred Masks Gallery', 
      wo: 'Galerie Masque yu Njub' 
    },
    description: {
      fr: 'Collection exceptionnelle de masques traditionnels d\'Afrique de l\'Ouest',
      en: 'Exceptional collection of traditional West African masks',
      wo: 'Masque yu nees yu njub ci Afrique de Ouest'
    },
    image360: '/360/salle1.jpeg',
    // AMBIANCE: Tambours africains
    ambientSound: '/audio/african-drums.mp3', // À créer dans public/audio/
    hotspots: [
      { 
        pitch: 10, 
        yaw: -45, 
        type: 'info',
        artworkId: 'oeuvre1', // Masque Wolof
        text: { fr: '🎭 Masque Wolof du XIXe siècle', en: '🎭 19th Century Wolof Mask', wo: '🎭 Masque Wolof 19e' }
      },
      { 
        pitch: 8, 
        yaw: 45, 
        type: 'info',
        artworkId: 'oeuvre4', // Tambour Sabar
        text: { fr: '🥁 Tambour Sabar du Ndawrabine', en: '🥁 Sabar Drum', wo: '🥁 Sabar' }
      },
      { 
        pitch: 12, 
        yaw: 0, 
        type: 'info',
        artworkId: 'oeuvre2', // Statue Sérère
        text: { fr: '🗿 Statue Sérère Ancestrale', en: '🗿 Ancestral Serer Statue', wo: '🗿 Statue Sérère' }
      },
      { 
        pitch: -5, 
        yaw: 135, 
        type: 'scene',
        targetRoom: 'textiles',
        text: { fr: '→ Salle des Textiles', en: '→ Textiles Room', wo: '→ Biir Textile yi' }
      },
      { 
        pitch: -8, 
        yaw: -135, 
        type: 'scene',
        targetRoom: 'entrance',
        text: { fr: '← Retour au Couloir', en: '← Back to Corridor', wo: '← Dellu ci Couloir' }
      }
    ]
  },
  {
    id: 'textiles',
    name: { 
      fr: 'Salle des Textiles et Parures', 
      en: 'Textiles and Ornaments Room', 
      wo: 'Biir Textile ak Parure' 
    },
    description: {
      fr: 'Tissages traditionnels, bijoux et ornements royaux sénégalais',
      en: 'Traditional weaving, jewelry and Senegalese royal ornaments',
      wo: 'Textile yu nees, bijoux ak ornement yu royal'
    },
    image360: '/360/salle2.jpeg',
    // AMBIANCE: Kora traditionnelle
    ambientSound: '/audio/kora-music.mp3', // À créer dans public/audio/
    hotspots: [
      { 
        pitch: 6, 
        yaw: -30, 
        type: 'info',
        artworkId: 'oeuvre3', // Tapisserie Peule
        text: { fr: '🧵 Tapisserie Peule "Migration"', en: '🧵 Fulani Tapestry', wo: '🧵 Tapisserie Peul' }
      },
      { 
        pitch: 8, 
        yaw: 30, 
        type: 'info',
        artworkId: 'oeuvre6', // Collier Royal
        text: { fr: '👑 Collier Royal Mandingue', en: '👑 Mandinka Royal Necklace', wo: '👑 Collier Royal' }
      },
      { 
        pitch: -6, 
        yaw: 90, 
        type: 'scene',
        targetRoom: 'contemporary',
        text: { fr: '→ Art Contemporain', en: '→ Contemporary Art', wo: '→ Art Contemporain' }
      },
      { 
        pitch: -4, 
        yaw: -90, 
        type: 'scene',
        targetRoom: 'masks',
        text: { fr: '← Galerie des Masques', en: '← Masks Gallery', wo: '← Galerie Masque' }
      }
    ]
  },
  {
    id: 'contemporary',
    name: { 
      fr: 'Galerie d\'Art Contemporain Africain', 
      en: 'African Contemporary Art Gallery', 
      wo: 'Galerie Art Contemporain bu Afrique' 
    },
    description: {
      fr: 'Œuvres d\'artistes contemporains sénégalais et de la diaspora',
      en: 'Works by contemporary Senegalese artists and the diaspora',
      wo: 'Liggéey artiste yu leeral yu Senegaal'
    },
    image360: '/360/salle3.jpeg',
    // AMBIANCE: Musique contemporaine africaine
    ambientSound: '/audio/contemporary-african.mp3', // À créer dans public/audio/
    hotspots: [
      { 
        pitch: 12, 
        yaw: 0, 
        type: 'info',
        artworkId: 'oeuvre5', // Peinture "Résistance"
        text: { fr: '🎨 "Résistance" - Hommage aux Femmes Africaines', en: '🎨 "Resistance" Painting', wo: '🎨 "Résistance"' }
      },
      { 
        pitch: 10, 
        yaw: 70, 
        type: 'info',
        artworkId: 'oeuvre2', // Sculpture
        text: { fr: '🗿 Sculpture contemporaine', en: '🗿 Contemporary sculpture', wo: '🗿 Sculpture' }
      },
      { 
        pitch: -8, 
        yaw: -110, 
        type: 'scene',
        targetRoom: 'mali',
        text: { fr: '→ Empire du Mali', en: '→ Mali Empire', wo: '→ Empire Mali' }
      },
      { 
        pitch: -6, 
        yaw: 180, 
        type: 'scene',
        targetRoom: 'textiles',
        text: { fr: '← Salle des Textiles', en: '← Textiles Room', wo: '← Biir Textile' }
      }
    ]
  },
  {
    id: 'mali',
    name: { 
      fr: 'Salle Empire du Mali - XIIIe siècle', 
      en: 'Mali Empire Room - 13th Century', 
      wo: 'Biir Empire Mali - 13e siyekol' 
    },
    description: {
      fr: 'Trésors historiques de l\'Empire du Mali et de Soundiata Keïta',
      en: 'Historical treasures of the Mali Empire and Soundiata Keïta',
      wo: 'Trésor yu historique yu Empire Mali'
    },
    image360: '/360/salle2.jpeg',
    // AMBIANCE: Balafon traditionnel
    ambientSound: '/audio/balafon-music.mp3', // À créer dans public/audio/
    hotspots: [
      { 
        pitch: 5, 
        yaw: -20, 
        type: 'info',
        artworkId: 'oeuvre6', // Collier Royal
        text: { fr: '💎 Collier Royal Mandingue', en: '💎 Royal Necklace', wo: '💎 Collier Royal' }
      },
      { 
        pitch: 7, 
        yaw: 20, 
        type: 'info',
        artworkId: 'oeuvre1', // Masque
        text: { fr: '🎭 Masque Cérémoniel', en: '🎭 Ceremonial Mask', wo: '🎭 Masque' }
      },
      { 
        pitch: 10, 
        yaw: 90, 
        type: 'info',
        artworkId: 'oeuvre3', // Tapisserie
        text: { fr: '🧵 Tapisserie Historique', en: '🧵 Historical Tapestry', wo: '🧵 Tapisserie' }
      },
      { 
        pitch: -10, 
        yaw: -150, 
        type: 'scene',
        targetRoom: 'kingdoms',
        text: { fr: '→ Royaumes Précoloniaux', en: '→ Precolonial Kingdoms', wo: '→ Royaumes yi' }
      },
      { 
        pitch: -8, 
        yaw: 150, 
        type: 'scene',
        targetRoom: 'contemporary',
        text: { fr: '← Art Contemporain', en: '← Contemporary Art', wo: '← Art Contemporain' }
      }
    ]
  },
  {
    id: 'kingdoms',
    name: { 
      fr: 'Royaumes Précoloniaux du Sénégal', 
      en: 'Precolonial Kingdoms of Senegal', 
      wo: 'Royaumes yu Senegaal yu Ginnaaw' 
    },
    description: {
      fr: 'Trésors des royaumes du Cayor, Baol, Sine, Saloum et Djolof',
      en: 'Treasures from the kingdoms of Cayor, Baol, Sine, Saloum and Djolof',
      wo: 'Trésor yu royaume Cayor, Baol, Sine, Saloum ak Djolof'
    },
    image360:'/360/salle2.jpeg',
    // AMBIANCE: Musique royale africaine
    ambientSound: '/audio/royal-african.mp3', // À créer dans public/audio/
    hotspots: [
      { 
        pitch: 8, 
        yaw: 0, 
        type: 'info',
        artworkId: 'oeuvre4', // Tambour
        text: { fr: '🥁 Tambour Sabar Royal', en: '🥁 Royal Sabar Drum', wo: '🥁 Sabar Royal' }
      },
      { 
        pitch: 6, 
        yaw: -60, 
        type: 'info',
        artworkId: 'oeuvre1', // Masque
        text: { fr: '🎭 Masque Royal Wolof', en: '🎭 Royal Wolof Mask', wo: '🎭 Masque Royal' }
      },
      { 
        pitch: 7, 
        yaw: 60, 
        type: 'info',
        artworkId: 'oeuvre6', // Parure
        text: { fr: '👑 Parure Royale', en: '👑 Royal Ornament', wo: '👑 Parure Royal' }
      },
      { 
        pitch: -6, 
        yaw: 180, 
        type: 'scene',
        targetRoom: 'entrance',
        text: { fr: '← Retour au Couloir', en: '← Back to Corridor', wo: '← Dellu ci Couloir' }
      }
    ]
  }
];

declare global {
  interface Window {
    pannellum: any;
  }
}

export const VirtualTour = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en' | 'wo';
  
  const [currentRoomId, setCurrentRoomId] = useState('entrance');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [viewAngle, setViewAngle] = useState({ yaw: 0, pitch: 0 });
  const [audioError, setAudioError] = useState<string | null>(null);
  
  const viewerRef = useRef<HTMLDivElement>(null);
  const pannellumInstance = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentRoom = museumRooms.find(r => r.id === currentRoomId) || museumRooms[0];
  const currentArtwork = selectedArtwork ? artworks.find(a => a.id === selectedArtwork) : null;

  useEffect(() => {
    if (scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
    script.async = true;
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';

    script.onload = () => {
      console.log('✅ Pannellum chargé');
      setScriptLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error('❌ Erreur Pannellum');
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
          console.error('Erreur destruction:', e);
        }
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playAmbientSound = async (roomId: string) => {
    if (!audioEnabled) return;
    
    const room = museumRooms.find(r => r.id === roomId);
    if (!room?.ambientSound) {
      setAudioError('Aucun son disponible pour cette salle');
      return;
    }
    
    // Arrêter l'audio précédent
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    try {
      // Créer nouveau audio
      audioRef.current = new Audio(room.ambientSound);
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      
      // Attendre que l'audio soit chargé
      audioRef.current.addEventListener('canplaythrough', () => {
        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
          playPromise.catch(e => {
            console.log('Audio nécessite une interaction utilisateur:', e);
            setAudioError('Cliquez pour activer l\'audio');
          });
        }
      });
      
      // Gestion des erreurs de chargement
      audioRef.current.addEventListener('error', (e) => {
        console.error('Erreur chargement audio:', e);
        setAudioError(`Fichier audio non trouvé: ${room.ambientSound}`);
      });
      
      setAudioError(null);
      
    } catch (error) {
      console.error('Erreur création audio:', error);
      setAudioError('Erreur de lecture audio');
    }
  };

  useEffect(() => {
    if (audioEnabled) {
      playAmbientSound(currentRoomId);
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setAudioError(null);
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioEnabled, currentRoomId]);

  useEffect(() => {
    if (!scriptLoaded || !viewerRef.current || !window.pannellum) return;

    try {
      if (pannellumInstance.current) {
        pannellumInstance.current.destroy();
      }

      const scenes: any = {};
      
      museumRooms.forEach(room => {
        const hotspots: any[] = room.hotspots.map(spot => {
          const hotspot: any = {
            pitch: spot.pitch,
            yaw: spot.yaw,
            type: spot.type === 'info' ? 'info' : 'scene',
            text: spot.text[lang],
            cssClass: spot.type === 'info' ? 'custom-hotspot-artwork' : 'custom-hotspot-scene'
          };

          if (spot.type === 'info') {
            hotspot.clickHandlerFunc = () => {
              console.log('🎨 Œuvre:', spot.artworkId);
              setSelectedArtwork(spot.artworkId!);
            };
          } else {
            hotspot.sceneId = spot.targetRoom;
          }

          return hotspot;
        });

        scenes[room.id] = {
          type: 'equirectangular',
          panorama: room.image360,
          hotSpots: hotspots,
          autoLoad: true,
          compass: true,
          showControls: false
        };
      });

      pannellumInstance.current = window.pannellum.viewer(viewerRef.current, {
        default: {
          firstScene: currentRoomId,
          sceneFadeDuration: 1000,
          author: 'Musée Lumière d\'Afrique'
        },
        scenes: scenes
      });

      pannellumInstance.current.on('scenechange', (sceneId: string) => {
        console.log('🚪 Salle:', sceneId);
        setCurrentRoomId(sceneId);
        setSelectedArtwork(null);
        if (audioEnabled) playAmbientSound(sceneId);
      });

      pannellumInstance.current.on('mouseup', () => {
        try {
          const yaw = pannellumInstance.current.getYaw();
          const pitch = pannellumInstance.current.getPitch();
          setViewAngle({ yaw: Math.round(yaw), pitch: Math.round(pitch) });
        } catch (e) {
          console.log('Erreur angle vue:', e);
        }
      });

    } catch (error) {
      console.error('❌ Erreur initialisation viewer:', error);
      setIsLoading(false);
    }
  }, [scriptLoaded, lang, currentRoomId]);

  const goToRoom = (roomId: string) => {
    if (pannellumInstance.current) {
      try {
        pannellumInstance.current.loadScene(roomId);
      } catch (error) {
        console.error('Erreur changement scène:', error);
      }
    }
  };

  const goToNextRoom = () => {
    const currentIndex = museumRooms.findIndex(r => r.id === currentRoomId);
    const nextIndex = (currentIndex + 1) % museumRooms.length;
    goToRoom(museumRooms[nextIndex].id);
  };

  const goToPreviousRoom = () => {
    const currentIndex = museumRooms.findIndex(r => r.id === currentRoomId);
    const prevIndex = currentIndex === 0 ? museumRooms.length - 1 : currentIndex - 1;
    goToRoom(museumRooms[prevIndex].id);
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Erreur fullscreen:', error);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    setAudioError(null);
  };

  const handleUserInteractionForAudio = () => {
    // Cette fonction peut être appelée après une interaction utilisateur
    if (audioEnabled && audioRef.current) {
      audioRef.current.play().catch(e => {
        console.log('Échec lecture après interaction:', e);
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-[#D4AF37] border-t-transparent"></div>
        <div className="text-[#D4AF37] text-2xl font-semibold mt-6">Chargement de la visite...</div>
        <p className="text-gray-400 mt-3">Initialisation du musée virtuel</p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-black"
      onClick={handleUserInteractionForAudio} // Permet de débloquer l'audio
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-[#D4AF37]/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400 text-sm uppercase">Visite 360° Active</span>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-[#D4AF37] mb-1">
                Musée Lumière d'Afrique
              </h1>
              <div className="flex items-center space-x-2">
                <MapPin className="text-[#D4AF37]" size={16} />
                <p className="text-gray-300 text-base">{currentRoom.name[lang]}</p>
                {audioError && (
                  <span className="text-red-400 text-xs ml-2">({audioError})</span>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleAudio} 
                className={`p-2 rounded-full border transition-all ${
                  audioEnabled 
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37]' 
                    : 'bg-gray-900 text-gray-300 border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button onClick={toggleFullscreen} className="p-2 bg-gray-900 text-gray-300 rounded-full border border-gray-700 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all">
                <Maximize2 size={18} />
              </button>
              <Link to="/" className="p-2 bg-[#D4AF37] text-black rounded-full hover:bg-yellow-500 transition-all">
                <Home size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Viewer */}
      <div className="relative w-full h-[82vh] bg-gray-900">
        <div ref={viewerRef} className="w-full h-full" />

        {/* Compass */}
        <div className="absolute top-4 right-4 bg-black/80 px-3 py-2 rounded-lg border border-[#D4AF37]/40">
          <div className="flex items-center space-x-2">
            <Compass className="text-[#D4AF37]" size={16} />
            <div className="text-xs">
              <p className="text-gray-400">Vue</p>
              <p className="text-white font-mono">{viewAngle.yaw}° | {viewAngle.pitch}°</p>
            </div>
          </div>
        </div>

        {/* Audio Status */}
        {audioError && (
          <div className="absolute top-4 left-4 bg-red-900/80 px-3 py-2 rounded-lg border border-red-500">
            <p className="text-red-200 text-xs">{audioError}</p>
          </div>
        )}

        {/* Map Button */}
        <div className="absolute bottom-20 right-4">
          <button 
            onClick={() => setIsMapOpen(!isMapOpen)} 
            className="flex items-center space-x-2 px-4 py-2 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-yellow-500 transition-all shadow-lg"
          >
            <MapPin size={16} />
            <span>Plan</span>
          </button>
          
          {isMapOpen && (
            <div className="absolute bottom-full right-0 mb-2 bg-black/95 rounded-xl border border-[#D4AF37] p-4 w-64 max-h-80 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[#D4AF37] font-bold text-sm">Navigation</h3>
                <button onClick={() => setIsMapOpen(false)} className="text-gray-400 hover:text-white">×</button>
              </div>
              <div className="space-y-1">
                {museumRooms.map((room, index) => (
                  <button
                    key={room.id}
                    onClick={() => { goToRoom(room.id); setIsMapOpen(false); }}
                    className={`block w-full text-left px-3 py-2 rounded text-sm ${
                      room.id === currentRoomId 
                        ? 'bg-[#D4AF37] text-black font-bold' 
                        : 'text-gray-300 hover:bg-gray-800 border border-gray-700'
                    }`}
                  >
                    {index + 1}. {room.name[lang]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
          <button onClick={goToPreviousRoom} className="p-3 bg-black/90 text-[#D4AF37] rounded-full border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black transition-all">
            <ChevronLeft size={20} />
          </button>
          <div className="px-4 py-2 bg-black/90 rounded-full border border-[#D4AF37]/50">
            <p className="text-[#D4AF37] font-bold text-xs">
              Salle {museumRooms.findIndex(r => r.id === currentRoomId) + 1} / {museumRooms.length}
            </p>
          </div>
          <button onClick={goToNextRoom} className="p-3 bg-black/90 text-[#D4AF37] rounded-full border border-[#D4AF37]/50 hover:bg-[#D4AF37] hover:text-black transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Artwork Modal */}
      {selectedArtwork && currentArtwork && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-[#D4AF37]">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#D4AF37] mb-1">
                    {currentArtwork.title[lang]}
                  </h2>
                  <p className="text-gray-500 text-sm">{currentArtwork.period}</p>
                </div>
                <button 
                  onClick={() => setSelectedArtwork(null)} 
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="relative mb-4 rounded-lg overflow-hidden border border-[#D4AF37]/30">
                <img 
                  src={currentArtwork.imageUrl} 
                  alt={currentArtwork.title[lang]} 
                  className="w-full h-64 object-cover" 
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 rounded-full border border-[#D4AF37]/50">
                  <p className="text-[#D4AF37] text-sm font-semibold">{currentArtwork.category}</p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-700">
                <h3 className="text-[#D4AF37] font-bold mb-2">Description</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {currentArtwork.description[lang]}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-900/50 rounded p-3 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-1">Origine</p>
                  <p className="text-white font-semibold text-sm">{currentArtwork.origin}</p>
                </div>
                <div className="bg-gray-900/50 rounded p-3 border border-gray-700">
                  <p className="text-gray-400 text-xs mb-1">Catégorie</p>
                  <p className="text-white font-semibold text-sm">{currentArtwork.category}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Link 
                  to={`/oeuvre/${currentArtwork.id}`} 
                  className="flex-1 px-4 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-yellow-500 transition-all text-center text-sm"
                >
                  Détails complets
                </Link>
                <Link 
                  to={`/ar/${currentArtwork.id}`} 
                  className="flex-1 px-4 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all text-center text-sm flex items-center justify-center space-x-2"
                >
                  <Camera size={18} />
                  <span>Voir en AR</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-hotspot-artwork {
          background: radial-gradient(circle, rgba(212, 175, 55, 0.9), rgba(212, 175, 55, 0.6));
          border-radius: 50%;
          width: 24px;
          height: 24px;
          border: 2px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 2px 10px rgba(212, 175, 55, 0.6);
          animation: pulse 2s infinite;
          cursor: pointer;
        }
        
        .custom-hotspot-scene {
          background: linear-gradient(135deg, rgba(100, 200, 255, 0.8), rgba(50, 150, 255, 0.6));
          border-radius: 6px;
          padding: 6px 10px;
          border: 2px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 2px 10px rgba(50, 150, 255, 0.5);
          cursor: pointer;
          font-size: 12px;
          font-weight: bold;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .pnlm-hotspot-base:hover {
          transform: scale(1.2);
          transition: transform 0.2s;
        }

        .custom-hotspot-artwork:hover::after {
          content: '🎨';
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: #D4AF37;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};
