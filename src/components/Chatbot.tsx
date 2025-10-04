

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

// Mock des réponses du chatbot
const responses = {
  bonjour: "Bonjour ! Je suis Lumina, votre guide virtuel du musée. Comment puis-je vous aider aujourd'hui ?",
  hello: "Hello! I'm Lumina, your virtual museum guide. How can I help you today?",
  salaam: "Salaam aleekum! Maa ngi Lumina, sa guide bu musée bi. Naka ma mën la dimbali?",
  
  "info pratique": "Le musée est ouvert du mardi au dimanche de 9h à 18h. Entrée : 2000 FCFA (adultes), 1000 FCFA (étudiants). Visite guidée disponible sur réservation.",
  "practical info": "The museum is open Tuesday to Sunday from 9am to 6pm. Entrance: 2000 FCFA (adults), 1000 FCFA (students). Guided tours available by reservation.",
  
  "histoire wolof": "Le Wolof est la langue la plus parlée au Sénégal. Notre collection comprend des œuvres qui racontent l'histoire des royaumes wolofs, notamment le royaume du Cayor et du Baol.",
  "wolof history": "Wolof is the most spoken language in Senegal. Our collection includes works that tell the story of Wolof kingdoms, particularly the Cayor and Baol kingdoms.",
  
  horaire: "Le musée est ouvert du mardi au dimanche de 9h à 18h. Fermé le lundi.",
  hours: "The museum is open Tuesday to Sunday from 9am to 6pm. Closed on Mondays.",
  
  tarif: "Tarifs d'entrée : Adultes 2000 FCFA, Étudiants 1000 FCFA, Enfants (-12 ans) gratuit, Groupes (10+) 1500 FCFA/personne.",
  price: "Entrance fees: Adults 2000 FCFA, Students 1000 FCFA, Children (under 12) free, Groups (10+) 1500 FCFA/person.",
  
  collection: "Notre collection comprend plus de 500 œuvres d'art africain : sculptures, masques, textiles traditionnels, instruments de musique, et objets rituels.",
  
  visite: "Vous pouvez explorer le musée de plusieurs façons : visite physique, visite virtuelle 360°, ou expérience en réalité augmentée via notre application.",
  visit: "You can explore the museum in several ways: physical visit, 360° virtual tour, or augmented reality experience via our app.",
  
  default: "Je suis désolé, je n'ai pas compris votre question. Essayez de me demander les horaires, tarifs, informations sur la collection ou l'histoire wolof."
};

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Bonjour ! Je suis Lumina 🌟, votre assistant virtuel. Posez-moi des questions sur le musée, les horaires, la collection ou l'histoire culturelle !",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase().trim();
    
    // Recherche de mots-clés dans le message
    for (const [key, value] of Object.entries(responses)) {
      if (message.includes(key)) {
        return value;
      }
    }
    
    return responses.default;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simuler un délai de réponse
    setTimeout(() => {
      const botResponse: Message = {
        text: getResponse(input),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-600 text-black rounded-full shadow-lg hover:bg-yellow-500 transition-all z-50 flex items-center justify-center"
        aria-label="Chatbot Lumina"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gray-900 border border-yellow-600 rounded-lg shadow-xl z-50 flex flex-col">
          {/* En-tête */}
          <div className="bg-yellow-600 text-black p-4 rounded-t-lg font-bold flex items-center gap-2">
            <MessageCircle size={20} />
            <span>Lumina - Assistant Virtuel</span>
          </div>

          {/* Zone de messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-yellow-600 text-black'
                      : 'bg-gray-800 text-white border border-gray-700'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Zone de saisie */}
          <div className="p-4 border-t border-yellow-600/30">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-600 text-sm"
              />
              <button
                onClick={handleSend}
                className="p-2 bg-yellow-600 text-black rounded-lg hover:bg-yellow-500 transition-colors"
                aria-label="Envoyer"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};