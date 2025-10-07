// src/pages/Home.tsx

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { QrCode, BookOpen, Globe, MessageSquare, Award, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { getUserProgress } from '../utils/localStorageHelpers';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';

export const Home = () => {
  const { t, i18n } = useTranslation();
  const { darkMode } = useTheme();
  const progress = getUserProgress();
  const lang = i18n.language as 'fr' | 'en' | 'wo';

  // Carousel data with theme-adapted images
  const carouselSlides = [
    {
      image: 'https://images.pexels.com/photos/6580700/pexels-photo-6580700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: { fr: 'Découvrez les Masques Sacrés', en: 'Discover Sacred Masks', wo: 'Gis Masque yu Njub' },
      description: { fr: 'Plongez dans les traditions ancestrales', en: 'Dive into ancestral traditions', wo: 'Dugg ci aada maam-maam' },
      link: '/catalogue'
    },
    {
      image: 'https://images.pexels.com/photos/7282818/pexels-photo-7282818.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: { fr: 'Textiles Royaux Africains', en: 'African Royal Textiles', wo: 'Textile Royal Afrique' },
      description: { fr: 'Admirez l\'art du tissage', en: 'Admire the weaving art', wo: 'Xool art bu tissage' },
      link: '/catalogue'
    },
    {
      image: 'https://images.pexels.com/photos/8612975/pexels-photo-8612975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: { fr: 'Sculptures Monumentales', en: 'Monumental Sculptures', wo: 'Sculpture yu Mag' },
      description: { fr: 'Explorez les œuvres emblématiques', en: 'Explore iconic artworks', wo: 'Gis liggéey yu rafet' },
      link: '/virtual-tour'
    },
    {
      image: 'https://images.pexels.com/photos/4587979/pexels-photo-4587979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: { fr: 'Art Contemporain', en: 'Contemporary Art', wo: 'Art Contemporain' },
      description: { fr: 'Rencontrez les artistes modernes', en: 'Meet modern artists', wo: 'Jox sa artiste leeral' },
      link: '/catalogue'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselSlides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
      {/* Carousel exceptionnel */}
      <div className="relative h-[60vh] overflow-hidden">
        {carouselSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800/70"></div>
            <div className="absolute bottom-20 left-10 md:left-20 text-white max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400 drop-shadow-lg">{slide.title[lang]}</h2>
              <p className="text-xl md:text-2xl mb-6 drop-shadow-md">{slide.description[lang]}</p>
              <Link to={slide.link} className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-500 transition-all duration-300 hover:shadow-lg">
                Explorer
              </Link>
            </div>
          </div>
        ))}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 rounded-full text-yellow-400 hover:bg-gray-700/50 transition-all duration-300">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800/50 p-2 rounded-full text-yellow-400 hover:bg-gray-700/50 transition-all duration-300">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'ur[](https://images.pexels.com/photos/6069861/pexels-photo-6069861.jpeg)',
          }}
        >
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-r from-gray-800 via-gray-800/90 to-transparent' : 'bg-gradient-to-r from-white via-white/85 to-white/70'}`}></div>
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
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold hover:shadow-lg"
              >
                <QrCode size={24} className="group-hover:scale-110 transition-transform" />
                <span>Scanner QR</span>
              </Link>
              
              <Link
                to="/catalogue"
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold hover:shadow-lg"
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
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} py-20`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Visite Virtuelle */}
            <div className={`group ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}>
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
            <div className={`group ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}>
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <MessageSquare className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
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
            <div className={`group ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-[#D4AF37]/30' : 'bg-gradient-to-br from-gray-50 to-white border-gray-200'} p-6 rounded-lg border hover:border-[#D4AF37] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}>
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
      <div className={`${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-700' : 'bg-gradient-to-b from-white to-gray-100'} py-16`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Planifier une visite */}
            <div className={`${darkMode ? 'bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/30' : 'bg-gradient-to-br from-yellow-50 to-white border-yellow-200'} p-8 rounded-lg border hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg`}>
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
            <div className={`${darkMode ? 'bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 border-[#D4AF37]/30' : 'bg-gradient-to-br from-yellow-50 to-white border-yellow-200'} p-8 rounded-lg border hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg`}>
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