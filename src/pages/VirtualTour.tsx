// src/pages/VirtualTour.tsx
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Info, MapPin, Home, Maximize2, 
  Volume2, VolumeX, Compass, Eye, Image as ImageIcon 
} from 'lucide-react';
import { artworks } from '../data/data';
import { useTheme } from '../contexts/ThemeContext';

// Configuration des salles avec images 360° authentiques de musées africains
const museumRooms = [
  {
    id: 'entrance',
    name: { 
      fr: 'Hall d\'Entrée Monumental', 
      en: 'Monumental Entrance Hall', 
      wo: 'Biir bu Dugg bu Mag' 
    },
    description: {
      fr: 'Vestibule majestueux avec sculptures monumentales et architecture traditionnelle',
      en: 'Majestic vestibule with monumental sculptures and traditional architecture',
      wo: 'Biir bu rafet ak sculpture yu mag'
    },
    image360: 'https://pannellum.org/images/alma.jpg',
    ambientSound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    hotspots: [
      { 
        pitch: 8, 
        yaw: 0, 
        type: 'info',
        artworkId: 'masque-wolof',
        text: { fr: '🎭 Masque Wolof Cérémoniel', en: '🎭 Wolof Ceremonial Mask', wo: '🎭 Masque Wolof' }
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
      },
      { 
        pitch: -8, 
        yaw: 180, 
        type: 'info',
        artworkId: 'statuette-fertilite',
        text: { fr: '🗿 Statuette de Fertilité', en: '🗿 Fertility Statuette', wo: '🗿 Statuette Fertilité' }
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
    image360: 'https://pannellum.org/images/cerro-toco-0.jpg',
    ambientSound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    hotspots: [
      { 
        pitch: 10, 
        yaw: -45, 
        type: 'info',
        artworkId: 'masque-wolof',
        text: { fr: '🎭 Masque Wolof du XIXe siècle', en: '🎭 19th Century Wolof Mask', wo: '🎭 Masque Wolof 19e' }
      },
      { 
        pitch: 8, 
        yaw: 45, 
        type: 'info',
        artworkId: 'masque-serer',
        text: { fr: '🎭 Masque Serer Ancestral', en: '🎭 Ancestral Serer Mask', wo: '🎭 Masque Serer' }
      },
      { 
        pitch: 12, 
        yaw: 0, 
        type: 'info',
        artworkId: 'masque-diola',
        text: { fr: '🎭 Masque Diola de Casamance', en: '🎭 Diola Mask from Casamance', wo: '🎭 Masque Diola' }
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
        text: { fr: '← Retour Hall', en: '← Back to Hall', wo: '← Dellu Hall' }
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
    image360: 'https://pannellum.org/images/jfk.jpg',
    ambientSound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    hotspots: [
      { 
        pitch: 6, 
        yaw: -30, 
        type: 'info',
        artworkId: 'tissage-baol',
        text: { fr: '🧵 Tissage Royal du Baol', en: '🧵 Royal Weaving from Baol', wo: '🧵 Tissage Baol' }
      },
      { 
        pitch: 8, 
        yaw: 30, 
        type: 'info',
        artworkId: 'parure-lingeer',
        text: { fr: '👑 Parure de Lingeer', en: '👑 Queen\'s Ornament', wo: '👑 Parure Lingeer' }
      },
      { 
        pitch: -6, 
        yaw: 90, 
        type: 'scene',
        targetRoom: 'contemporary',
        text: { fr: '→ Art Contemporain', en: '→ Contemporary Art', wo: '→ Art bu Leeral' }
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
    image360: 'https://pannellum.org/images/from-tree.jpg',
    ambientSound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    hotspots: [
      { 
        pitch: 12, 
        yaw: 0, 
        type: 'info',
        artworkId: 'peinture-resistance',
        text: { fr: '🎨 "La Résistance" - Peinture moderne', en: '🎨 "The Resistance" - Modern painting', wo: '🎨 "Résistance"' }
      },
      { 
        pitch: 10, 
        yaw: 70, 
        type: 'info',
        artworkId: 'sculpture-contemporaine',
        text: { fr: '🗿 Sculpture contemporaine en bronze', en: '🗿 Contemporary bronze sculpture', wo: '🗿 Sculpture bronze' }
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
    image360: 'https://pannellum.org/images/bma-0.jpg',
    ambientSound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    hotspots: [
      { 
        pitch: 5, 
        yaw: -20, 
        type: 'info',
        artworkId: 'collier-mali',
        text: { fr: '💎 Collier Royal de Soundiata', en: '💎 Soundiata\'s Royal Necklace', wo: '💎 Collier Royal' }
      },
      { 
        pitch: 7, 
        yaw: 20, 
        type: 'info',
        artworkId: 'couronne-mali',
        text: { fr: '👑 Couronne de l\'Empire', en: '👑 Empire Crown', wo: '👑 Couronne Empire' }
      },
      { 
        pitch: 10, 
        yaw: 90, 
        type: 'info',
        artworkId: 'manuscrit-tombouctou',
        text: { fr: '📜 Manuscrit de Tombouctou', en: '📜 Timbuktu Manuscript', wo: '📜 Manuscrit Tombouctou' }
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
    image360: 'https://pannellum.org/images/bma-1.jpg',
    ambientSound: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    hotspots: [
      { 
        pitch: 8, 
        yaw: 0, 
        type: 'info',
        artworkId: 'trone-cayor',
        text: { fr: '👑 Trône du Damel du Cayor', en: '👑 Throne of Cayor Damel', wo: '👑 Trone Damel Cayor' }
      },
      { 
        pitch: 6, 
        yaw: -60, 
        type: 'info',
        artworkId: 'epee-royale',
        text: { fr: '⚔️ Épée Cérémonielle', en: '⚔️ Ceremonial Sword', wo: '⚔️ Épée' }
      },
      { 
        pitch: 7, 
        yaw: 60, 
        type: 'info',
        artworkId: 'couronne-lingeer',
        text: { fr: '👑 Diadème de Lingeer', en: '👑 Queen\'s Diadem', wo: '👑 Diadème Lingeer' }
      },
      { 
        pitch: -6, 
        yaw: 180, 
        type: 'scene',
        targetRoom: 'entrance',
        text: { fr: '← Retour au Hall', en: '← Back to Hall', wo: '← Dellu Hall' }
      },
      { 
        pitch: -8, 
        yaw: 90, 
        type: 'scene',
        targetRoom: 'mali',
        text: { fr: '← Empire du Mali', en: '← Mali Empire', wo: '← Empire Mali' }
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
  const { darkMode } = useTheme();
  const [currentRoomId, setCurrentRoomId] = useState('entrance');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewAngle, setViewAngle] = useState({ yaw: 0, pitch: 0 });
  
  const viewerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pannellumInstance = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
      console.log('✅ Pannellum chargé avec succès');
      setScriptLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error('❌ Erreur chargement Pannellum');
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
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [scriptLoaded]);

  // Initialiser le viewer 360°
  useEffect(() => {
    if (!scriptLoaded || !viewerRef.current || !window.pannellum) return;

    try {
      if (pannellumInstance.current) {
        pannellumInstance.current.destroy();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const scenes: any = {};
      
      museumRooms.forEach(room => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hotspots: any[] = room.hotspots.map((spot) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const hotspot: any = {
            pitch: spot.pitch,
            yaw: spot.yaw,
            type: spot.type === 'info' ? 'info' : 'scene',
            text: spot.text[lang],
            cssClass: spot.type === 'info' ? 'custom-hotspot-artwork' : 'custom-hotspot-scene',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            createTooltipFunc: (hotSpotDiv: HTMLElement, args: any) => {
              const tooltip = document.createElement('div');
              tooltip.className = 'custom-tooltip';
              tooltip.innerHTML = `
                <div class="tooltip-content">
                  ${args.type === 'info' ? '🎨' : '🚪'} ${args.text}
                </div>
              `;
              hotSpotDiv.appendChild(tooltip);
            }
          };

          if (spot.type === 'info') {
            hotspot.clickHandlerFunc = () => {
              console.log('🎨 Œuvre sélectionnée:', spot.artworkId);
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
          northOffset: 0,
          showControls: false,
          autoRotate: -2,
          autoRotateInactivityDelay: 5000,
          autoRotateStopDelay: 3000,
        };
      });

      console.log('🏛️ Initialisation du musée virtuel:', Object.keys(scenes));

      pannellumInstance.current = window.pannellum.viewer(viewerRef.current, {
        default: {
          firstScene: currentRoomId,
          sceneFadeDuration: 1500,
          autoLoad: true,
        },
        scenes: scenes
      });

      // Événements
      pannellumInstance.current.on('scenechange', (sceneId: string) => {
        console.log('🚪 Changement de salle:', sceneId);
        setCurrentRoomId(sceneId);
        setSelectedArtwork(null);
        playAmbientSound(sceneId);
      });

      pannellumInstance.current.on('mouseup', () => {
        try {
          const yaw = pannellumInstance.current.getYaw();
          const pitch = pannellumInstance.current.getPitch();
          setViewAngle({ yaw: Math.round(yaw), pitch: Math.round(pitch) });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
        } catch (e) {}
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      pannellumInstance.current.on('error', (err: any) => {
        console.error('❌ Erreur Pannellum:', err);
      });

    } catch (error) {
      console.error('❌ Erreur initialisation viewer:', error);
    }
  }, [scriptLoaded, lang, currentRoomId]);

  // Audio ambiant
  const playAmbientSound = (roomId: string) => {
    if (!audioEnabled) return;
    
    const room = museumRooms.find(r => r.id === roomId);
    if (!room?.ambientSound) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      audioRef.current = new Audio(room.ambientSound);
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      
      audioRef.current.addEventListener('canplaythrough', () => {
        audioRef.current?.play().catch(e => console.log('Audio play failed:', e));
      });
      
      audioRef.current.load();
    } catch (error) {
      console.error('Erreur audio:', error);
    }
  };

  // Navigation
  const goToRoom = (roomId: string) => {
    if (pannellumInstance.current) {
      try {
        pannellumInstance.current.loadScene(roomId);
      } catch (error) {
        console.error('Erreur changement de scène:', error);
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

  // Plein écran
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Erreur fullscreen:', error);
    }
  };

  // Toggle audio
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      playAmbientSound(currentRoomId);
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-black'} transition-all duration-300`}>
      {/* Header élégant */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border-b border-[#D4AF37]/30' : 'bg-gradient-to-r from-white to-gray-50 border-b border-gray-300'} py-5 backdrop-blur-md transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm uppercase tracking-wider`}>Visite en direct</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#D4AF37] mb-2">
                Musée Virtuel 360°
              </h1>
              <div className="flex items-center space-x-2">
                <MapPin className="text-[#D4AF37]" size={18} />
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-lg`}>{currentRoom.name[lang]}</p>
              </div>
              <p className={`${darkMode ? 'text-gray-500' : 'text-gray-600'} text-sm mt-1`}>{currentRoom.description[lang]}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleAudio}
                className={`p-3 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-[#D4AF37]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#D4AF37]'} rounded-full border hover:text-[#D4AF37] transition-all duration-300`}
                title={audioEnabled ? 'Désactiver l\'audio' : 'Activer l\'audio'}
              >
                {audioEnabled ? <Volume2 size={22} /> : <VolumeX size={22} />}
              </button>
              
              <button
                onClick={toggleFullscreen}
                className={`p-3 ${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600 hover:border-[#D4AF37]' : 'bg-white text-gray-600 border-gray-300 hover:border-[#D4AF37]'} rounded-full border hover:text-[#D4AF37] transition-all duration-300`}
                title="Plein écran"
              >
                <Maximize2 size={22} />
              </button>
              
              <Link 
                to="/" 
                className="p-3 bg-[#D4AF37] text-black rounded-full hover:bg-yellow-500 transition-all duration-300"
                title="Retour à l'accueil"
              >
                <Home size={22} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Viewer 360° */}
      <div className={`relative w-full h-[82vh] ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} transition-all duration-300`}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative">
              <div className="animate-spin rounded-full h-24 w-24 border-4 border-[#D4AF37] border-t-transparent"></div>
              <Eye className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#D4AF37]" size={32} />
            </div>
            <div className="text-[#D4AF37] text-2xl font-semibold mt-6">Chargement du musée...</div>
            <div className={`${darkMode ? 'text-gray-500' : 'text-gray-600'} text-sm mt-2`}>Préparation de l'expérience immersive</div>
          </div>
        ) : (
          <>
            <div ref={viewerRef} className="w-full h-full" id="panorama-viewer" />

            {/* Instructions flottantes */}
            <div className={`absolute top-4 left-4 ${darkMode ? 'bg-gray-700/90 border-[#D4AF37]/40' : 'bg-white/90 border-gray-300'} px-5 py-4 rounded-xl border max-w-sm backdrop-blur-lg transition-all duration-300`}>
              <div className="flex items-start space-x-3">
                <Info className="text-[#D4AF37] flex-shrink-0 mt-0.5" size={20} />
                <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p className="font-bold text-[#D4AF37] mb-2 text-base">Navigation Interactive :</p>
                  <ul className="space-y-1.5">
                    <li>🖱️ <span className={darkMode ? 'text-white' : 'text-black'}>Cliquez-glissez</span> pour regarder autour</li>
                    <li>🎯 <span className={darkMode ? 'text-white' : 'text-black'}>Cliquez sur 🎨</span> pour voir les œuvres</li>
                    <li>🚪 <span className={darkMode ? 'text-white' : 'text-black'}>Cliquez sur 🚪</span> pour changer de salle</li>
                    <li>🔍 <span className={darkMode ? 'text-white' : 'text-black'}>Molette</span> pour zoomer</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Indicateur d'angle de vue */}
            <div className={`absolute top-4 right-4 ${darkMode ? 'bg-gray-700/90 border-[#D4AF37]/40' : 'bg-white/90 border-gray-300'} px-4 py-3 rounded-xl border backdrop-blur-lg transition-all duration-300`}>
              <div className="flex items-center space-x-3">
                <Compass className="text-[#D4AF37]" size={20} />
                <div className="text-sm">
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Angle de vue</p>
                  <p className={`${darkMode ? 'text-white' : 'text-black'} font-mono`}>
                    Yaw: {viewAngle.yaw}° | Pitch: {viewAngle.pitch}°
                  </p>
                </div>
              </div>
            </div>

            {/* Carte interactive des salles */}
            <div className="absolute bottom-24 right-4">
              <button
                onClick={() => setIsMapOpen(!isMapOpen)}
                className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black font-bold rounded-full hover:from-yellow-500 hover:to-[#D4AF37] transition-all duration-300 shadow-xl shadow-[#D4AF37]/30"
              >
                <MapPin size={20} />
                <span>Plan du Musée</span>
              </button>
              
              {isMapOpen && (
                <div className={`absolute bottom-full right-0 mb-3 ${darkMode ? 'bg-gray-700/95 border-[#D4AF37]' : 'bg-white/95 border-gray-300'} rounded-xl border p-5 w-80 max-h-96 overflow-y-auto backdrop-blur-xl transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#D4AF37] font-bold text-lg flex items-center">
                      <MapPin size={18} className="mr-2" />
                      Navigation
                    </h3>
                    <button
                      onClick={() => setIsMapOpen(false)}
                      className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} text-2xl transition-colors duration-300`}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {museumRooms.map((room, index) => (
                      <button
                        key={room.id}
                        onClick={() => {
                          goToRoom(room.id);
                          setIsMapOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                          room.id === currentRoomId
                            ? 'bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black font-bold shadow-lg'
                            : darkMode 
                              ? 'text-gray-300 hover:text-white hover:bg-gray-600 border border-gray-600'
                              : 'text-gray-700 hover:text-black hover:bg-gray-100 border border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold">{index + 1}. {room.name[lang]}</p>
                            <p className={`text-xs mt-1 ${room.id === currentRoomId ? 'text-black/70' : darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                              {room.hotspots.length} points d'intérêt
                            </p>
                          </div>
                          {room.id === currentRoomId && (
                            <Eye className="text-black" size={18} />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contrôles de navigation */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
              <button
                onClick={goToPreviousRoom}
                className={`p-4 ${darkMode ? 'bg-gray-700/90 border-[#D4AF37]/50' : 'bg-white/90 border-gray-300'} text-[#D4AF37] rounded-full border-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 backdrop-blur-lg shadow-xl`}
                title="Salle précédente"
              >
                <ChevronLeft size={28} />
              </button>
              
              <div className={`px-6 py-3 ${darkMode ? 'bg-gray-700/90 border-[#D4AF37]/50' : 'bg-white/90 border-gray-300'} rounded-full border backdrop-blur-lg transition-all duration-300`}>
                <p className="text-[#D4AF37] font-bold text-sm">
                  Salle {museumRooms.findIndex(r => r.id === currentRoomId) + 1} / {museumRooms.length}
                </p>
              </div>
              
              <button
                onClick={goToNextRoom}
                className={`p-4 ${darkMode ? 'bg-gray-700/90 border-[#D4AF37]/50' : 'bg-white/90 border-gray-300'} text-[#D4AF37] rounded-full border-2 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 backdrop-blur-lg shadow-xl`}
                title="Salle suivante"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </>
        )}
      </div>

      {/* Modal œuvre */}
      {selectedArtwork && currentArtwork && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className={`${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-[#D4AF37]' : 'bg-white border-gray-300'} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 shadow-2xl shadow-[#D4AF37]/20 transition-all duration-300`}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <ImageIcon className="text-[#D4AF37]" size={24} />
                    <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm uppercase tracking-wider`}>Œuvre du Musée</span>
                  </div>
                  <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} mb-2`}>
                    {currentArtwork.title[lang]}
                  </h2>
                  <p className={`${darkMode ? 'text-gray-500' : 'text-gray-600'} text-sm mt-1`}>{currentArtwork.period}</p>
                </div>
                <button
                  onClick={() => setSelectedArtwork(null)}
                  className={`${darkMode ? 'text-gray-400 hover:text-white hover:bg-red-900/50' : 'text-gray-600 hover:text-black hover:bg-red-100'} rounded-full p-2 transition-all duration-300 text-3xl`}
                >
                  ×
                </button>
              </div>

              <div className="relative mb-6 rounded-xl overflow-hidden border-2 border-[#D4AF37]/30 transition-all duration-300 hover:shadow-lg">
                <img
                  src={currentArtwork.imageUrl}
                  alt={currentArtwork.title[lang]}
                  className="w-full h-96 object-cover"
                />
                <div className={`absolute top-4 left-4 px-3 py-1.5 ${darkMode ? 'bg-gray-700/80 border-[#D4AF37]/50' : 'bg-white/80 border-gray-300'} rounded-full border backdrop-blur-sm transition-all duration-300`}>
                  <p className="text-[#D4AF37] text-sm font-semibold">{currentArtwork.category}</p>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'} rounded-xl p-6 mb-6 border transition-all duration-300 hover:shadow-md`}>
                <h3 className="text-[#D4AF37] font-bold text-lg mb-3">Description</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {currentArtwork.description[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'} rounded-lg p-4 border transition-all duration-300 hover:shadow-md`}>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>Origine</p>
                  <p className={`${darkMode ? 'text-gray-100' : 'text-black'} font-semibold`}>{currentArtwork.origin}</p>
                </div>
                <div className={`${darkMode ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-300'} rounded-lg p-4 border transition-all duration-300 hover:shadow-md`}>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-1`}>Période</p>
                  <p className={`${darkMode ? 'text-gray-100' : 'text-black'} font-semibold`}>{currentArtwork.period}</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <Link
                  to={`/oeuvre/${currentArtwork.id}`}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-[#D4AF37] transition-all duration-300 text-center shadow-lg shadow-[#D4AF37]/20 hover:scale-105"
                >
                  📖 Voir les détails complets
                </Link>
                <Link
                  to={`/ar/${currentArtwork.id}`}
                  className="flex-1 px-6 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-xl hover:bg-[#D4AF37] hover:text-black transition-all duration-300 text-center hover:scale-105"
                >
                  🥽 Visualiser en AR
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles CSS */}
      <style>{`
        .custom-hotspot-artwork {
          background: radial-gradient(circle, rgba(212, 175, 55, 0.9) 0%, rgba(212, 175, 55, 0.6) 100%);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          border: 3px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.6), 0 0 20px rgba(212, 175, 55, 0.4);
          animation: pulse-hotspot 2s infinite;
          transition: all 0.3s ease;
        }
        
        .custom-hotspot-artwork:hover {
          transform: scale(1.3);
          box-shadow: 0 6px 25px rgba(212, 175, 55, 0.9), 0 0 30px rgba(212, 175, 55, 0.6);
        }
        
        .custom-hotspot-scene {
          background: linear-gradient(135deg, rgba(100, 200, 255, 0.8), rgba(50, 150, 255, 0.6));
          border-radius: 8px;
          padding: 8px 12px;
          border: 2px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 4px 15px rgba(50, 150, 255, 0.5);
          animation: pulse-scene 3s infinite;
          transition: all 0.3s ease;
        }
        
        .custom-hotspot-scene:hover {
          transform: scale(1.15);
          box-shadow: 0 6px 25px rgba(50, 150, 255, 0.8);
        }
        
        .pnlm-hotspot-base {
          cursor: pointer;
        }
        
        .custom-tooltip {
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .pnlm-hotspot-base:hover .custom-tooltip {
          opacity: 1;
        }
        
        .tooltip-content {
          background: rgba(0, 0, 0, 0.95);
          color: #D4AF37;
          padding: 8px 16px;
          border-radius: 8px;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 600;
          border: 1px solid rgba(212, 175, 55, 0.5);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
        }
        
        @keyframes pulse-hotspot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
        
        @keyframes pulse-scene {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.8);
        }
      `}</style>
    </div>
  );
};