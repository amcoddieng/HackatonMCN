// src/pages/ARViewPage.tsx

import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Camera, X, RotateCw, ZoomIn, ZoomOut, ArrowLeft, Video, VideoOff } from 'lucide-react';
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
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const artwork = getArtworkById(id || '');

  // Simulation d'activation de la vraie caméra
  const activateCamera = async () => {
    setIsLoading(true);
    
    try {
      // Demander l'accès à la caméra RÉELLE
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Caméra arrière sur mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setCameraActive(true);
    } catch (error) {
      console.error('Erreur accès caméra:', error);
      alert('Impossible d\'accéder à la caméra. Vérifiez les permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setCameraActive(false);
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
          <p className="text-gray-400 text-xl mb-4">Œuvre non trouvée</p>
          <Link to="/catalogue" className="text-[#D4AF37] hover:text-yellow-300">
            ← Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 border-b border-[#D4AF37]/30 py-4">
        <div className="container mx-auto px-4">
          <Link
            to={`/oeuvre/${id}`}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-2"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-[#D4AF37] mb-1">
            Réalité Augmentée
          </h1>
          <p className="text-gray-400">{artwork.title[lang]}</p>
        </div>
      </div>

      {/* Viewer AR avec VRAIE caméra */}
      <div className="relative w-full h-[75vh] bg-black overflow-hidden">
        {!cameraActive ? (
          // État initial
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-32 h-32 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-8 border-4 border-[#D4AF37]/30 animate-pulse">
              <Camera className="text-[#D4AF37]" size={64} />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
              Placez l'œuvre dans votre espace
            </h2>
            
            <p className="text-gray-400 text-center max-w-md mb-8">
              Activez votre caméra pour visualiser l'œuvre en 3D dans votre environnement réel.
              Vous pourrez la déplacer, tourner et redimensionner.
            </p>

            <div className="bg-gray-900/80 p-4 rounded-lg border border-[#D4AF37]/30 mb-6 max-w-md">
              <p className="text-sm text-gray-300 mb-2">
                <span className="text-[#D4AF37] font-semibold">Modèle 3D :</span>
              </p>
              <p className="text-white font-mono text-sm">{artwork.arModel}</p>
              <p className="text-gray-500 text-xs mt-2">Format : GLTF • ~5MB</p>
            </div>

            <button
              onClick={activateCamera}
              disabled={isLoading}
              className="flex items-center space-x-3 px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? <VideoOff size={24} /> : <Video size={24} />}
              <span>
                {isLoading ? 'Activation...' : 'Activer la caméra'}
              </span>
            </button>
          </div>
        ) : (
          // Caméra active avec overlay AR
          <div className="relative w-full h-full">
            {/* Flux vidéo RÉEL de la caméra */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              muted
            />

            {/* Overlay AR avec l'œuvre */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Grille AR pour effet réaliste */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}
              />

              {/* Œuvre en 3D simulée */}
              <div
                className="absolute pointer-events-auto cursor-move"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease-out'
                }}
                onTouchMove={(e) => {
                  const touch = e.touches[0];
                  const rect = e.currentTarget.parentElement?.getBoundingClientRect();
                  if (rect) {
                    setPosition({
                      x: ((touch.clientX - rect.left) / rect.width) * 100,
                      y: ((touch.clientY - rect.top) / rect.height) * 100
                    });
                  }
                }}
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title[lang]}
                  className="w-48 md:w-64 h-auto object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))'
                  }}
                />
              </div>
            </div>

            {/* Informations overlay */}
            <div className="absolute top-4 left-4 right-4 bg-black/80 px-4 py-3 rounded-lg border border-[#D4AF37]/30 backdrop-blur-sm">
              <p className="text-[#D4AF37] font-semibold">{artwork.title[lang]}</p>
              <p className="text-gray-400 text-sm">
                Touchez et glissez pour déplacer • Pincez pour redimensionner
              </p>
            </div>

            {/* Contrôles AR */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/80 px-6 py-3 rounded-full border border-[#D4AF37]/30 backdrop-blur-sm">
              <button
                onClick={() => setRotation(r => r - 45)}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors"
              >
                <RotateCw size={24} />
              </button>
              <button
                onClick={() => setScale(s => Math.max(0.5, s - 0.2))}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors"
              >
                <ZoomOut size={24} />
              </button>
              <button
                onClick={() => setScale(s => Math.min(3, s + 0.2))}
                className="text-gray-300 hover:text-[#D4AF37] transition-colors"
              >
                <ZoomIn size={24} />
              </button>
              <div className="w-px h-6 bg-gray-700"></div>
              <button
                onClick={stopCamera}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                setScale(1);
                setRotation(0);
                setPosition({ x: 50, y: 50 });
              }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] text-sm rounded-full border border-[#D4AF37]/30 backdrop-blur-sm"
            >
              Réinitialiser
            </button>
          </div>
        )}
      </div>
    </div>
  );
};