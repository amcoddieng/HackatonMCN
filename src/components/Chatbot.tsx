// src/components/Chatbot.tsx

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Chatbot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-600 text-black rounded-full shadow-lg hover:bg-yellow-500 transition-all z-50 flex items-center justify-center"
        aria-label="Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-900 border border-yellow-600 rounded-lg shadow-xl z-50 flex flex-col">
          <div className="bg-yellow-600 text-black p-4 rounded-t-lg font-bold">
            {t('chatbot.title')}
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-white">
            <p className="text-sm">{t('chatbot.greeting')}</p>
          </div>
          <div className="p-4 border-t border-yellow-600/30">
            <input
              type="text"
              placeholder={t('chatbot.placeholder')}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-600"
            />
          </div>
        </div>
      )}
    </>
  );
};