// src/utils/localStorageHelpers.ts

// ============================================
// INTERFACES & TYPES
// ============================================

export interface AuthUser {
  email: string;
  name: string;
  isAdmin: boolean;
  loginDate: string;
}

export interface UserProgress {
  completedQuizzes: string[];
  badges: string[];
  score: number;
}

export interface Stats {
  uniqueVisitors: number;
  qrScans: number;
  quizzesCompleted: number;
  contributionsCount: number;
  reservationsCount: number;
}

export interface Contribution {
  id: string;
  name: string;
  email: string;
  message: string;
  artworkId?: string;
  date: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  date: string;
  groupSize: number;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedAt: string;
  icon: string;
}

// ============================================
// CONSTANTES - CLÉS LOCALSTORAGE
// ============================================

const KEYS = {
  AUTH_USER: 'loa_auth_user',
  STATS: 'loa_stats',
  PROGRESS: 'loa_progress',
  CONTRIBUTIONS: 'loa_contributions',
  RESERVATIONS: 'loa_reservations',
  BADGES: 'loa_badges',
  // Rétrocompatibilité avec NoirVista
  NOIRVISTA_PROGRESS: 'noirvistaProgress',
  NOIRVISTA_TESTIMONIES: 'noirvistaTestimonies',
};

// ============================================
// AUTHENTIFICATION
// ============================================

export const getAuthUser = (): AuthUser | null => {
  const stored = localStorage.getItem(KEYS.AUTH_USER);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing auth user:', error);
      return null;
    }
  }
  return null;
};

export const setAuthUser = (user: AuthUser): void => {
  localStorage.setItem(KEYS.AUTH_USER, JSON.stringify(user));
};

export const removeAuthUser = (): void => {
  localStorage.removeItem(KEYS.AUTH_USER);
};

export const isUserAdmin = (): boolean => {
  const user = getAuthUser();
  return user?.isAdmin === true;
};

// ============================================
// STATISTIQUES
// ============================================

export const getStats = (): Stats => {
  const stored = localStorage.getItem(KEYS.STATS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing stats:', error);
      return initializeStats();
    }
  }
  return initializeStats();
};

const initializeStats = (): Stats => {
  const defaultStats: Stats = {
    uniqueVisitors: 0,
    qrScans: 0,
    quizzesCompleted: 0,
    contributionsCount: 0,
    reservationsCount: 0,
  };
  localStorage.setItem(KEYS.STATS, JSON.stringify(defaultStats));
  return defaultStats;
};

export const updateStats = (
  statKey: keyof Stats,
  increment: number = 1
): void => {
  const stats = getStats();
  stats[statKey] = (stats[statKey] || 0) + increment;
  localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
};

export const incrementQRScans = (): void => {
  updateStats('qrScans');
};

export const incrementQuizzesCompleted = (): void => {
  updateStats('quizzesCompleted');
};

export const incrementUniqueVisitors = (): void => {
  updateStats('uniqueVisitors');
};

// ============================================
// PROGRESSION UTILISATEUR
// ============================================

export const getUserProgress = (): UserProgress => {
  const stored = localStorage.getItem(KEYS.PROGRESS);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing user progress:', error);
      return { completedQuizzes: [], badges: [], score: 0 };
    }
  }
  
  // Migration depuis NoirVista si existant
  const noirvistaStored = localStorage.getItem(KEYS.NOIRVISTA_PROGRESS);
  if (noirvistaStored) {
    try {
      const noirvistaProgress = JSON.parse(noirvistaStored);
      saveUserProgress(noirvistaProgress);
      return noirvistaProgress;
    } catch (error) {
      console.error('Error migrating NoirVista progress:', error);
    }
  }
  
  return { completedQuizzes: [], badges: [], score: 0 };
};

export const saveUserProgress = (progress: UserProgress): void => {
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
};

export const addCompletedQuiz = (artworkId: string): void => {
  const progress = getUserProgress();
  
  if (!progress.completedQuizzes.includes(artworkId)) {
    progress.completedQuizzes.push(artworkId);
    progress.score += 10;

    // Attribution automatique des badges
    if (progress.completedQuizzes.length === 3) {
      progress.badges.push('Explorer Culturel');
      addBadge({
        name: 'Explorer Culturel',
        description: 'Complété 3 quiz',
        icon: '🌍',
      });
    }
    
    if (progress.completedQuizzes.length === 6) {
      progress.badges.push('Gardien du Patrimoine');
      addBadge({
        name: 'Gardien du Patrimoine',
        description: 'Complété 6 quiz',
        icon: '🏛️',
      });
    }

    if (progress.completedQuizzes.length === 10) {
      progress.badges.push('Maître de la Culture');
      addBadge({
        name: 'Maître de la Culture',
        description: 'Complété 10 quiz',
        icon: '👑',
      });
    }

    saveUserProgress(progress);
    incrementQuizzesCompleted();
  }
};

// ============================================
// BADGES
// ============================================

export const getBadges = (): Badge[] => {
  return getItems<Badge>(KEYS.BADGES);
};

export const addBadge = (
  badgeData: Omit<Badge, 'id' | 'earnedAt'>
): Badge => {
  const badges = getBadges();
  
  // Vérifier si le badge existe déjà
  const existingBadge = badges.find(b => b.name === badgeData.name);
  if (existingBadge) {
    return existingBadge;
  }

  const newBadge: Badge = {
    ...badgeData,
    id: Date.now().toString(),
    earnedAt: new Date().toISOString(),
  };
  
  badges.push(newBadge);
  localStorage.setItem(KEYS.BADGES, JSON.stringify(badges));
  
  return newBadge;
};

// ============================================
// CONTRIBUTIONS
// ============================================

export const getContributions = (): Contribution[] => {
  const items = getItems<Contribution>(KEYS.CONTRIBUTIONS);
  
  // Migration depuis NoirVista Testimonies
  if (items.length === 0) {
    const noirvistaTestimonies = localStorage.getItem(KEYS.NOIRVISTA_TESTIMONIES);
    if (noirvistaTestimonies) {
      try {
        const testimonies = JSON.parse(noirvistaTestimonies);
        testimonies.forEach((t: any) => {
          const contribution: Contribution = {
            id: t.id,
            name: t.name,
            email: '',
            message: t.message,
            artworkId: t.artworkId,
            date: t.date,
          };
          items.push(contribution);
        });
        localStorage.setItem(KEYS.CONTRIBUTIONS, JSON.stringify(items));
      } catch (error) {
        console.error('Error migrating testimonies:', error);
      }
    }
  }
  
  return items;
};

export const addContribution = (
  contributionData: Omit<Contribution, 'id' | 'date'>
): Contribution => {
  const newContribution: Contribution = {
    ...contributionData,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  
  const contributions = getContributions();
  contributions.push(newContribution);
  localStorage.setItem(KEYS.CONTRIBUTIONS, JSON.stringify(contributions));
  
  updateStats('contributionsCount');
  
  return newContribution;
};

// Alias pour compatibilité NoirVista
export const getTestimonies = (): Contribution[] => {
  return getContributions();
};

export const addTestimony = (
  testimony: Omit<Contribution, 'id' | 'date' | 'email'>
): void => {
  addContribution({
    ...testimony,
    email: '',
  });
};

// ============================================
// RÉSERVATIONS
// ============================================

export const getReservations = (): Reservation[] => {
  return getItems<Reservation>(KEYS.RESERVATIONS);
};

export const addReservation = (
  reservationData: Omit<Reservation, 'id' | 'createdAt'>
): Reservation => {
  const newReservation: Reservation = {
    ...reservationData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  
  const reservations = getReservations();
  reservations.push(newReservation);
  localStorage.setItem(KEYS.RESERVATIONS, JSON.stringify(reservations));
  
  updateStats('reservationsCount');
  
  return newReservation;
};

// ============================================
// UTILITAIRES GÉNÉRIQUES
// ============================================

export const getItems = <T>(key: string): T[] => {
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error(`Error parsing items for key ${key}:`, error);
      return [];
    }
  }
  return [];
};

export const addItem = <T>(key: string, item: T): void => {
  const items = getItems<T>(key);
  items.push(item);
  localStorage.setItem(key, JSON.stringify(items));
};

export const removeItem = (key: string, itemId: string): void => {
  const items = getItems<any>(key);
  const filtered = items.filter((item: any) => item.id !== itemId);
  localStorage.setItem(key, JSON.stringify(filtered));
};

export const clearItem = (key: string): void => {
  localStorage.removeItem(key);
};

// ============================================
// INITIALISATION
// ============================================

export const initializeLocalStorage = (): void => {
  // Créer loa_stats si n'existe pas
  if (!localStorage.getItem(KEYS.STATS)) {
    initializeStats();
  }
  
  // Incrémenter le compteur de visiteurs uniques à chaque session
  const hasVisited = sessionStorage.getItem('loa_session_active');
  if (!hasVisited) {
    incrementUniqueVisitors();
    sessionStorage.setItem('loa_session_active', 'true');
  }
};

// ============================================
// NETTOYAGE & RESET
// ============================================

export const resetAllData = (): void => {
  Object.values(KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
  sessionStorage.clear();
  initializeStats();
};

export const exportData = (): string => {
  const data = {
    authUser: getAuthUser(),
    stats: getStats(),
    progress: getUserProgress(),
    contributions: getContributions(),
    reservations: getReservations(),
    badges: getBadges(),
    exportDate: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.authUser) setAuthUser(data.authUser);
    if (data.stats) localStorage.setItem(KEYS.STATS, JSON.stringify(data.stats));
    if (data.progress) saveUserProgress(data.progress);
    if (data.contributions) localStorage.setItem(KEYS.CONTRIBUTIONS, JSON.stringify(data.contributions));
    if (data.reservations) localStorage.setItem(KEYS.RESERVATIONS, JSON.stringify(data.reservations));
    if (data.badges) localStorage.setItem(KEYS.BADGES, JSON.stringify(data.badges));
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};