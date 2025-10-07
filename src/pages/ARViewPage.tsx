// src/pages/ARViewPage.tsx

import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Camera, X, RotateCw, ZoomIn, ZoomOut, ArrowLeft, Video, Info } from 'lucide-react';
import { getArtworkById } from '../data/data';

export const ARViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { i18n } = useTranslation();
  const lang = i18n.language as 'fr' | 'en' | 'wo';
  
  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const artwork = getArtworkById(id || '');

  const activateCamera = async () => {
    setIsLoading(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      
      setCameraActive(true);
    } catch (error) {
      console.error('Erreur accès caméra:', error);
      alert(
        'Impossible d\'accéder à la caméra.\n\n' +
        'Vérifiez que :\n' +
        '• Vous avez autorisé l\'accès à la caméra\n' +
        '• Vous utilisez HTTPS ou localhost\n' +
        '• Aucune autre application n\'utilise la caméra'
      );
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

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: ((touch.clientX - rect.left) / rect.width) * 100,
      y: ((touch.clientY - rect.top) / rect.height) * 100
    });
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-4">
            {lang === 'fr' ? 'Œuvre non trouvée' :
             lang === 'en' ? 'Artwork not found' :
             'Liggéey gisul'}
          </p>
          <Link to="/catalogue" className="text-[#D4AF37] hover:text-yellow-300 font-semibold">
            {lang === 'fr' ? '← Retour au catalogue' :
             lang === 'en' ? '← Back to catalogue' :
             '← Dellu ci catalogue'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="bg-gradient-to-r from-black to-gray-900 border-b border-[#D4AF37]/30 py-4">
        <div className="container mx-auto px-4">
          <Link
            to={`/oeuvre/${id}`}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            <span>
              {lang === 'fr' ? 'Retour aux détails' :
               lang === 'en' ? 'Back to details' :
               'Dellu ci détails'}
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-[#D4AF37] mb-1">
            {lang === 'fr' ? 'Réalité Augmentée' :
             lang === 'en' ? 'Augmented Reality' :
             'Réalité Augmentée'}
          </h1>
          <p className="text-gray-400">{artwork.title[lang]}</p>
        </div>
      </div>

      <div className="relative w-full h-[78vh] bg-black overflow-hidden">
        {!cameraActive ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-32 h-32 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-8 border-4 border-[#D4AF37]/30 animate-pulse">
              <Camera className="text-[#D4AF37]" size={64} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
              {lang === 'fr' ? 'Placez l\'œuvre dans votre espace' :
               lang === 'en' ? 'Place the artwork in your space' :
               'Des liggéey bi ci sa espace'}
            </h2>
            
            <p className="text-gray-400 text-center max-w-md mb-6">
              {lang === 'fr' ? 'Activez votre caméra pour visualiser l\'œuvre en 3D dans votre environnement réel.' :
               lang === 'en' ? 'Activate your camera to visualize the artwork in 3D in your real environment.' :
               'Active camera bi ngir xool liggéey bi ci 3D ci sa environnement.'}
            </p>

            <div className="bg-gray-900 p-5 rounded-xl border border-[#D4AF37]/30 mb-8 max-w-md">
              <div className="flex items-start space-x-3">
                <Info className="text-[#D4AF37] flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-[#D4AF37] font-semibold mb-2">
                    {lang === 'fr' ? 'Modèle 3D' :
                     lang === 'en' ? '3D Model' :
                     'Modèle 3D'}
                  </p>
                  <p className="text-white font-mono text-sm mb-2">{artwork.arModel}</p>
                  <p className="text-gray-500 text-xs">
                    {lang === 'fr' ? 'Format : GLTF • ~5MB' :
                     lang === 'en' ? 'Format: GLTF • ~5MB' :
                     'Format : GLTF • ~5MB'}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={activateCamera}
              disabled={isLoading}
              className="flex items-center space-x-3 px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 shadow-lg"
            >
              <Video size={24} />
              <span>
                {isLoading
                  ? (lang === 'fr' ? 'Activation...' :
                     lang === 'en' ? 'Activating...' :
                     'Dafa daw...')
                  : (lang === 'fr' ? 'Activer la caméra' :
                     lang === 'en' ? 'Activate camera' :
                     'Active camera')}
              </span>
            </button>

           
          </div>
        ) : (
          <div 
            className="relative w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
              autoPlay
            />

            <div className="absolute inset-0">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px'
                }}
              />

              <div
                className="absolute cursor-move"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
                onMouseDown={handleMouseDown}
                onTouchMove={handleTouchMove}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title[lang]}
                  className="w-56 md:w-80 h-auto object-contain select-none"
                  style={{
                    filter: 'drop-shadow(0 15px 40px rgba(0,0,0,0.6))',
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                  }}
                  draggable={false}
                />
              </div>
            </div>

            <div className="absolute top-4 left-4 right-4 bg-black/85 px-4 py-3 rounded-lg border border-[#D4AF37]/40 backdrop-blur-sm">
              <p className="text-[#D4AF37] font-bold text-sm mb-1">
                {artwork.title[lang]}
              </p>
              <p className="text-gray-400 text-xs">
                {lang === 'fr' ? 'Glissez pour déplacer • Utilisez les contrôles pour ajuster' :
                 lang === 'en' ? 'Drag to move • Use controls to adjust' :
                 'Deplace ngir bouger • Jëfandikoo contrôle yi'}
              </p>
            </div>

            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/85 px-6 py-3 rounded-full border border-[#D4AF37]/40 backdrop-blur-sm">
              <button
                onClick={() => setRotation(r => r - 45)}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                title={lang === 'fr' ? 'Rotation' : lang === 'en' ? 'Rotation' : 'Rotation'}
              >
                <RotateCw size={24} />
              </button>
              <button
                onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                title={lang === 'fr' ? 'Zoom -' : lang === 'en' ? 'Zoom -' : 'Zoom -'}
              >
                <ZoomOut size={24} />
              </button>
              <button
                onClick={() => setScale(s => Math.min(3, s + 0.2))}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors"
                title={lang === 'fr' ? 'Zoom +' : lang === 'en' ? 'Zoom +' : 'Zoom +'}
              >
                <ZoomIn size={24} />
              </button>
              <div className="w-px h-6 bg-gray-700"></div>
              <button
                onClick={stopCamera}
                className="text-red-400 hover:text-red-300 transition-colors"
                title={lang === 'fr' ? 'Fermer' : lang === 'en' ? 'Close' : 'Tëj'}
              >
                <X size={24} />
              </button>
            </div>

            <button
              onClick={() => {
                setScale(1);
                setRotation(0);
                setPosition({ x: 50, y: 50 });
              }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] text-sm rounded-full border border-[#D4AF37]/40 backdrop-blur-sm hover:bg-[#D4AF37]/30 transition-colors"
            >
              {lang === 'fr' ? 'Réinitialiser' :
               lang === 'en' ? 'Reset' :
               'Réinitialiser'}
            </button>

            <div className="absolute top-20 right-4 bg-black/85 px-4 py-2 rounded-lg border border-[#D4AF37]/40 backdrop-blur-sm">
              <p className="text-gray-400 text-xs mb-1">
                {lang === 'fr' ? 'Échelle' :
                 lang === 'en' ? 'Scale' :
                 'Échelle'}
              </p>
              <p className="text-white font-mono text-sm">{(scale * 100).toFixed(0)}%</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 py-6 border-t border-[#D4AF37]/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            
          </div>
        </div>
      </div>
    </div>
  );
};
