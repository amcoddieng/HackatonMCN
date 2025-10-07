// src/pages/Home.tsx

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Award, Calendar, Users } from 'lucide-react';
import { getUserProgress } from '../utils/localStorageHelpers';
import { useTheme } from '../contexts/ThemeContext';
import HeroSlider from '../components/HeroSlider';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export const Home = () => {
  const { i18n } = useTranslation();
  const { darkMode } = useTheme();
  const progress = getUserProgress();
  const lang = i18n.language as 'fr' | 'en' | 'wo';

  // Hooks pour animations
  const featuresSection = useScrollAnimation({ threshold: 0.15 });
  const card1 = useScrollAnimation({ threshold: 0.2 });
  const card2 = useScrollAnimation({ threshold: 0.2 });
  const card3 = useScrollAnimation({ threshold: 0.2 });
  const planningSection = useScrollAnimation({ threshold: 0.15 });
  const planCard = useScrollAnimation({ threshold: 0.2 });
  const contributeCard = useScrollAnimation({ threshold: 0.2 });
  const bannerSection = useScrollAnimation({ threshold: 0.2 });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="relative min-h-[80vh] overflow-hidden">
        <HeroSlider />
      </div>

      {/* Section des fonctionnalités principales */}
      <div
        ref={featuresSection.ref}
        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-20 transition-all duration-1000 ${
          featuresSection.isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Visite Virtuelle */}
            <div
              ref={card1.ref}
              className={`group ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all transform hover:-translate-y-1 duration-700 ${
                card1.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
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
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
                    {lang === 'fr' ? "Explorez le musée depuis n'importe où dans le monde avec notre visite virtuelle immersive." :
                     lang === 'en' ? 'Explore the museum from anywhere in the world with our immersive virtual tour.' :
                     'Xool musée ci kuy nekk ci àdduna bi ak visite virtuelle immersive.'}
                  </p>
                  <Link to="/virtual-tour" className="text-[#D4AF37] hover:text-yellow-300 font-semibold transition-colors duration-300">
                    Découvrir →
                  </Link>
                </div>
              </div>
            </div>

            {/* Guide IA */}
            <div
              ref={card2.ref}
              className={`group ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all transform hover:-translate-y-1 duration-700 ${
                card2.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <MessageCircle className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} mb-3`}>
                    Guide IA - Lumina
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
                    {lang === 'fr' ? "Posez vos questions à Lumina, notre guide IA, et découvrez l'histoire fascinante de chaque œuvre." :
                     lang === 'en' ? 'Ask Lumina, our AI guide, and discover the fascinating history of each artwork.' :
                     'Laaj Lumina, guide IA, te gis historia bu nekk ci bêpp liggéey.'}
                  </p>
                  <button className="text-[#D4AF37] hover:text-yellow-300 font-semibold transition-colors duration-300">
                    Commencer →
                  </button>
                </div>
              </div>
            </div>

            {/* Progression */}
            <div
              ref={card3.ref}
              className={`group ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all transform hover:-translate-y-1 duration-700 ${
                card3.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <Award className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
                </div>
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'} mb-3`}>
                    Progression & Badges
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-2`}>
                    Score: {progress.score}
                  </p>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed mb-4`}>
                    Badges: {progress.badges.length}
                  </p>
                  <Link to="/account" className="text-[#D4AF37] hover:text-yellow-300 font-semibold transition-colors duration-300">
                    Voir mes badges →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Planification et Contribution */}
      <div
        ref={planningSection.ref}
        className={`${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-700' : 'bg-gradient-to-b from-white to-gray-100'} py-16 transition-all duration-1000 ${
          planningSection.isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Planifier une visite */}
            <div
              ref={planCard.ref}
              className={`${darkMode ? 'bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/30' : 'bg-gradient-to-br from-yellow-50 to-white border-yellow-200'} p-8 rounded-lg border hover:border-[#D4AF37] transition-all duration-700 hover:shadow-lg ${
                planCard.isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-10'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <Calendar className="text-[#D4AF37]" size={32} />
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'}`}>
                  {lang === 'fr' ? 'Planifier une Visite' :
                   lang === 'en' ? 'Plan a Visit' :
                   'Planifier Visite'}
                </h3>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed`}>
                {lang === 'fr' ? 'Réservez votre visite guidée et profitez d\'une expérience personnalisée au Musée des Civilisations Noires.' :
                 lang === 'en' ? 'Book your guided tour and enjoy a personalized experience at the Museum of Black Civilizations.' :
                 'Réserver visite guidée bi te am expérience personnalisée ci MCN.'}
              </p>
              <Link 
                to="/visit-planner"
                className="inline-block px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 hover:shadow-lg"
              >
                Réserver maintenant
              </Link>
            </div>

            {/* Contribuer */}
            <div
              ref={contributeCard.ref}
              className={`${darkMode ? 'bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/30' : 'bg-gradient-to-br from-yellow-50 to-white border-yellow-200'} p-8 rounded-lg border hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg ${
                contributeCard.isVisible
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-10'
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <Users className="text-[#D4AF37]" size={32} />
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-[#D4AF37]' : 'text-yellow-600'}`}>
                  {lang === 'fr' ? 'Contribuer' :
                   lang === 'en' ? 'Contribute' :
                   'Jox sa Batal'}
                </h3>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-6 leading-relaxed`}>
                {lang === 'fr' ? 'Partagez votre témoignage, vos souvenirs ou vos connaissances sur les œuvres de notre collection.' :
                 lang === 'en' ? 'Share your testimony, memories or knowledge about the works in our collection.' :
                 'Jox sa témoignage, sa xeeti wala sa xam-xam ci liggéey yi.'}
              </p>
              <Link 
                to="/contribution"
                className="inline-block px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 hover:shadow-lg"
              >
                Partager mon histoire
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bannière des fonctionnalités */}
      <div
        ref={bannerSection.ref}
        className={`bg-gradient-to-r from-[#D4AF37] to-yellow-600 py-16 transition-all duration-1000 ${
          bannerSection.isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
        }`}
      >
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