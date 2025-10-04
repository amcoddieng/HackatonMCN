// src/utils/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  fr: {
    translation: {
      // Navigation & Header
      welcome: 'Bienvenue au Musée des Civilisations Noires',
      subtitle: 'Explorez l\'histoire et la culture africaines',
      home: 'Accueil',
      catalogue: 'Catalogue',
      virtualTour: 'Visite 360°',
      account: 'Mon Compte',
      admin: 'Administration',
      language: 'Langue',
      theme: 'Thème',
      lightMode: 'Mode Jour',
      darkMode: 'Mode Nuit',
      
      // Actions principales
      scanQR: 'Scanner un QR Code',
      browseCatalogue: 'Explorer le Catalogue',
      virtualVisit: 'Visite Virtuelle',
      chat: 'Visite Guidée IA',
      planVisit: 'Planifier une Visite',
      contribute: 'Contribuer',
      
      // Catalogue
      'catalogue.title': 'Catalogue des Œuvres',
      search: 'Rechercher une œuvre...',
      filter: 'Filtrer par catégorie',
      allCategories: 'Toutes les catégories',
      noResults: 'Aucune œuvre trouvée',
      artworksFound: 'œuvre(s) trouvée(s)',
      
      // Détails d'œuvre
      artworkDetails: 'Détails de l\'Œuvre',
      description: 'Description',
      history: 'Histoire',
      media: 'Médias',
      culturalSignificance: 'Signification Culturelle',
      audioGuide: 'Guide Audio',
      videoPresentation: 'Présentation Vidéo',
      arExperience: 'Expérience AR',
      takeQuiz: 'Testez vos connaissances',
      period: 'Période',
      origin: 'Origine',
      category: 'Catégorie',
      
      // Actions médias
      play: 'Écouter',
      pause: 'Pause',
      stop: 'Arrêter',
      watch: 'Regarder',
      viewInAR: 'Voir en Réalité Augmentée',
      listen: 'Écouter la description',
      
      // Scanner QR
      scanArtwork: 'Scanner une Œuvre',
      scanInstructions: 'Positionnez le QR code dans le cadre',
      scanSuccess: 'QR Code scanné avec succès!',
      scanError: 'Erreur lors du scan. Réessayez.',
      
      // Quiz
      quiz: 'Quiz',
      question: 'Question',
      submit: 'Valider',
      next: 'Suivant',
      correct: 'Bonne réponse!',
      incorrect: 'Réponse incorrecte. Essayez encore!',
      yourScore: 'Votre score',
      finalScore: 'Score final',
      quizCompleted: 'Quiz terminé!',
      tryAgain: 'Réessayer',
      
      // Badges
      badges: 'Badges',
      noBadges: 'Aucun badge gagné pour le moment',
      badgeEarned: 'Badge gagné!',
      
      // Chatbot Lumina
      'chatbot.greeting': 'Bonjour! Je suis Lumina, votre guide virtuel du MCN. Comment puis-je vous aider?',
      'chatbot.placeholder': 'Posez une question...',
      'chatbot.send': 'Envoyer',
      'chatbot.title': 'Lumina - Guide IA',
      
      // Communauté & Contributions
      'community.title': 'Communauté',
      'community.contribute': 'Partagez votre témoignage',
      'community.name': 'Votre nom',
      'community.email': 'Votre email',
      'community.message': 'Votre message',
      'community.submit': 'Envoyer',
      'community.success': 'Merci pour votre contribution!',
      'community.error': 'Erreur lors de l\'envoi. Réessayez.',
      
      // Réservations
      'reservation.title': 'Planifier une Visite',
      'reservation.date': 'Date de visite',
      'reservation.groupSize': 'Nombre de personnes',
      'reservation.submit': 'Réserver',
      'reservation.success': 'Réservation confirmée!',
      'reservation.error': 'Erreur lors de la réservation.',
      
      // Authentification
      'auth.login': 'Connexion',
      'auth.logout': 'Déconnexion',
      'auth.email': 'Email',
      'auth.password': 'Mot de passe',
      'auth.name': 'Nom complet',
      'auth.signup': 'S\'inscrire',
      'auth.alreadyAccount': 'Déjà un compte?',
      'auth.noAccount': 'Pas de compte?',
      'auth.success': 'Connexion réussie!',
      'auth.error': 'Identifiants incorrects.',
      
      // Compte utilisateur
      'account.title': 'Mon Compte',
      'account.progress': 'Ma Progression',
      'account.badges': 'Mes Badges',
      'account.score': 'Score total',
      'account.quizzes': 'Quiz complétés',
      'account.notConnected': 'Non connecté',
      'account.loginRequired': 'Veuillez vous connecter',
      
      // Admin Dashboard
      'admin.title': 'Tableau de Bord Administrateur',
      'admin.stats': 'Statistiques',
      'admin.visitors': 'Visiteurs uniques',
      'admin.scans': 'Scans QR',
      'admin.quizzes': 'Quiz complétés',
      'admin.contributions': 'Contributions',
      'admin.reservations': 'Réservations',
      'admin.recent': 'Activité récente',
      'admin.accessDenied': 'Accès refusé. Connexion admin requise.',
      
      // Footer
      'footer.about': 'À propos du MCN',
      'footer.contact': 'Contact',
      'footer.visit': 'Planifier une visite',
      'footer.social': 'Suivez-nous',
      'footer.rights': 'Tous droits réservés',
      
      // Messages généraux
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      success: 'Succès!',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      back: 'Retour',
      close: 'Fermer',
      save: 'Enregistrer',
    },
  },
  en: {
    translation: {
      // Navigation & Header
      welcome: 'Welcome to the Museum of Black Civilizations',
      subtitle: 'Explore African history and culture',
      home: 'Home',
      catalogue: 'Catalogue',
      virtualTour: 'Virtual Tour 360°',
      account: 'My Account',
      admin: 'Administration',
      language: 'Language',
      theme: 'Theme',
      lightMode: 'Light Mode',
      darkMode: 'Dark Mode',
      
      // Main actions
      scanQR: 'Scan QR Code',
      browseCatalogue: 'Browse Catalogue',
      virtualVisit: 'Virtual Visit',
      chat: 'AI Guided Tour',
      planVisit: 'Plan a Visit',
      contribute: 'Contribute',
      
      // Catalogue
      'catalogue.title': 'Artwork Catalogue',
      search: 'Search for an artwork...',
      filter: 'Filter by category',
      allCategories: 'All categories',
      noResults: 'No artworks found',
      artworksFound: 'artwork(s) found',
      
      // Artwork details
      artworkDetails: 'Artwork Details',
      description: 'Description',
      history: 'History',
      media: 'Media',
      culturalSignificance: 'Cultural Significance',
      audioGuide: 'Audio Guide',
      videoPresentation: 'Video Presentation',
      arExperience: 'AR Experience',
      takeQuiz: 'Test Your Knowledge',
      period: 'Period',
      origin: 'Origin',
      category: 'Category',
      
      // Media actions
      play: 'Play',
      pause: 'Pause',
      stop: 'Stop',
      watch: 'Watch',
      viewInAR: 'View in Augmented Reality',
      listen: 'Listen to description',
      
      // QR Scanner
      scanArtwork: 'Scan an Artwork',
      scanInstructions: 'Position the QR code within the frame',
      scanSuccess: 'QR Code scanned successfully!',
      scanError: 'Scan error. Please try again.',
      
      // Quiz
      quiz: 'Quiz',
      question: 'Question',
      submit: 'Submit',
      next: 'Next',
      correct: 'Correct answer!',
      incorrect: 'Incorrect answer. Try again!',
      yourScore: 'Your score',
      finalScore: 'Final score',
      quizCompleted: 'Quiz completed!',
      tryAgain: 'Try again',
      
      // Badges
      badges: 'Badges',
      noBadges: 'No badges earned yet',
      badgeEarned: 'Badge earned!',
      
      // Chatbot Lumina
      'chatbot.greeting': 'Hello! I\'m Lumina, your MCN virtual guide. How can I help you?',
      'chatbot.placeholder': 'Ask a question...',
      'chatbot.send': 'Send',
      'chatbot.title': 'Lumina - AI Guide',
      
      // Community & Contributions
      'community.title': 'Community',
      'community.contribute': 'Share your testimony',
      'community.name': 'Your name',
      'community.email': 'Your email',
      'community.message': 'Your message',
      'community.submit': 'Send',
      'community.success': 'Thank you for your contribution!',
      'community.error': 'Error sending. Please try again.',
      
      // Reservations
      'reservation.title': 'Plan a Visit',
      'reservation.date': 'Visit date',
      'reservation.groupSize': 'Number of people',
      'reservation.submit': 'Book',
      'reservation.success': 'Reservation confirmed!',
      'reservation.error': 'Reservation error.',
      
      // Authentication
      'auth.login': 'Login',
      'auth.logout': 'Logout',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.name': 'Full name',
      'auth.signup': 'Sign up',
      'auth.alreadyAccount': 'Already have an account?',
      'auth.noAccount': 'No account?',
      'auth.success': 'Login successful!',
      'auth.error': 'Incorrect credentials.',
      
      // User account
      'account.title': 'My Account',
      'account.progress': 'My Progress',
      'account.badges': 'My Badges',
      'account.score': 'Total score',
      'account.quizzes': 'Quizzes completed',
      'account.notConnected': 'Not connected',
      'account.loginRequired': 'Please log in',
      
      // Admin Dashboard
      'admin.title': 'Administrator Dashboard',
      'admin.stats': 'Statistics',
      'admin.visitors': 'Unique visitors',
      'admin.scans': 'QR scans',
      'admin.quizzes': 'Quizzes completed',
      'admin.contributions': 'Contributions',
      'admin.reservations': 'Reservations',
      'admin.recent': 'Recent activity',
      'admin.accessDenied': 'Access denied. Admin login required.',
      
      // Footer
      'footer.about': 'About MCN',
      'footer.contact': 'Contact',
      'footer.visit': 'Plan a visit',
      'footer.social': 'Follow us',
      'footer.rights': 'All rights reserved',
      
      // General messages
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success!',
      cancel: 'Cancel',
      confirm: 'Confirm',
      back: 'Back',
      close: 'Close',
      save: 'Save',
    },
  },
  wo: {
    translation: {
      // Navigation & Header
      welcome: 'Dalal Jammaa ci Musée des Civilisations Noires',
      subtitle: 'Xool historia ak culture Afrique',
      home: 'Kër',
      catalogue: 'Catalogue',
      virtualTour: 'Visite 360°',
      account: 'Sama Compte',
      admin: 'Administration',
      language: 'Làkk',
      theme: 'Thème',
      lightMode: 'Mode Jour',
      darkMode: 'Mode Guddi',
      
      // Actions principales
      scanQR: 'Scan QR Code',
      browseCatalogue: 'Gis Catalogue',
      virtualVisit: 'Visite Virtuelle',
      chat: 'Visite Guidée IA',
      planVisit: 'Planifier Visite',
      contribute: 'Jox sa Batal',
      
      // Catalogue
      'catalogue.title': 'Catalogue bu Liggéey',
      search: 'Seet beneen liggéey...',
      filter: 'Tëral ci catégorie',
      allCategories: 'Lépp catégorie',
      noResults: 'Liggéey amul',
      artworksFound: 'liggéey gis na',
      
      // Détails d'œuvre
      artworkDetails: 'Détails bu Liggéey',
      description: 'Wax',
      history: 'Historia',
      media: 'Média',
      culturalSignificance: 'Njëg ci Culture',
      audioGuide: 'Guide Audio',
      videoPresentation: 'Présentation Vidéo',
      arExperience: 'Expérience AR',
      takeQuiz: 'Xam sa xam-xam',
      period: 'Yoon',
      origin: 'Dibine',
      category: 'Catégorie',
      
      // Actions médias
      play: 'Dégg',
      pause: 'Taxaw',
      stop: 'Dajaloo',
      watch: 'Xool',
      viewInAR: 'Gis ci Réalité Augmentée',
      listen: 'Dégg wax bi',
      
      // Scanner QR
      scanArtwork: 'Scan Liggéey',
      scanInstructions: 'Des QR code ci cadre bi',
      scanSuccess: 'QR Code scan na ci njariñ!',
      scanError: 'Njumte ci scan. Jéema ko.',
      
      // Quiz
      quiz: 'Quiz',
      question: 'Laaj',
      submit: 'Jox',
      next: 'Ci topp',
      correct: 'Jaay bu baax!',
      incorrect: 'Jaay bu bonul. Jéema ko!',
      yourScore: 'Sa score',
      finalScore: 'Score final',
      quizCompleted: 'Quiz jeexal na!',
      tryAgain: 'Jéema ko',
      
      // Badges
      badges: 'Badge',
      noBadges: 'Badge amul ba leegi',
      badgeEarned: 'Badge am nga!',
      
      // Chatbot Lumina
      'chatbot.greeting': 'Na nga def! Mangi Lumina, guide virtuel MCN. Naka ma mën la ndjël?',
      'chatbot.placeholder': 'Laaj beneen laaj...',
      'chatbot.send': 'Jox',
      'chatbot.title': 'Lumina - Guide IA',
      
      // Communauté & Contributions
      'community.title': 'Communauté',
      'community.contribute': 'Jox sa témoignage',
      'community.name': 'Sa tur',
      'community.email': 'Sa email',
      'community.message': 'Sa batal',
      'community.submit': 'Jox',
      'community.success': 'Jërëjëf ci sa njëg!',
      'community.error': 'Njumte ci joxe. Jéema ko.',
      
      // Réservations
      'reservation.title': 'Planifier Visite',
      'reservation.date': 'Bés bu visite',
      'reservation.groupSize': 'Ñaata nit',
      'reservation.submit': 'Réserver',
      'reservation.success': 'Réservation jaay na!',
      'reservation.error': 'Njumte ci réservation.',
      
      // Authentification
      'auth.login': 'Dugg',
      'auth.logout': 'Génn',
      'auth.email': 'Email',
      'auth.password': 'Mot de passe',
      'auth.name': 'Sa tur bu tëmbal',
      'auth.signup': 'Bàyyi compte',
      'auth.alreadyAccount': 'Am nga compte?',
      'auth.noAccount': 'Compte amul?',
      'auth.success': 'Dugg réussi na!',
      'auth.error': 'Identifiant bonul.',
      
      // Compte utilisateur
      'account.title': 'Sama Compte',
      'account.progress': 'Sama Progrès',
      'account.badges': 'Sama Badge',
      'account.score': 'Score bu tëmbal',
      'account.quizzes': 'Quiz yu jeexal',
      'account.notConnected': 'Dugg ma wala',
      'account.loginRequired': 'Dugg ba njool',
      
      // Admin Dashboard
      'admin.title': 'Tableau de Bord Administrateur',
      'admin.stats': 'Statistique',
      'admin.visitors': 'Jëmm-jëmm yu beneen',
      'admin.scans': 'Scan QR',
      'admin.quizzes': 'Quiz yu jeexal',
      'admin.contributions': 'Njëg',
      'admin.reservations': 'Réservation',
      'admin.recent': 'Liggéey bu leeb',
      'admin.accessDenied': 'Accès dafa feeñ. Dugg admin laaj na.',
      
      // Footer
      'footer.about': 'Ci MCN',
      'footer.contact': 'Jokkoo',
      'footer.visit': 'Planifier visite',
      'footer.social': 'Jël nu',
      'footer.rights': 'Lépp droit tëral na',
      
      // Messages généraux
      loading: 'Dafa daw...',
      error: 'Njumte amna',
      success: 'Réussi na!',
      cancel: 'Dajal',
      confirm: 'Jaay',
      back: 'Dellu',
      close: 'Tëj',
      save: 'Tëral',
    },
  },
};

// Configuration du détecteur de langue
const detectionOptions = {
  // Ordre de détection
  order: ['localStorage', 'navigator', 'htmlTag'],
  
  // Clé localStorage
  lookupLocalStorage: 'loa_language',
  
  // Cache la langue détectée
  caches: ['localStorage'],
  
  // Ne pas détecter depuis le sous-domaine
  excludeCacheFor: ['cimode'],
};

// Langue par défaut basée sur le navigateur
const browserLanguage = navigator.language.split('-')[0];
const defaultLanguage = ['fr', 'en', 'wo'].includes(browserLanguage) ? browserLanguage : 'fr';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'fr',
    detection: detectionOptions,
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },
    react: {
      useSuspense: false, // Désactive Suspense pour éviter les problèmes
    },
  });

export default i18n;

// Fonction utilitaire pour changer la langue
export const changeLanguage = (lang: 'fr' | 'en' | 'wo') => {
  i18n.changeLanguage(lang);
  localStorage.setItem('loa_language', lang);
};

// Fonction pour obtenir la langue actuelle
export const getCurrentLanguage = (): 'fr' | 'en' | 'wo' => {
  return i18n.language as 'fr' | 'en' | 'wo';
};

// Liste des langues disponibles
export const availableLanguages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'wo', name: 'Wolof', flag: '🇸🇳' },
];