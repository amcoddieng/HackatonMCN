
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Camera, X, Box, Info as InfoIcon, ArrowLeft, Smartphone } from 'lucide-react';

export const ARViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [cameraActive, setCameraActive] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  // ID de l'œuvre (depuis l'URL ou mock)
  const artworkId = id || '001';

  useEffect(() => {
    // Simuler l'activation de la caméra après un court délai
    if (cameraActive && showInstructions) {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setShowInstructions(false);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [cameraActive, showInstructions]);

  const handleStartAR = () => {
    setCameraActive(true);
    setScanProgress(0);
    // Dans un vrai cas, on demanderait l'accès à la caméra ici
    // navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  };

  const handleStopAR = () => {
    setCameraActive(false);
    setShowInstructions(true);
    setSelectedArtwork(null);
    setScanProgress(0);
  };

  const handleLoadModel = () => {
    setSelectedArtwork(artworkId);
  };

  if (!cameraActive) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-gray-800 rounded-xl p-8 border border-yellow-600/30 text-center shadow-2xl">
            <div className="w-20 h-20 bg-yellow-600/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Camera className="text-yellow-600" size={40} />
            </div>

            <h1 className="text-3xl font-bold mb-4">
              {t('arExperience') || 'Expérience AR'}
            </h1>
            <p className="text-gray-400 mb-2">
              {t('ar.subtitle') || 'Visualisez les œuvres en 3D dans votre espace'}
            </p>
            <p className="text-sm text-yellow-600 font-semibold mb-8">
              {t('ar.artworkId', { id: artworkId }) || `Œuvre #${artworkId}`}
            </p>

            {/* Aperçu de l'œuvre */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="aspect-square bg-gradient-to-br from-yellow-600/20 to-gray-800 rounded-lg flex items-center justify-center mb-3">
                <Box className="text-yellow-600" size={64} />
              </div>
              <p className="text-xs text-gray-400">
                Modèle 3D : <code className="text-yellow-600">{artworkId}.gltf</code>
              </p>
            </div>

            <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <InfoIcon className="text-blue-400 flex-shrink-0 mt-1" size={20} />
                <div className="text-left">
                  <p className="text-sm text-blue-200">
                    <strong>{t('ar.mockMode') || 'Mode Démo'}:</strong> {t('ar.mockDescription') || 'Cette simulation montre comment la vraie AR fonctionnerait avec votre caméra.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-left mb-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                  1
                </div>
                <p className="text-sm text-gray-300">
                  {t('ar.step1') || 'Autorisez l\'accès à votre caméra'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                  2
                </div>
                <p className="text-sm text-gray-300">
                  {t('ar.step2') || 'Pointez vers une surface plane (table, sol)'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                  3
                </div>
                <p className="text-sm text-gray-300">
                  {t('ar.step3') || 'Manipulez l\'œuvre en 3D dans votre espace'}
                </p>
              </div>
            </div>

            <button
              onClick={handleStartAR}
              className="w-full bg-yellow-600 text-black py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Camera size={20} />
              {t('ar.activateCamera') || 'Activer la Caméra AR'}
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="w-full mt-3 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              {t('back') || 'Retour'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Simulation du flux caméra avec vidéo */}
      <div className="absolute inset-0">
        {/* Vidéo de simulation (pièce/environnement) */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
        >
          <source src="https://storage.coverr.co/videos/HWwYn4KivPZk4A1M6VrPP5AnC3801fEDxW?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6Ijg3NjdFMzIzRjlGQzEzN0E4QTAyIiwiaWF0IjoxNjIyMDQ3MjY5fQ.0FYMb-DSTzFP9yBB3rJKdAJfvF2mQhgvvnpM7IJ9hW4" type="video/mp4" />
        </video>
        
        {/* Overlay AR */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Grille AR de détection */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative">
              {/* Cadre de détection AR */}
              <div className="w-72 h-72 border-2 border-yellow-600/50 rounded-lg relative">
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-yellow-600 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-yellow-600 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-yellow-600 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-yellow-600 rounded-br-lg" />

                {/* Point central de scan animé */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {showInstructions ? (
                    <>
                      <div className="w-20 h-20 border-4 border-yellow-600 rounded-full animate-ping" />
                      <div className="w-20 h-20 border-4 border-yellow-600 rounded-full absolute top-0 left-0 flex items-center justify-center">
                        <Box className="text-yellow-600" size={40} />
                      </div>
                    </>
                  ) : (
                    <div className="w-32 h-32 bg-yellow-600/10 backdrop-blur-sm rounded-lg border-2 border-yellow-600 flex items-center justify-center animate-bounce">
                      <Box className="text-yellow-600" size={48} />
                    </div>
                  )}
                </div>

                {/* Barre de progression du scan */}
                {showInstructions && scanProgress < 100 && (
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-gray-900/80 backdrop-blur-sm rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-yellow-600 h-full transition-all duration-300"
                        style={{ width: `${scanProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {showInstructions && (
              <div className="bg-black/80 backdrop-blur-sm px-6 py-3 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">
                  📱 {t('ar.scanning') || 'Scan de l\'environnement...'}
                </p>
                <p className="text-xs text-yellow-600">{scanProgress}%</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contrôles AR */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
        <button
          onClick={handleStopAR}
          className="bg-red-600 p-3 rounded-full hover:bg-red-500 transition-colors shadow-lg"
        >
          <X size={24} />
        </button>

        <div className="bg-black/80 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <p className="text-sm text-gray-300">{t('ar.modeActive') || 'Mode AR Actif'}</p>
        </div>
      </div>

      {/* Informations sur le modèle */}
      <div className="absolute bottom-4 left-4 right-4 z-10">
        <div className="bg-gray-900/95 backdrop-blur-md rounded-xl p-6 border border-yellow-600/30 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Box className="text-yellow-600" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">
                {t('ar.model3D') || 'Modèle 3D'}
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                {selectedArtwork ? (
                  <span className="text-green-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    ✓ {t('ar.modelLoaded', { id: artworkId }) || `${artworkId}.gltf chargé`}
                  </span>
                ) : (
                  <span className="text-yellow-400">
                    {t('ar.modelPending', { id: artworkId }) || `${artworkId}.gltf prêt`}
                  </span>
                )}
              </p>

              <div className="bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 mb-4">
                <p className="text-xs text-blue-200 flex items-start gap-2">
                  <Smartphone className="flex-shrink-0 mt-0.5" size={14} />
                  <span>
                    <strong>{t('ar.mockMode') || 'Démo'}:</strong> {t('ar.techNote', { id: artworkId }) || `En production, ${artworkId}.gltf serait affiché en AR via WebXR ou AR.js`}
                  </span>
                </p>
              </div>

              {!selectedArtwork && !showInstructions && (
                <button
                  onClick={handleLoadModel}
                  className="w-full bg-yellow-600 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2"
                >
                  <Box size={20} />
                  {t('ar.loadModel') || 'Placer l\'objet 3D'}
                </button>
              )}

              {selectedArtwork && (
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-yellow-600">
                        {t('ar.interactions') || 'Interactions:'}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-gray-700 px-2 py-2 rounded text-center">
                        👆 {t('ar.move') || 'Déplacer'}
                      </div>
                      <div className="bg-gray-700 px-2 py-2 rounded text-center">
                        🔄 {t('ar.rotate') || 'Rotation'}
                      </div>
                      <div className="bg-gray-700 px-2 py-2 rounded text-center">
                        📏 {t('ar.resize') || 'Taille'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Statistiques de l'objet 3D */}
                  <div className="bg-gray-800 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-gray-400">Polygones</p>
                        <p className="text-white font-semibold">12,450</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Taille</p>
                        <p className="text-white font-semibold">2.3 MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Instructions flottantes après détection */}
      {!showInstructions && !selectedArtwork && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-bounce">
          <div className="bg-black/80 backdrop-blur-sm px-6 py-4 rounded-lg border border-yellow-600/50 shadow-2xl">
            <p className="text-sm text-gray-300 mb-2 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {t('ar.surfaceDetected') || 'Surface détectée'} ✓
            </p>
            <p className="text-xs text-yellow-600">
              {t('ar.tapToPlace') || 'Tapez en bas pour placer l\'objet'}
            </p>
          </div>
        </div>
      )}

      {/* Indicateur de distance/échelle (quand objet placé) */}
      {selectedArtwork && (
        <div className="absolute top-1/4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-3 border border-yellow-600/30">
          <div className="text-xs space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-400">Distance:</span>
              <span className="text-yellow-600 font-semibold">1.2m</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-400">Échelle:</span>
              <span className="text-yellow-600 font-semibold">100%</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-gray-400">Éclairage:</span>
              <span className="text-green-400 font-semibold">Optimal</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};