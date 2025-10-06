// src/pages/Scan.tsx
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserQRCodeReader } from '@zxing/library';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export const Scan = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-black'} flex items-center justify-center`}>
      <div className="text-center">
        <h1 className={`text-4xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-4`}>{t('scanArtwork', { defaultValue: "Scanner l'œuvre" })}</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>{t('scanInstructions', { defaultValue: "Dirigez votre caméra vers le QR code" })}</p>

        <div className="mt-8 w-64 h-64 border-4 border-yellow-600 rounded-lg mx-auto overflow-hidden">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline />
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};