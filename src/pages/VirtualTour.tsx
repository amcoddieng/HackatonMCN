import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Maximize2, Info, Home } from 'lucide-react';

interface Room {
  id: string;
  nameKey: string;
  descriptionKey: string;
  image360: string;
}

// Salles avec vraies images 360° d'espaces culturels/musées
const rooms: Room[] = [
  {
    id: 'salle-1',
    nameKey: 'virtualTour.room1.name',
    descriptionKey: 'virtualTour.room1.description',
    // Musée Africain - Image 360° réelle
    image360: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=2000&q=80'
  },
  {
    id: 'salle-2',
    nameKey: 'virtualTour.room2.name',
    descriptionKey: 'virtualTour.room2.description',
    // Galerie d'art avec sculptures
    image360: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=2000&q=80'
  },
  {
    id: 'salle-3',
    nameKey: 'virtualTour.room3.name',
    descriptionKey: 'virtualTour.room3.description',
    // Salle de musée avec artefacts
    image360: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3b7?w=2000&q=80'
  },
  {
    id: 'salle-4',
    nameKey: 'virtualTour.room4.name',
    descriptionKey: 'virtualTour.room4.description',
    // Galerie d'art contemporain
    image360: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=2000&q=80'
  }
];

export const VirtualTour = () => {
  const { t } = useTranslation();
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);

  const currentRoom = rooms[currentRoomIndex];

  const goToNextRoom = () => {
    setCurrentRoomIndex((prev) => (prev + 1) % rooms.length);
    setRotation(0);
  };

  const goToPreviousRoom = () => {
    setCurrentRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
    setRotation(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      setRotation(prev => prev + deltaX * 0.5);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Navigation supérieure */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 bg-gray-900/80 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Home size={20} />
            <span>{t('home') || 'Accueil'}</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className={`p-2 rounded-lg transition-colors ${
                showInfo ? 'bg-yellow-600 text-black' : 'bg-gray-900/80 hover:bg-gray-800'
              }`}
            >
              <Info size={20} />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-gray-900/80 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Viewer 360° avec simulation de rotation */}
      <div 
        className="relative h-screen w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Image panoramique avec effet de rotation */}
        <div
          className="h-full w-[200%] bg-cover bg-center transition-transform duration-100"
          style={{
            backgroundImage: `url(${currentRoom.image360})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat-x',
            transform: `translateX(${rotation}px)`
          }}
        >
          {/* Overlay pour effet immersif */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40" />
          
          {/* Message d'instruction */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-6 py-3 rounded-full text-sm animate-pulse">
            <p className="text-gray-300">
              🖱️ {t('virtualTour.dragInstruction') || 'Faites glisser pour explorer la salle en 360°'}
            </p>
          </div>
        </div>

        {/* Points d'intérêt interactifs */}
        <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <button className="relative group">
            <div className="w-8 h-8 bg-yellow-600 rounded-full animate-ping absolute opacity-75" />
            <div className="w-8 h-8 bg-yellow-600 rounded-full relative flex items-center justify-center hover:scale-110 transition-transform">
              <div className="w-4 h-4 bg-black rounded-full" />
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-yellow-600/30">
              <p className="text-xs font-semibold text-yellow-400">
                {t('virtualTour.hotspot1') || 'Masque Gelede'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Cliquez pour en savoir plus</p>
            </div>
          </button>
        </div>

        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <button className="relative group">
            <div className="w-8 h-8 bg-yellow-600 rounded-full animate-ping absolute opacity-75" />
            <div className="w-8 h-8 bg-yellow-600 rounded-full relative flex items-center justify-center hover:scale-110 transition-transform">
              <div className="w-4 h-4 bg-black rounded-full" />
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-yellow-600/30">
              <p className="text-xs font-semibold text-yellow-400">
                {t('virtualTour.hotspot2') || 'Statue Royale'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Cliquez pour en savoir plus</p>
            </div>
          </button>
        </div>

        <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <button className="relative group">
            <div className="w-8 h-8 bg-yellow-600 rounded-full animate-ping absolute opacity-75" />
            <div className="w-8 h-8 bg-yellow-600 rounded-full relative flex items-center justify-center hover:scale-110 transition-transform">
              <div className="w-4 h-4 bg-black rounded-full" />
            </div>
            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black/90 backdrop-blur-sm px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-yellow-600/30">
              <p className="text-xs font-semibold text-yellow-400">
                {t('virtualTour.hotspot3') || 'Textile Royal'}
              </p>
              <p className="text-xs text-gray-400 mt-1">Cliquez pour en savoir plus</p>
            </div>
          </button>
        </div>
      </div>

      {/* Panel d'information */}
      {showInfo && (
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black via-black/95 to-transparent p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 border border-yellow-600/30 shadow-2xl">
              <h2 className="text-2xl font-bold text-yellow-600 mb-2">
                {t(currentRoom.nameKey) || 'Salle des Masques Traditionnels'}
              </h2>
              <p className="text-gray-300 mb-4">
                {t(currentRoom.descriptionKey) || 'Collection exceptionnelle de masques rituels des différentes ethnies du Sénégal.'}
              </p>

              {/* Miniatures des salles */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                {rooms.map((room, index) => (
                  <button
                    key={room.id}
                    onClick={() => {
                      setCurrentRoomIndex(index);
                      setRotation(0);
                    }}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentRoomIndex
                        ? 'border-yellow-600 scale-105 shadow-lg shadow-yellow-600/50'
                        : 'border-gray-700 hover:border-yellow-600/50 hover:scale-105'
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${room.image360})` }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <p className="text-xs font-semibold text-center px-2">
                        {t(room.nameKey)?.split(' ').slice(0, 2).join(' ') || `Salle ${index + 1}`}
                      </p>
                    </div>
                    {index === currentRoomIndex && (
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-yellow-600 rounded-full animate-pulse" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Navigation entre salles */}
              <div className="flex items-center justify-between">
                <button
                  onClick={goToPreviousRoom}
                  className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft size={20} />
                  <span>{t('virtualTour.previous') || 'Salle précédente'}</span>
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-400">
                    {t('virtualTour.roomCounter', { current: currentRoomIndex + 1, total: rooms.length }) || `Salle ${currentRoomIndex + 1} / ${rooms.length}`}
                  </p>
                </div>

                <button
                  onClick={goToNextRoom}
                  className="flex items-center gap-2 bg-yellow-600 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors font-semibold"
                >
                  <span>{t('virtualTour.next') || 'Salle suivante'}</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note technique améliorée */}
      <div className="absolute top-20 right-4 bg-blue-900/80 backdrop-blur-sm px-4 py-3 rounded-lg border border-blue-500/50 max-w-xs shadow-xl">
        <p className="text-xs text-blue-200 mb-2">
          💡 <strong>Prototype 360°:</strong>
        </p>
        <p className="text-xs text-blue-300">
          {t('virtualTour.mockNote') || 'Images de musées réelles utilisées. Pour la version finale, intégrez Pannellum avec vos photos 360° du musée.'}
        </p>
      </div>
    </div>
  );
};
