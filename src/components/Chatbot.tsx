// src/components/Chatbot.tsx
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';

export const Chatbot = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-600 text-black rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300 z-50 flex items-center justify-center hover:scale-110"
        aria-label="Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-80 h-96 ${darkMode ? 'bg-gray-700 border-yellow-600' : 'bg-white border-gray-300'} border rounded-lg shadow-xl z-50 flex flex-col transition-all duration-300`}>
          <div className="bg-yellow-600 text-black p-4 rounded-t-lg font-bold">
            {t('chatbot.title')}
          </div>
          <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'text-gray-100' : 'text-black'}`}>
            <p className="text-sm">{t('chatbot.greeting')}</p>
          </div>
          <div className={`p-4 border-t ${darkMode ? 'border-yellow-600/30' : 'border-gray-300'}`}>
            <input
              type="text"
              placeholder={t('chatbot.placeholder')}
              className={`w-full px-3 py-2 ${darkMode ? 'bg-gray-600 text-gray-100 border-gray-500' : 'bg-gray-100 text-black border-gray-300'} rounded-lg border focus:outline-none focus:border-yellow-600 transition-all duration-300`}
            />
          </div>
        </div>
      )}
    </>
  );
};