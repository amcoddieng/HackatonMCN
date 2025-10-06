// src/components/AdminDashboard.tsx
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getStats,
  getContributions,
  getReservations,
  type Stats,
  type Contribution,
  type Reservation,
} from "../utils/localStorageHelpers";
import { Users, QrCode, Brain, MessageSquare, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const { t } = useTranslation();
  
  const [stats, setStats] = useState<Stats>({
    uniqueVisitors: 0,
    qrScans: 0,
    quizzesCompleted: 0,
    contributionsCount: 0,
    reservationsCount: 0,
  });

  const [recentContributions, setRecentContributions] = useState<Contribution[]>([]);
  const [recentReservations, setRecentReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Récupère les statistiques
    setStats(getStats());
    
    // Récupère les 5 dernières contributions
    const contributions = getContributions();
    setRecentContributions(contributions.slice(-5).reverse());
    
    // Récupère les 5 dernières réservations
    const reservations = getReservations();
    setRecentReservations(reservations.slice(-5).reverse());
  };

  const statCards = [
    { 
      title: t("admin.visitors", "Visiteurs Uniques"), 
      value: stats.uniqueVisitors, 
      icon: Users, 
      description: t("admin.visitorsDesc", "Nombre total de visiteurs") 
    },
    { 
      title: t("admin.scans", "Scans QR"), 
      value: stats.qrScans, 
      icon: QrCode, 
      description: t("admin.scansDesc", "QR codes scannés") 
    },
    { 
      title: t("admin.quizzes", "Quiz Complétés"), 
      value: stats.quizzesCompleted, 
      icon: Brain, 
      description: t("admin.quizzesDesc", "Quiz terminés") 
    },
    { 
      title: t("admin.contributions", "Contributions"), 
      value: stats.contributionsCount, 
      icon: MessageSquare, 
      description: t("admin.contributionsDesc", "Témoignages reçus") 
    },
    { 
      title: t("admin.reservations", "Réservations"), 
      value: stats.reservationsCount || 0, 
      icon: Calendar, 
      description: t("admin.reservationsDesc", "Visites planifiées") 
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* En-tête */}
        <div>
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            {t("admin.title", "Tableau de Bord Administrateur")}
          </h1>
          <p className="text-gray-400">
            {t("admin.subtitle", "Vue d'ensemble des statistiques du musée Light Of Africa")}
          </p>
        </div>

        {/* Cartes de statistiques */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.title} 
                className="bg-gray-900 p-4 rounded-lg border border-gray-800 hover:border-yellow-400 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-300">{stat.title}</h3>
                  <Icon className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="text-2xl font-bold text-yellow-400">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Section Contributions & Réservations */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Dernières Contributions */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              {t("admin.recentContributions", "Dernières Contributions")}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              {t("admin.recentContributionsDesc", "Les 5 derniers témoignages reçus")}
            </p>
            
            {recentContributions.length > 0 ? (
              <div className="space-y-4">
                {recentContributions.map((c) => (
                  <div 
                    key={c.id} 
                    className="border-l-4 border-yellow-400 pl-4 py-2 bg-gray-800 rounded-r"
                  >
                    <p className="text-sm text-gray-300 line-clamp-2 mb-2">{c.message}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">{c.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8 italic">
                {t("admin.noContributions", "Aucune contribution pour le moment")}
              </p>
            )}
          </div>

          {/* Dernières Réservations */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold text-yellow-400 mb-2">
              {t("admin.recentReservations", "Dernières Réservations")}
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              {t("admin.recentReservationsDesc", "Les 5 dernières visites planifiées")}
            </p>
            
            {recentReservations.length > 0 ? (
              <div className="space-y-4">
                {recentReservations.map((r) => (
                  <div 
                    key={r.id} 
                    className="border-l-4 border-yellow-400 pl-4 py-2 bg-gray-800 rounded-r"
                  >
                    <div className="flex justify-between mb-1">
                      <p className="font-medium text-white">{r.name}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(r.date).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300">
                      {t("admin.groupOf", "Groupe de")} {r.groupSize} {t("admin.person", "personne")}{r.groupSize > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{r.email}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-8 italic">
                {t("admin.noReservations", "Aucune réservation pour le moment")}
              </p>
            )}
          </div>
        </div>

        {/* Bouton de rafraîchissement */}
        <div className="text-center">
          <button
            onClick={loadData}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            {t("admin.refresh", "Rafraîchir les données")}
          </button>
        </div>
      </div>
    </div>
  );
}