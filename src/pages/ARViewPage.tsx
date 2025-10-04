// src/pages/ARViewPage.tsx

import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Camera, X, Maximize2, RotateCw, ZoomIn, ArrowLeft, Info } from 'lucide-react';
import { getArtworkById } from '../data/data';

export const ARViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language as 'fr' | 'en' | 'wo') || 'fr';

  const [cameraActive, setCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const artwork = getArtworkById(id || '');

  const activateCamera = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCameraActive(true);
      setIsLoading(false);
    }, 1500);
  };

  const stopCamera = () => {
    setCameraActive(false);
  };

  if (!artwork) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-xl mb-4">
            {lang === 'fr' ? 'Œuvre non trouvée' :
              lang === 'en' ? 'Artwork not found' :
                'Liggéey gisul'}
          </p>
          <Link
            to="/catalogue"
            className="text-[#D4AF37] hover:text-yellow-300 font-semibold"
          >
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
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-900 border-b border-[#D4AF37]/30 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <Link
            to={`/oeuvre/${id}`}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-[#D4AF37] transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>
              {lang === 'fr' ? 'Retour aux détails' :
                lang === 'en' ? 'Back to details' :
                  'Dellu ci détails'}
            </span>
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-[#D4AF37] mb-2">
            {lang === 'fr' ? 'Réalité Augmentée' :
              lang === 'en' ? 'Augmented Reality' :
                'Réalité Augmentée'}
          </h1>
          <p className="text-gray-400 text-lg">
            {artwork.title[lang]}
          </p>
        </div>
      </div>

      {/* Viewer AR */}
      <div className="relative w-full h-[70vh] bg-gradient-to-b from-gray-900 to-black">
        {!cameraActive ? (
          <div className="flex flex-col items-center justify-center h-full px-4">
            <div className="w-32 h-32 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-8 border-4 border-[#D4AF37]/30">
              <Camera className="text-[#D4AF37]" size={64} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
              {lang === 'fr' ? 'Visualisez l\'œuvre en 3D' :
                lang === 'en' ? 'Visualize the artwork in 3D' :
                  'Xool liggéey bi ci 3D'}
            </h2>

            <p className="text-gray-400 text-center max-w-md mb-8">
              {lang === 'fr' ? 'Activez votre caméra pour placer l\'œuvre dans votre environnement réel et l\'explorer sous tous les angles.' :
                lang === 'en' ? 'Activate your camera to place the artwork in your real environment and explore it from all angles.' :
                  'Active camera bi ngir des liggéey ci sa environnement te xool ci bëpp yoon.'}
            </p>

            <button
              onClick={activateCamera}
              disabled={isLoading}
              className="flex items-center space-x-3 px-8 py-4 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera size={24} />
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

            {/* Informations techniques */}
            <div className="mt-12 bg-gray-900/50 p-6 rounded-lg border border-[#D4AF37]/20 max-w-md">
              <div className="flex items-start space-x-3 mb-4">
                <Info className="text-[#D4AF37] flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-[#D4AF37] font-semibold mb-2">
                    {lang === 'fr' ? 'Modèle 3D' :
                      lang === 'en' ? '3D Model' :
                        'Modèle 3D'}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    <span className="text-white font-mono">{artwork.arModel}</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    {lang === 'fr' ? 'Format : GLTF/GLB • Taille : ~5MB' :
                      lang === 'en' ? 'Format: GLTF/GLB • Size: ~5MB' :
                        'Format : GLTF/GLB • Taille : ~5MB'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full bg-black">
            {/* Simulation de la caméra avec overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/60" />
            {/* Grille AR */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(212, 175, 55, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(212, 175, 55, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
            {/* Cadre de détection */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 border-4 border-[#D4AF37] rounded-lg">
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-[#D4AF37]"></div>
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-[#D4AF37]"></div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-[#D4AF37]"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-[#D4AF37]"></div>
                {/* Modèle 3D simulé */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse">
                    <img
                      src={artwork.imageUrl}
                      alt={artwork.title[lang]}
                      className="w-48 h-48 object-contain filter drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Informations overlay */}
            <div className="absolute top-6 left-6 right-6">
              <div className="bg-black/80 px-4 py-3 rounded-lg border border-[#D4AF37]/30 backdrop-blur-sm">
                <p className="text-[#D4AF37] font-semibold mb-1">
                  {artwork.title[lang]}
                </p>
                <p className="text-gray-400 text-sm">
                  {lang === 'fr' ? '📐 Chargement du modèle 3D :' :
                    lang === 'en' ? '📐 Loading 3D model:' :
                      '📐 Chargement modèle 3D :'} <span className="text-white font-mono">{artwork.arModel}</span>
                </p>
              </div>
            </div>
            {/* Contrôles AR */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/80 px-6 py-3 rounded-full border border-[#D4AF37]/30 backdrop-blur-sm">
              <button className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Rotate">
                <RotateCw size={24} />
              </button>
              <button className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Zoom">
                <ZoomIn size={24} />
              </button>
              <button className="text-gray-300 hover:text-[#D4AF37] transition-colors" aria-label="Maximize">
                <Maximize2 size={24} />
              </button>
              <div className="w-px h-6 bg-gray-700"></div>
              <button
                onClick={stopCamera}
                className="text-red-400 hover:text-red-300 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>
            {/* Instructions */}
            <div className="absolute top-1/2 left-6 transform -translate-y-1/2 bg-black/80 px-4 py-3 rounded-lg border border-[#D4AF37]/30 backdrop-blur-sm max-w-xs">
              <p className="text-gray-300 text-sm mb-2">
                {lang === 'fr' ? '💡 Instructions :' :
                  lang === 'en' ? '💡 Instructions:' :
                    '💡 Instructions :'}
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>• {lang === 'fr' ? 'Pointez vers une surface plane' : lang === 'en' ? 'Point at a flat surface' : 'Point ci surface plane'}</li>
                <li>• {lang === 'fr' ? 'Touchez pour placer' : lang === 'en' ? 'Tap to place' : 'Touch ngir des'}</li>
                <li>• {lang === 'fr' ? 'Pincez pour zoomer' : lang === 'en' ? 'Pinch to zoom' : 'Pinch ngir zoom'}</li>
                <li>• {lang === 'fr' ? 'Glissez pour tourner' : lang === 'en' ? 'Swipe to rotate' : 'Swipe ngir tourner'}</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Informations complémentaires */}
      <div className="bg-black py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Compatibilité */}
            <div className="bg-gray-900 p-6 rounded-lg border border-[#D4AF37]/20">
              <h3 className="text-[#D4AF37] font-semibold mb-3">
                {lang === 'fr' ? 'Compatibilité' :
                  lang === 'en' ? 'Compatibility' :
                    'Compatibilité'}
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>✅ iOS 12+ (ARKit)</li>
                <li>✅ Android 7+ (ARCore)</li>
                <li>✅ {lang === 'fr' ? 'Navigateurs WebXR' : lang === 'en' ? 'WebXR browsers' : 'Navigateur WebXR'}</li>
              </ul>
            </div>
            {/* Fonctionnalités */}
            <div className="bg-gray-900 p-6 rounded-lg border border-[#D4AF37]/20">
              <h3 className="text-[#D4AF37] font-semibold mb-3">
                {lang === 'fr' ? 'Fonctionnalités' :
                  lang === 'en' ? 'Features' :
                    'Fonctionnalités'}
              </h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>🔄 {lang === 'fr' ? 'Rotation 360°' : lang === 'en' ? '360° Rotation' : 'Rotation 360°'}</li>
                <li>📏 {lang === 'fr' ? 'Échelle réaliste' : lang === 'en' ? 'Realistic scale' : 'Échelle réaliste'}</li>
                <li>💡 {lang === 'fr' ? 'Éclairage dynamique' : lang === 'en' ? 'Dynamic lighting' : 'Éclairage dynamique'}</li>
              </ul>
            </div>
            {/* Aide */}
            <div className="bg-gray-900 p-6 rounded-lg border border-[#D4AF37]/20">
              <h3 className="text-[#D4AF37] font-semibold mb-3">
                {lang === 'fr' ? 'Besoin d\'aide ?' :
                  lang === 'en' ? 'Need help?' :
                    'Soxla ?'}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {lang === 'fr' ? 'Contactez notre équipe si vous rencontrez des difficultés.' :
                  lang === 'en' ? 'Contact our team if you encounter difficulties.' :
                    'Jokkoo ak équipe bi bu am problème.'}
              </p>
              <a
                href="mailto:support@mcn.sn"
                className="text-[#D4AF37] hover:text-yellow-300 text-sm font-semibold"
              >
                support@mcn.sn →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};