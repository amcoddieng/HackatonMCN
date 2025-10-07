// src/components/Footer.tsx
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Car,
  Train,
  Info,
  X,
  Route,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

/*  Leaflet  */
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

/*  Fix des icônes par défaut de Leaflet  */
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export const Footer = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const [userLocation, setUserLocation] =
    useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState<string | null>(
    null
  );

  /*  Référence du conteneur Leaflet  */
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  /*  Coordonnées du Musée des Civilisations Noires  */
  const museumLocation = {
    lat: 14.6928,
    lng: -17.4467,
    address: 'Route de la Corniche Ouest, Dakar, Sénégal',
    phone: '+221 33 832 03 00',
    email: 'contact@mcn.sn',
    website: 'https://mcn.gouv.sn',
    openingHours: 'Mardi-Dimanche: 9h00-17h00 (Fermé le lundi)',
  };

  /*  Calcul de la distance  */
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(userPos);

          const R = 6371;
          const dLat = (museumLocation.lat - userPos.lat) * Math.PI / 180;
          const dLng = (museumLocation.lng - userPos.lng) * Math.PI / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(userPos.lat * Math.PI / 180) *
              Math.cos(museumLocation.lat * Math.PI / 180) *
              Math.sin(dLng / 2) *
              Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          setDistance((R * c).toFixed(1));
        },
        (err) => console.log('Erreur géolocalisation :', err)
      );
    }
  }, []);

  /*  Initialisation Leaflet  */
  useEffect(() => {
    if (!showInteractiveMap || !mapContainerRef.current) return;

    /*  Création de la carte  */
    mapInstanceRef.current = L.map(mapContainerRef.current, {
      center: [museumLocation.lat, museumLocation.lng],
      zoom: 15,
    });

    /*  Tuiles OpenStreetMap (gratuites)  */
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current);

    /*  Marqueur doré du musée  */
    const goldIcon = new L.Icon({
      iconUrl,
      iconRetinaUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
      className: 'museum-marker',
    });
    const markerElement = document.querySelector('.museum-marker') as HTMLElement | null;
    if (markerElement) {
      markerElement.style.filter = 'hue-rotate(45deg) saturate(2)'; // teinte dorée
    }

    L.marker([museumLocation.lat, museumLocation.lng], { icon: goldIcon })
      .addTo(mapInstanceRef.current)
      .bindPopup(
        `<b style="color:#D4AF37">Musée des Civilisations Noires</b><br/>${museumLocation.address}`
      );

    /*  Nettoyage  */
    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [showInteractiveMap]);

  const transportOptions = [
    { id: 'bus', name: 'Bus Ligne 1', icon: Train, details: 'Arrêt MCN', color: 'text-blue-400' },
    { id: 'taxi', name: 'Taxi Brousse', icon: Car, details: 'Destination Corniche', color: 'text-green-400' },
    { id: 'parking', name: 'Parking', icon: MapPin, details: 'Gratuit sur place', color: 'text-green-400' },
  ];

  return (
    <footer
      className={`
        ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-200'}
        border-t relative overflow-hidden transition-colors duration-300
      `}
    >
      {/*  Effets lumineux  */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-16">
        {/*  Titre  */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-[#D4AF37] mb-4"
          >
            {t('footer.findUs', 'Retrouvez-nous')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-lg ${darkMode ? 'text-gray-100' : 'text-gray-700'} mb-8`}
          >
            {t('footer.location', 'Musée des Civilisations Noires - Dakar, Sénégal')}
          </motion.p>
        </div>

        {/*  Section Navigation Horizontale  */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div
            className={`
              ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}
              backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:shadow-lg
            `}
          >
            <h3
              className={`
                text-3xl font-bold mb-8 flex items-center justify-center
                ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
              `}
            >
              <Navigation className="mr-4" size={32} />
              {t('footer.navigation', 'Navigation')}
            </h3>

            {/*  Carte Leaflet  */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-xl overflow-hidden bg-gray-600">
                {!showInteractiveMap ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-16 h-16 text-[#D4AF37] mx-auto mb-4" />
                      <p
                        className={`
                          text-lg mb-4
                          ${darkMode ? 'text-gray-100' : 'text-gray-200'}
                        `}
                      >
                        Carte statique - Cliquez pour interactiver
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowInteractiveMap(true)}
                        className="
                          px-6 py-3 bg-[#D4AF37] text-black rounded-lg
                          hover:bg-yellow-500 transition-all duration-300 font-semibold
                        "
                      >
                        Activer la Carte Interactive
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <div
                    ref={mapContainerRef}
                    className="h-full w-full rounded-xl"
                  />
                )}
              </div>

              {/*  Boutons  */}
              <div className="absolute top-4 right-4 flex flex-col space-y-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (userLocation)
                      window.open(
                        `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${museumLocation.lat},${museumLocation.lng}`,
                        '_blank'
                      );
                  }}
                  className={`
                    p-3 rounded-lg transition-all duration-300 shadow-lg backdrop-blur-sm
                    ${darkMode
                      ? 'bg-gray-700 text-[#D4AF37] hover:bg-gray-600'
                      : 'bg-white text-[#D4AF37] hover:bg-gray-100'
                    }
                  `}
                  title="Itinéraire depuis ma position"
                >
                  <Route size={20} />
                </motion.button>

                {userLocation && distance && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`
                      ${darkMode
                        ? 'bg-green-900/30 border-green-500/30'
                        : 'bg-green-100 border-green-300'
                      }
                      border rounded-lg p-3 backdrop-blur-sm
                    `}
                  >
                    <p
                      className={`
                        text-sm
                        ${darkMode ? 'text-green-300' : 'text-green-700'}
                      `}
                    >
                      <span className="font-bold">{distance} km</span> du musée
                    </p>
                  </motion.div>
                )}
              </div>
            </div>

            {/*  Informations contact  */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: MapPin, text: museumLocation.address, label: 'Adresse' },
                { icon: Phone, text: museumLocation.phone, label: 'Téléphone', href: `tel:${museumLocation.phone}` },
                { icon: Mail, text: museumLocation.email, label: 'Email', href: `mailto:${museumLocation.email}` },
                { icon: Clock, text: museumLocation.openingHours, label: 'Horaires' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <item.icon
                    className="text-[#D4AF37] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p
                      className={`
                        text-xs mb-1
                        ${darkMode ? 'text-gray-300' : 'text-gray-600'}
                      `}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={`
                          hover:text-[#D4AF37] transition-colors text-sm
                          ${darkMode ? 'text-gray-100' : 'text-gray-700'}
                        `}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p
                        className={`
                          text-sm
                          ${darkMode ? 'text-gray-100' : 'text-gray-700'}
                        `}
                      >
                        {item.text}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/*  Sections Infos Verticales  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/*  Informations Pratiques  */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`
              ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}
              backdrop-blur-sm rounded-2xl p-6 border h-full transition-all duration-300 hover:shadow-lg
            `}
          >
            <h3
              className={`
                text-2xl font-bold mb-6 flex items-center
                ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
              `}
            >
              <Info className="mr-3" size={24} />
              {t('footer.info', 'Informations pratiques')}
            </h3>

            <div className="space-y-6">
              <div>
                <h4
                  className={`
                    text-lg font-semibold mb-3 flex items-center
                    ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
                  `}
                >
                  <Clock className="mr-2" size={18} />
                  Horaires
                </h4>
                <motion.div
                  className={`
                    space-y-2 text-sm
                    ${darkMode ? 'text-gray-100' : 'text-gray-700'}
                  `}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                >
                  {[
                    'Mardi - Vendredi: 9h00 - 17h00',
                    'Samedi - Dimanche: 10h00 - 18h00',
                    'Fermé le lundi',
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div>
                <h4
                  className={`
                    text-lg font-semibold mb-3
                    ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
                  `}
                >
                  Tarifs
                </h4>
                <motion.div
                  className={`
                    space-y-2 text-sm
                    ${darkMode ? 'text-gray-100' : 'text-gray-700'}
                  `}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1 },
                    },
                  }}
                >
                  {[
                    { label: 'Adultes', price: '5.000 FCFA' },
                    { label: 'Étudiants', price: '3.000 FCFA' },
                    { label: 'Enfants (-12 ans)', price: 'Gratuit' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="flex justify-between items-center"
                    >
                      <span>{item.label}</span>
                      <span className="text-[#D4AF37] font-semibold">
                        {item.price}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/*  Transports  */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className={`
              ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}
              backdrop-blur-sm rounded-2xl p-6 border h-full transition-all duration-300 hover:shadow-lg
            `}
          >
            <h3
              className={`
                text-2xl font-bold mb-6 flex items-center
                ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
              `}
            >
              <Train className="mr-3" size={24} />
              {t('footer.transport', 'Transports')}
            </h3>

            <div className="space-y-4">
              {transportOptions.map((transport, index) => {
                const IconComponent = transport.icon;
                return (
                  <motion.div
                    key={transport.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() =>
                      setSelectedTransport(
                        selectedTransport === transport.id ? null : transport.id
                      )
                    }
                    className={`
                      flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-300
                      ${
                        selectedTransport === transport.id
                          ? 'bg-[#D4AF37]/20 border border-[#D4AF37]/30'
                          : `${
                              darkMode
                                ? 'bg-gray-700 hover:bg-gray-600'
                                : 'bg-white hover:bg-gray-50'
                            }`
                      }
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent
                        className={`${transport.color}`}
                        size={20}
                      />
                      <span
                        className={`
                          font-medium
                          ${darkMode ? 'text-gray-100' : 'text-gray-800'}
                        `}
                      >
                        {transport.name}
                      </span>
                    </div>
                    <span
                      className={`text-sm ${transport.color} font-semibold`}
                    >
                      {transport.details}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/*  Détails du transport sélectionné  */}
            <AnimatePresence>
              {selectedTransport && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20 transition-all duration-300"
                >
                  <p
                    className={`
                      text-sm
                      ${darkMode ? 'text-gray-100' : 'text-gray-700'}
                    `}
                  >
                    {selectedTransport === 'bus' &&
                      'Bus fréquent toutes les 15 minutes en semaine'}
                    {selectedTransport === 'taxi' &&
                      'Taxis disponibles 24h/24, 7j/7'}
                    {selectedTransport === 'parking' &&
                      'Parking sécurisé avec gardien'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/*  Footer classique  */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="relative border-t border-gray-600/50 pt-12 mt-16" // Gris léger
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3
                className={`
                  font-semibold mb-4 text-lg
                  ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
                `}
              >
                À propos
              </h3>
              <p
                className={`
                  text-sm leading-relaxed
                  ${darkMode ? 'text-gray-300' : 'text-gray-600'}
                `}
              >
                {t('footer.about', 'Musée des Civilisations Noires')}
                <br />
                {t('footer.location', 'Dakar, Sénégal')}
              </p>
            </div>
            <div>
              <h3
                className={`
                  font-semibold mb-4 text-lg
                  ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
                `}
              >
                Contact
              </h3>
              <div className="space-y-2">
                <a
                  href="mailto:contact@mcn.sn"
                  className={`
                    flex items-center space-x-2 text-sm hover:text-[#D4AF37] transition-colors
                    ${darkMode ? 'text-gray-300' : 'text-gray-600'}
                  `}
                >
                  <Mail size={16} />
                  <span>contact@mcn.sn</span>
                </a>
                <a
                  href="tel:+221338320300"
                  className={`
                    flex items-center space-x-2 text-sm hover:text-[#D4AF37] transition-colors
                    ${darkMode ? 'text-gray-300' : 'text-gray-600'}
                  `}
                >
                  <Phone size={16} />
                  <span>+221 33 832 03 00</span>
                </a>
              </div>
            </div>
            <div>
              <h3
                className={`
                  font-semibold mb-4 text-lg
                  ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
                `}
              >
                Suivez-nous
              </h3>
              <p
                className={`
                  text-sm
                  ${darkMode ? 'text-gray-300' : 'text-gray-600'}
                `}
              >
                © 2024 Light Of Africa
                <br />
                {t('footer.rights', 'Tous droits réservés')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/*  Bouton retour en haut  */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="
          fixed bottom-8 right-8 p-3 bg-[#D4AF37] text-black rounded-full
          shadow-2xl hover:bg-yellow-500 transition-all duration-300 z-50
        "
        aria-label="Retour en haut"
      >
        ↑
      </motion.button>

      {/*  Modal plein écran Leaflet  */}
      <AnimatePresence>
        {showInteractiveMap && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInteractiveMap(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`
                ${darkMode ? 'bg-gray-700' : 'bg-white'}
                rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-hidden
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`
                    text-2xl font-bold
                    ${darkMode ? 'text-[#D4AF37]' : 'text-[#D4AF37]'}
                  `}
                >
                  Carte Interactive
                </h3>
                <button
                  onClick={() => setShowInteractiveMap(false)}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}
                  `}
                >
                  <X
                    size={24}
                    className={darkMode ? 'text-gray-100' : 'text-gray-700'}
                  />
                </button>
              </div>
              <div
                ref={mapContainerRef}
                className="h-[70vh] w-full rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};