// src/pages/Home.tsx

import { useTranslation } from 'react-i18next';
import { QrCode, BookOpen, Globe, MessageCircle, Award } from 'lucide-react';
import { getUserProgress } from '../utils/localStorageHelpers';

export const Home = () => {
  const { t, i18n } = useTranslation();
  const progress = getUserProgress();
  const lang = i18n.language as 'fr' | 'en' | 'wo';

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/6069861/pexels-photo-6069861.jpeg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-6 leading-tight">
              {lang === 'fr' ? 'Explorez le Musée des Civilisations Noires' : 
               lang === 'en' ? 'Explore the Museum of Black Civilizations' :
               'Xool Musée des Civilisations Noires'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {lang === 'fr' ? 'avec réalité augmentée, guides multilingues et expériences interactives' :
               lang === 'en' ? 'with augmented reality, multilingual guides and interactive experiences' :
               'ak réalité augmentée, guide multilingue ak expérience interactive'}
            </p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              <a href="/scan"
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
              >
                <QrCode size={24} className="group-hover:scale-110 transition-transform" />
                <span>Scanner QR</span>
              </a>
              
              <a  href="/catalogue"
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
              >
                <BookOpen size={24} className="group-hover:scale-110 transition-transform" />
                <span>
                  {lang === 'fr' ? 'Parcourir le Catalogue' :
                   lang === 'en' ? 'Browse Catalogue' :
                   'Gis Catalogue'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section des fonctionnalités */}
      <div className="bg-black py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Visite Virtuelle */}
            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <Globe className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-3">
                    {lang === 'fr' ? 'Visite Virtuelle 360°' :
                     lang === 'en' ? 'Virtual Tour 360°' :
                     'Visite Virtuelle 360°'}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {lang === 'fr' ? "Explorez le musée depuis n'importe où dans le monde avec notre visite virtuelle immersive en 390°." :
                     lang === 'en' ? 'Explore the museum from anywhere in the world with our immersive 390° virtual tour.' :
                     'Xool musée ci kuy nekk ci àdduna bi ak visite virtuelle immersive 390°.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Guide IA */}
            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <MessageCircle className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-3">
                    Guide IA - Lumina
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {lang === 'fr' ? 'Posez vos questions à Lumina, notre guide IA, et découvrez l\'histoire fascinante de chaque œuvre.' :
                     lang === 'en' ? 'Ask Lumina, our AI guide, and discover the fascinating history of each artwork.' :
                     'Laaj Lumina, guide IA, te gis historia bu nekk ci bëpp liggéey.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Progression */}
            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-full bg-transparent border-2 border-[#D4AF37] flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-all duration-300">
                  <Award className="text-[#D4AF37] group-hover:text-black transition-colors" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#D4AF37] mb-3">
                    Progression & Badges
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-2">
                    Score: [ {progress.score} ]
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    Badges: [ {progress.badges.length} ]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};