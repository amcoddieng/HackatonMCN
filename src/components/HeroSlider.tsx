import { useState, useEffect, useRef } from "react";

interface Slide {
  image: string;
  title: string;
  subtitle: string;
}

const slides: Slide[] = [
  {
    image: "https://images.pexels.com/photos/6069861/pexels-photo-6069861.jpeg",
    title: "Explorez le Musée des Civilisations Noires",
    subtitle: "avec réalité augmentée, guides multilingues et expériences interactives",
  },
  {
    image: "https://mgnsw.org.au/wp-content/uploads/2019/11/DELMAR-190621_Macleod_054.jpg",
    title: "Découvrez l'Histoire Africaine Autrement",
    subtitle: "Des expositions immersives et des récits vivants à travers le temps.",
  },
  {
    image: "https://images.squarespace-cdn.com/content/v1/58656481bebafb87e5379856/1535635759646-BPR4KZKJM4SIEP4IV5F9/image-asset.jpeg",
    title: "Une Culture, Mille Inspirations",
    subtitle: "Vivez une expérience culturelle et sensorielle unique.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [darkMode] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour démarrer le timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // Ralenti à 8 secondes
  };

  // Défilement automatique
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    startTimer(); // Redémarre le timer
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer(); // Redémarre le timer
  };

  // Gestion du swipe tactile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  return (
    <div 
      className="relative h-[80vh] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Image avec effet zoom */}
          <div
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ${
              index === current ? "scale-110" : "scale-100"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Dégradé venant du bas */}
            <div
              className={`absolute inset-0 ${
                darkMode
                  ? "bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"
                  : "bg-gradient-to-t from-white via-white/50 to-transparent"
              }`}
            ></div>
          </div>

          {/* Texte du slide */}
          <div className="relative container mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-6 transition-all duration-700 ${
                darkMode ? "text-[#D4AF37]" : "text-black"
              }`}
            >
              {slide.title}
            </h1>
            <p
              className={`text-lg sm:text-xl md:text-2xl ${
                darkMode ? "text-gray-300" : "text-gray-800"
              } max-w-2xl`}
            >
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Flèches */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full p-3 z-20 transition-all"
        aria-label="Slide précédent"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/60 text-white rounded-full p-3 z-20 transition-all"
        aria-label="Slide suivant"
      >
        &#10095;
      </button>

      {/* Indicateurs */}
      <div className="absolute bottom-6 w-full flex justify-center space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index);
              startTimer();
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === current
                ? "bg-[#D4AF37] scale-125"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}