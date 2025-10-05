// src/pages/Home.tsx

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { QrCode, BookOpen, Globe, MessageCircle, Award, Calendar, Users } from 'lucide-react';
import { getUserProgress } from '../utils/localStorageHelpers';
import { useTheme } from '../contexts/ThemeContext';

export const Home = () => {
  const { t, i18n } = useTranslation();
  const { darkMode } = useTheme();
  const progress = getUserProgress();
  const lang = i18n.language as 'fr' | 'en' | 'wo';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6069861/pexels-photo-6069861.jpeg)',
          }}
        >
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-black via-black/90 to-transparent' : 'bg-gradient-to-r from-white via-white/85 to-white/70'}`}></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-black'} mb-6 leading-tight`}>
              {lang === 'fr' ? 'Explorez le Musée des Civilisations Noires' : 
               lang === 'en' ? 'Explore the Museum of Black Civilizations' :
               'Xool Musée des Civilisations Noires'}
            </h1>
            <p className={`text-lg sm:text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-800'} mb-8 leading-relaxed`}>
              {lang === 'fr' ? 'avec réalité augmentée, guides multilingues et expériences interactives' :
               lang === 'en' ? 'with augmented reality, multilingual guides and interactive experiences' :
               'ak réalité augmentée, guide multilingue ak expérience interactive'}
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/scan"
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
              >
                <QrCode size={24} className="group-hover:scale-110 transition-transform" />
                <span>Scanner QR</span>
              </Link>
              
              <Link
                to="/catalogue"
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
              >
                <BookOpen size={24} className="group-hover:scale-110 transition-transform" />
                <span>
                  {lang === 'fr' ? 'Parcourir le Catalogue' :
                   lang === 'en' ? 'Browse Catalogue' :
                   'Gis Catalogue'}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Section des fonctionnalités principales */}
      <div className={`${darkMode ? 'bg-black' : 'bg-white'} py-20`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Visite Virtuelle */}
            <div className={`group ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all transform hover:-translate-y-1`}>
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <Globe className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} mb-3`}>
                    {lang === 'fr' ? 'Visite Virtuelle 360°' :
                     lang === 'en' ? 'Virtual Tour 360°' :
                     'Visite Virtuelle 360°'}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} leading-relaxed mb-4`}>
                    {lang === 'fr' ? "Explorez le musée depuis n'importe où dans le monde avec notre visite virtuelle immersive." :
                     lang === 'en' ? 'Explore the museum from anywhere in the world with our immersive virtual tour.' :
                     'Xool musée ci kuy nekk ci àdduna bi ak visite virtuelle immersive.'}
                  </p>
                  <Link to="/virtual-tour" className="text-[#D4AF37] hover:text-yellow-300 font-semibold">
                    Découvrir →
                  </Link>
                </div>
              </div>
            </div>

            {/* Guide IA */}
            <div className={`group ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all transform hover:-translate-y-1`}>
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <MessageCircle className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} mb-3`}>
                    Guide IA - Lumina
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} leading-relaxed mb-4`}>
                    {lang === 'fr' ? "Posez vos questions à Lumina, notre guide IA, et découvrez l'histoire fascinante de chaque œuvre." :
                     lang === 'en' ? 'Ask Lumina, our AI guide, and discover the fascinating history of each artwork.' :
                     'Laaj Lumina, guide IA, te gis historia bu nekk ci bëpp liggéey.'}
                  </p>
                  <button className="text-[#D4AF37] hover:text-yellow-300 font-semibold">
                    Commencer →
                  </button>
                </div>
              </div>
            </div>

            {/* Progression */}
            <div className={`group ${darkMode ? 'bg-gradient-to-br from-gray-900 to-black border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all transform hover:-translate-y-1`}>
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <Award className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} mb-3`}>
                    Progression & Badges
                  </h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} leading-relaxed mb-2`}>
                    Score: {progress.score}
                  </p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} leading-relaxed mb-4`}>
                    Badges: {progress.badges.length}
                  </p>
                  <Link to="/account" className="text-[#D4AF37] hover:text-yellow-300 font-semibold">
                    Voir mes badges →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Planification et Contribution */}
      <div className={`${darkMode ? 'bg-gradient-to-b from-black to-gray-900' : 'bg-gradient-to-b from-white to-gray-100'} py-16`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Planifier une visite */}
            <div className={`${darkMode ? 'bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/30' : 'bg-gradient-to-br from-yellow-50 to-white border-yellow-200'} p-8 rounded-lg border hover:border-[#D4AF37] transition-all`}>
              <div className="flex items-center space-x-4 mb-4">
                <Calendar className="text-[#D4AF37]" size={32} />
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'}`}>
                  {lang === 'fr' ? 'Planifier une Visite' :
                   lang === 'en' ? 'Plan a Visit' :
                   'Planifier Visite'}
                </h3>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-6 leading-relaxed`}>
                {lang === 'fr' ? 'Réservez votre visite guidée et profitez d\'une expérience personnalisée au Musée des Civilisations Noires.' :
                 lang === 'en' ? 'Book your guided tour and enjoy a personalized experience at the Museum of Black Civilizations.' :
                 'Réserver visite guidée bi te am expérience personnalisée ci MCN.'}
              </p>
              <Link 
                to="/visit-planner"
                className="inline-block px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all"
              >
                Réserver maintenant
              </Link>
            </div>

            {/* Contribuer */}
            <div className={`${darkMode ? 'bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/30' : 'bg-gradient-to-br from-yellow-50 to-white border-yellow-200'} p-8 rounded-lg border hover:border-[#D4AF37] transition-all`}>
              <div className="flex items-center space-x-4 mb-4">
                <Users className="text-[#D4AF37]" size={32} />
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'}`}>
                  {lang === 'fr' ? 'Contribuer' :
                   lang === 'en' ? 'Contribute' :
                   'Jox sa Batal'}
                </h3>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-700'} mb-6 leading-relaxed`}>
                {lang === 'fr' ? 'Partagez votre témoignage, vos souvenirs ou vos connaissances sur les œuvres de notre collection.' :
                 lang === 'en' ? 'Share your testimony, memories or knowledge about the works in our collection.' :
                 'Jox sa témoignage, sa xeeti wala sa xam-xam ci liggéey yi.'}
              </p>
              <Link 
                to="/contribution"
                className="inline-block px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all"
              >
                Partager mon histoire
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière des fonctionnalités */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-yellow-600 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Une Expérience Interactive Unique
            </h2>
            <p className="text-black/80 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Scannez les QR codes, écoutez des guides audio multilingues, testez vos connaissances avec des quiz,
              et explorez nos œuvres en réalité augmentée.
            </p>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <span className="px-4 py-2 bg-black text-[#D4AF37] rounded-full font-semibold">
                Multilingue (FR/EN/Wolof)
              </span>
              <span className="px-4 py-2 bg-black text-[#D4AF37] rounded-full font-semibold">
                Réalité Augmentée
              </span>
              <span className="px-4 py-2 bg-black text-[#D4AF37] rounded-full font-semibold">
                Audio Guide
              </span>
              <span className="px-4 py-2 bg-black text-[#D4AF37] rounded-full font-semibold">
                Mode Hors Ligne (PWA)
              </span>
              <span className="px-4 py-2 bg-black text-[#D4AF37] rounded-full font-semibold">
                Gamification
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};