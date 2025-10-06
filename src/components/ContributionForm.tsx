// src/components/ContributionForm.tsx
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { addContribution } from "../utils/localStorageHelpers";
import { MessageSquare, CheckCircle2, Mail, User, LogIn } from "lucide-react";

export default function ContributionForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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

    if (!name || !email || !message) {
      alert(t("contribution.fillAllFields", "Veuillez remplir tous les champs"));
      return;
    }

    // Validation message (minimum 10 caractères)
    if (message.trim().length < 10) {
      alert(t("contribution.messageTooShort", "Votre témoignage doit contenir au moins 10 caractères"));
      return;
    }

    // Ajouter la contribution
    addContribution({ 
      name, 
      email, 
      message: message.trim()
    });

    setSubmitted(true);

    // Réinitialiser le formulaire après 3 secondes
    setTimeout(() => {
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  // Message de confirmation
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-gray-900 border border-gray-800 p-8 rounded-lg shadow-lg text-center">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-yellow-400 mb-2">
          {t("contribution.confirmed", "Merci pour votre contribution !")}
        </h3>
        <p className="text-gray-400">
          {t("contribution.confirmMessage", "Votre témoignage a été enregistré et sera examiné par notre équipe.")}
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
          {t("contribution.loginRequired", "Connexion requise")}
        </h3>
        <p className="text-gray-400 mb-6">
          {t("contribution.loginMessage", "Vous devez être connecté pour partager un témoignage.")}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              localStorage.setItem("loa_redirectAfterLogin", "/contribution");
              navigate("/login");
            }}
            className="px-6 py-3 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-all"
          >
            {t("contribution.loginButton", "Se connecter")}
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-bold transition-all"
          >
            {t("contribution.backButton", "Retour")}
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
          <MessageSquare className="h-6 w-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-yellow-400">
            {t("contribution.title", "Partagez votre Témoignage")}
          </h2>
        </div>
        <p className="text-gray-400">
          {t("contribution.subtitle", "Contribuez à l'histoire du musée Light Of Africa en partageant votre expérience")}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          {t("contribution.connectedAs", "Connecté en tant que")}: <span className="text-yellow-400">{currentUser?.name}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nom */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-300 flex items-center gap-2">
            <User className="h-4 w-4 text-yellow-400" />
            {t("contribution.fullName", "Nom complet")}
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
            {t("contribution.email", "Email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
            disabled
          />
        </div>

        {/* Message/Témoignage */}
        <div className="flex flex-col">
          <label htmlFor="message" className="mb-2 text-sm font-medium text-gray-300 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-yellow-400" />
            {t("contribution.message", "Votre témoignage")}
          </label>
          <textarea
            id="message"
            placeholder={t("contribution.messagePlaceholder", "Partagez votre expérience...")}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
            required
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">
              {t("contribution.messageDesc", "Minimum 10 caractères")}
            </p>
            <p className="text-xs text-gray-500">
              {message.length} / 500
            </p>
          </div>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className={`w-full p-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-all transform hover:scale-105 ${
            message.length < 10 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={message.length < 10}
        >
          {t("contribution.submit", "Envoyer ma contribution")}
        </button>
      </form>

      {/* Note de confidentialité */}
      <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
        <h3 className="text-sm font-semibold text-yellow-400 mb-2">
          {t("contribution.privacyTitle", "Confidentialité")}
        </h3>
        <p className="text-xs text-gray-400">
          {t("contribution.privacyText", "Vos informations personnelles ne seront jamais partagées publiquement. Seul votre témoignage sera visible après validation.")}
        </p>
      </div>
    </div>
  );
}