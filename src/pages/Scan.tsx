// src/pages/Scan.tsx
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserQRCodeReader } from '@zxing/library';
import { useNavigate } from 'react-router-dom';

export const Scan = () => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserQRCodeReader();
    let active = true;

    if (videoRef.current) {
      codeReader
        .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (!active) return;

          if (result) {
            // QR code détecté, on navigue vers la page de l'œuvre
            navigate(`/oeuvre/${result.getText()}`);
            active = false;
            codeReader.reset();
          }

          if (err && !(err.name === 'NotFoundException')) {
            setError(err.message);
          }
        })
        .catch(err => setError(err.message));
    }

    return () => {
      active = false;
      codeReader.reset();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">{t('scanArtwork', 'Scanner l’œuvre')}</h1>
        <p className="text-gray-400 mb-8">{t('scanInstructions', 'Dirigez votre caméra vers le QR code')}</p>

        <div className="mt-8 w-64 h-64 border-4 border-yellow-600 rounded-lg mx-auto overflow-hidden">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};