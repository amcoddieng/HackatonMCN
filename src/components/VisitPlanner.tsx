// src/components/VisitPlanner.tsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addReservation } from "../utils/localStorageHelpers";
import { Calendar, Users, CheckCircle2, Mail, User, LogIn } from "lucide-react";

export default function VisitPlanner() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
  // Vérifier si l'utilisateur est connecté
  const storedUser = localStorage.getItem("loa_auth_user");
  if (storedUser) {
    try {
      const userData = JSON.parse(storedUser);
      setCurrentUser(userData);
      setIsAuthenticated(true);
      setName(userData.name || "");
      setEmail(userData.email || "");
    } catch (error) {
      console.error("Erreur lors de la lecture de l'utilisateur :", error);
    }
  }
}, []);


  const handleLoginRedirect = () => {
    // Sauvegarder l'URL actuelle pour revenir après connexion
    localStorage.setItem("loa_redirectAfterLogin", window.location.pathname);
    window.location.href = "/auth";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Vérifier l'authentification
    if (!isAuthenticated) {
      handleLoginRedirect();
      return;
    }

    if (!name || !email || !date || groupSize < 1) {
      alert(t("visitPlanner.fillAllFields", "Veuillez remplir tous les champs correctement"));
      return;
    }

    // Ajouter la réservation
    addReservation({ 
      name, 
      email, 
      date, 
      groupSize 
    });

    setSubmitted(true);

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setDate("");
      setGroupSize(1);
      setSubmitted(false);
    }, 3000);
  };

  // Message de confirmation
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-lg text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          {t("visitPlanner.confirmed", "Réservation confirmée !")}
        </h3>
        <p className="text-gray-400">
          {t("visitPlanner.confirmMessage", "Nous avons bien reçu votre demande de visite. Un email de confirmation vous sera envoyé prochainement.")}
        </p>
      </div>
    );
  }

  // Si non authentifié, afficher un message avec bouton de connexion
  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-lg text-center">
        <LogIn className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          {t("visitPlanner.loginRequired", "Connexion requise")}
        </h3>
        <p className="text-gray-400 mb-6">
          {t("visitPlanner.loginMessage", "Vous devez être connecté pour réserver une visite au musée.")}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleLoginRedirect}
            className="px-6 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-all"
          >
            {t("visitPlanner.loginButton", "Se connecter")}
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-all"
          >
            {t("visitPlanner.backButton", "Retour")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-lg">
      {/* En-tête */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-6 w-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-yellow-400">
            {t("visitPlanner.title", "Planifier une Visite")}
          </h2>
        </div>
        <p className="text-gray-400">
          {t("visitPlanner.subtitle", "Réservez votre visite au musée Light Of Africa")}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {t("visitPlanner.connectedAs", "Connecté en tant que")}: <span className="text-yellow-400">{currentUser?.name}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nom complet */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-300 flex items-center gap-2">
            <User className="h-4 w-4 text-yellow-400" />
            {t("visitPlanner.fullName", "Nom complet")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-300 flex items-center gap-2">
            <Mail className="h-4 w-4 text-yellow-400" />
            {t("visitPlanner.email", "Email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2 text-sm font-medium text-gray-300 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-yellow-400" />
            {t("visitPlanner.date", "Date de visite")}
          </label>
          <input
            id="date"
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            required
          />
        </div>

        {/* Taille du groupe */}
        <div className="flex flex-col">
          <label htmlFor="groupSize" className="mb-2 text-sm font-medium text-gray-300 flex items-center gap-2">
            <Users className="h-4 w-4 text-yellow-400" />
            {t("visitPlanner.groupSize", "Taille du groupe")}
          </label>
          <input
            id="groupSize"
            type="number"
            min={1}
            max={50}
            value={groupSize}
            onChange={(e) => setGroupSize(Number.parseInt(e.target.value) || 1)}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            {t("visitPlanner.groupSizeDesc", "Nombre de personnes (maximum 50)")}
          </p>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full p-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-all transform hover:scale-105"
        >
          {t("visitPlanner.confirm", "Confirmer la réservation")}
        </button>
      </form>

      {/* Informations supplémentaires */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold text-yellow-400 mb-2">
          {t("visitPlanner.infoTitle", "Informations importantes")}
        </h3>
        <ul className="text-xs text-gray-400 space-y-1">
          <li>• {t("visitPlanner.info1", "Les visites sont gratuites mais la réservation est obligatoire")}</li>
          <li>• {t("visitPlanner.info2", "Arrivez 10 minutes avant l'heure prévue")}</li>
          <li>• {t("visitPlanner.info3", "Un guide vous accueillera à l'entrée")}</li>
        </ul>
      </div>
    </div>
  );
}