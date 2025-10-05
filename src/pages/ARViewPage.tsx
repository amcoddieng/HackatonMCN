// src/pages/ARViewPage.tsx

import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import {
  Camera, X, RotateCw, ZoomIn, ZoomOut, ArrowLeft, Video,
  VideoOff, Maximize2, Minimize2, Move, Info, Share2
} from 'lucide-react';
import { getArtworkById } from '../data/data';
import { useTheme } from '../contexts/ThemeContext';

interface Position3D {
  x: number;
  y: number;
  z: number;
}

export const ARViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const { darkMode } = useTheme();
  const lang = i18n.language as 'fr' | 'en' | 'wo';

  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState<Position3D>({ x: 50, y: 50, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [isPinching, setIsPinching] = useState(false);
  const [initialPinchDistance, setInitialPinchDistance] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const artwork = getArtworkById(id || '');

  const activateCamera = async () => {
    setIsLoading(true);

    try {
      const constraints = {
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          aspectRatio: { ideal: 16 / 9 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraActive(true);
      setTimeout(() => setShowInfo(false), 5000);
    } catch (error: any) {
      console.error('Erreur accès caméra:', error);

      let errorMessage = "Impossible d'accéder à la caméra.";
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          errorMessage = "Permission caméra refusée. Veuillez autoriser l'accès dans les paramètres.";
        } else if (error.name === 'NotFoundError') {
          errorMessage = "Aucune caméra détectée sur cet appareil.";
        }
      }

      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureARPhoto = () => {
    if (!videoRef.current || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const container = containerRef.current;

    canvas.width = video.videoWidth || 1920;
    canvas.height = video.videoHeight || 1080;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const artworkElement = container.querySelector('.ar-artwork') as HTMLImageElement;
    if (artworkElement) {
      const rect = artworkElement.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const scaleX = canvas.width / containerRect.width;
      const scaleY = canvas.height / containerRect.height;

      const x = (rect.left - containerRect.left) * scaleX;
      const y = (rect.top - containerRect.top) * scaleY;
      const width = rect.width * scaleX;
      const height = rect.height * scaleY;

      ctx.save();
      ctx.translate(x + width / 2, y + height / 2);
      ctx.rotate((rotation.z * Math.PI) / 180);
      ctx.scale(scale, scale);
      ctx.drawImage(artworkElement, -width / (2 * scale), -height / (2 * scale), width / scale, height / scale);
      ctx.restore();
    }

    const imageData = canvas.toDataURL('image/png');
    setCapturedImage(imageData);

    const link = document.createElement('a');
    link.download = `ar-${artwork?.title[lang] || 'artwork'}-${Date.now()}.png`;
    link.href = imageData;
    link.click();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartPos.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    } else if (e.touches.length === 2) {
      setIsPinching(true);
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialPinchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const touch = e.touches[0];
      const deltaX = touch.clientX - dragStartPos.current.x;
      const deltaY = touch.clientY - dragStartPos.current.y;

      setPosition(prev => ({
        x: Math.max(10, Math.min(90, prev.x + (deltaX / rect.width) * 100)),
        y: Math.max(10, Math.min(90, prev.y + (deltaY / rect.height) * 100)),
        z: prev.z
      }));

      dragStartPos.current = {
        x: touch.clientX,
        y: touch.clientY
      };
    } else if (e.touches.length === 2 && isPinching) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );

      const scaleChange = distance / initialPinchDistance;
      setScale(prev => Math.max(0.3, Math.min(4, prev * scaleChange)));
      setInitialPinchDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setIsPinching(false);
  };

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

  useEffect(() => {
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!cameraActive) return;

    let timeout: NodeJS.Timeout;
    const resetTimeout = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    resetTimeout();
    window.addEventListener('touchstart', resetTimeout);
    window.addEventListener('mousemove', resetTimeout);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('touchstart', resetTimeout);
      window.removeEventListener('mousemove', resetTimeout);
    };
  }, [cameraActive]);

  if (!artwork) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="text-center">
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xl mb-4`}>Œuvre non trouvée</p>
          <Link to="/catalogue" className="text-[#D4AF37] hover:text-yellow-300">
            ← Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-100'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gradient-to-r from-black to-gray-900 border-b border-[#D4AF37]/30' : 'bg-gradient-to-r from-white to-gray-100 border-b border-gray-300'} py-4 transition-transform duration-300 ${!showControls && cameraActive ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="container mx-auto px-4">
          <Link
            to={`/oeuvre/${id}`}
            className={`inline-flex items-center space-x-2 ${darkMode ? 'text-gray-400 hover:text-[#D4AF37]' : 'text-gray-600 hover:text-[#D4AF37]'} transition-colors mb-2`}
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </Link>
          <h1 className={`text-2xl md:text-4xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} mb-1`}>
            Réalité Augmentée
          </h1>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{artwork.title[lang]}</p>
        </div>
      </div>

      {/* Viewer AR */}
      <div
        ref={containerRef}
        className={`relative w-full h-[85vh] ${darkMode ? 'bg-black' : 'bg-gray-200'} overflow-hidden`}
      >
        <canvas ref={canvasRef} className="hidden" />

        {!cameraActive ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 flex items-center justify-center mb-8 border-4 border-[#D4AF37]/30 animate-pulse relative">
              <Camera className="text-[#D4AF37]" size={72} />
              <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37]/20 animate-ping"></div>
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'} mb-3 text-center`}>
              Visualisez l'œuvre dans votre espace
            </h2>

            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center max-w-lg mb-8 text-lg`}>
              Activez votre caméra pour placer virtuellement cette œuvre d'art
              dans votre environnement réel. Vous pourrez la déplacer, tourner
              et redimensionner librement.
            </p>

            <div className={`${darkMode ? 'bg-gradient-to-br from-gray-900/90 to-black/90 border-[#D4AF37]/30' : 'bg-white border-gray-300'} p-6 rounded-xl border mb-8 max-w-md backdrop-blur-sm`}>
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title[lang]}
                  className="w-24 h-24 object-cover rounded-lg border-2 border-[#D4AF37]/50"
                />
                <div className="flex-1">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>Œuvre sélectionnée</p>
                  <p className={`${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} font-bold text-lg`}>{artwork.title[lang]}</p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>{artwork.artist}</p>
                </div>
              </div>

              <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-300'} pt-4`}>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>
                  <span className={`${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} font-semibold`}>Modèle 3D :</span>
                </p>
                <p className={`${darkMode ? 'text-white bg-black/50' : 'text-black bg-gray-100'} font-mono text-sm px-3 py-2 rounded`}>
                  {artwork.arModel || `${artwork.id}_model.gltf`}
                </p>
                <div className={`flex items-center justify-between mt-3 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  <span>Format : GLTF 2.0</span>
                  <span>~4.2 MB</span>
                  <span>Haute qualité</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-4xl">
              <div className={`${darkMode ? 'bg-gray-900/60 border-gray-700' : 'bg-white border-gray-300'} p-4 rounded-lg border text-center`}>
                <Move className="text-[#D4AF37] mx-auto mb-2" size={28} />
                <p className={`${darkMode ? 'text-white' : 'text-black'} font-semibold mb-1`}>Déplacer</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Glissez avec un doigt</p>
              </div>
              <div className={`${darkMode ? 'bg-gray-900/60 border-gray-700' : 'bg-white border-gray-300'} p-4 rounded-lg border text-center`}>
                <ZoomIn className="text-[#D4AF37] mx-auto mb-2" size={28} />
                <p className={`${darkMode ? 'text-white' : 'text-black'} font-semibold mb-1`}>Redimensionner</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Pincez avec deux doigts</p>
              </div>
              <div className={`${darkMode ? 'bg-gray-900/60 border-gray-700' : 'bg-white border-gray-300'} p-4 rounded-lg border text-center`}>
                <RotateCw className="text-[#D4AF37] mx-auto mb-2" size={28} />
                <p className={`${darkMode ? 'text-white' : 'text-black'} font-semibold mb-1`}>Rotation</p>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>Utilisez les contrôles</p>
              </div>
            </div>

            <button
              onClick={activateCamera}
              disabled={isLoading}
              className="group flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-[#D4AF37] to-yellow-500 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-[#D4AF37]/20 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <VideoOff size={28} className="animate-pulse" />
                  <span className="text-xl">Activation en cours...</span>
                </>
              ) : (
                <>
                  <Video size={28} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xl">Activer la caméra</span>
                </>
              )}
            </button>

            <p className={`${darkMode ? 'text-gray-500' : 'text-gray-600'} text-sm mt-6 text-center max-w-md`}>
              Votre vie privée est protégée. Aucune image n'est transmise ou stockée.
              Le traitement se fait localement sur votre appareil.
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
              autoPlay
            />

            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(212, 175, 55, 0.4) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(212, 175, 55, 0.4) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                  backgroundPosition: 'center center'
                }}
              />

              <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]/60"></div>
              <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]/60"></div>
              <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]/60"></div>
              <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]/60"></div>
            </div>

            <div
              className="absolute cursor-move"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: `translate(-50%, -50%) scale(${scale}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transformStyle: 'preserve-3d',
                pointerEvents: 'auto'
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={artwork.imageUrl}
                alt={artwork.title[lang]}
                className="ar-artwork w-56 md:w-80 h-auto object-contain select-none"
                style={{
                  filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))',
                }}
                draggable={false}
              />

              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-full h-8 bg-black/40 blur-xl rounded-full"
                style={{ transform: `translateX(-50%) translateY(${scale * 50}px) scale(${scale})` }}
              />
            </div>

            {showInfo && (
              <div className={`absolute top-4 left-4 right-4 ${darkMode ? 'bg-black/85 border-[#D4AF37]/40' : 'bg-white/90 border-gray-300'} px-5 py-4 rounded-xl border backdrop-blur-md transition-opacity duration-500 ${showInfo ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className={`${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} font-bold text-lg mb-1`}>{artwork.title[lang]}</p>
                    <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-2`}>{artwork.artist}</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
                      Touchez et glissez pour déplacer • Pincez pour redimensionner
                    </p>
                  </div>
                  <button
                    onClick={() => setShowInfo(false)}
                    className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'} transition-colors ml-3`}
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            )}

            <div className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <div className={`flex items-center space-x-3 ${darkMode ? 'bg-black/90 border-[#D4AF37]/40' : 'bg-white/90 border-gray-300'} px-8 py-4 rounded-full border backdrop-blur-lg shadow-2xl`}>
                <button
                  onClick={() => setRotation(r => ({ ...r, x: r.x - 15 }))}
                  className={`${darkMode ? 'text-gray-300 hover:text-[#D4AF37] hover:bg-gray-800' : 'text-gray-600 hover:text-[#D4AF37] hover:bg-gray-100'} transition-colors p-2 rounded-full`}
                  title="Rotation X -"
                >
                  <RotateCw size={24} className="transform rotate-90" />
                </button>

                <button
                  onClick={() => setRotation(r => ({ ...r, y: r.y + 45 }))}
                  className={`${darkMode ? 'text-gray-300 hover:text-[#D4AF37] hover:bg-gray-800' : 'text-gray-600 hover:text-[#D4AF37] hover:bg-gray-100'} transition-colors p-2 rounded-full`}
                  title="Rotation Y"
                >
                  <RotateCw size={24} />
                </button>

                <div className={`w-px h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

                <button
                  onClick={() => setScale(s => Math.max(0.3, s - 0.2))}
                  className={`${darkMode ? 'text-gray-300 hover:text-[#D4AF37] hover:bg-gray-800' : 'text-gray-600 hover:text-[#D4AF37] hover:bg-gray-100'} transition-colors p-2 rounded-full`}
                  title="Réduire"
                >
                  <ZoomOut size={24} />
                </button>

                <div className={`text-[#D4AF37] font-mono text-sm px-3 py-1 ${darkMode ? 'bg-gray-900 border-[#D4AF37]/30' : 'bg-gray-100 border-[#D4AF37]/50'} rounded-full border`}>
                  {Math.round(scale * 100)}%
                </div>

                <button
                  onClick={() => setScale(s => Math.min(4, s + 0.2))}
                  className={`${darkMode ? 'text-gray-300 hover:text-[#D4AF37] hover:bg-gray-800' : 'text-gray-600 hover:text-[#D4AF37] hover:bg-gray-100'} transition-colors p-2 rounded-full`}
                  title="Agrandir"
                >
                  <ZoomIn size={24} />
                </button>

                <div className={`w-px h-8 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

                <button
                  onClick={captureARPhoto}
                  className={`${darkMode ? 'text-gray-300 hover:text-[#D4AF37] hover:bg-gray-800' : 'text-gray-600 hover:text-[#D4AF37] hover:bg-gray-100'} transition-colors p-2 rounded-full`}
                  title="Capturer"
                >
                  <Camera size={24} />
                </button>
              </div>
            </div>

            <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 transition-all duration-300 ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
              <button
                onClick={() => {
                  setScale(1);
                  setRotation({ x: 0, y: 0, z: 0 });
                  setPosition({ x: 50, y: 50, z: 0 });
                }}
                className="px-5 py-2.5 bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-semibold rounded-full border border-[#D4AF37]/40 backdrop-blur-md hover:bg-[#D4AF37]/30 transition-all"
              >
                Réinitialiser
              </button>

              <button
                onClick={() => setShowInfo(!showInfo)}
                className={`p-2.5 ${darkMode ? 'bg-gray-900/80 text-gray-300 border-gray-700 hover:border-[#D4AF37]/40' : 'bg-white/80 text-gray-600 border-gray-300 hover:border-[#D4AF37]/40'} rounded-full border backdrop-blur-md hover:text-[#D4AF37] transition-all`}
                title="Informations"
              >
                <Info size={20} />
              </button>

              <button
                onClick={toggleFullscreen}
                className={`p-2.5 ${darkMode ? 'bg-gray-900/80 text-gray-300 border-gray-700 hover:border-[#D4AF37]/40' : 'bg-white/80 text-gray-600 border-gray-300 hover:border-[#D4AF37]/40'} rounded-full border backdrop-blur-md hover:text-[#D4AF37] transition-all`}
                title="Plein écran"
              >
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>

              <button
                onClick={() => {
                  if (navigator.share && capturedImage) {
                    navigator.share({
                      title: `AR - ${artwork.title[lang]}`,
                      text: `Découvrez "${artwork.title[lang]}" en réalité augmentée !`,
                    });
                  }
                }}
                className={`p-2.5 ${darkMode ? 'bg-gray-900/80 text-gray-300 border-gray-700 hover:border-[#D4AF37]/40' : 'bg-white/80 text-gray-600 border-gray-300 hover:border-[#D4AF37]/40'} rounded-full border backdrop-blur-md hover:text-[#D4AF37] transition-all`}
                title="Partager"
              >
                <Share2 size={20} />
              </button>

              <button
                onClick={stopCamera}
                className="p-2.5 bg-red-900/80 text-red-300 rounded-full border border-red-700 backdrop-blur-md hover:bg-red-800 hover:text-white transition-all"
                title="Arrêter"
              >
                <X size={20} />
              </button>
            </div>

            {capturedImage && (
              <div className="absolute top-20 right-4 bg-green-900/90 px-4 py-3 rounded-lg border border-green-500/50 backdrop-blur-md animate-fade-in">
                <p className="text-green-300 text-sm font-semibold flex items-center">
                  <Camera size={16} className="mr-2" />
                  Photo sauvegardée !
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
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
      `}</style>
    </div>
  );
};