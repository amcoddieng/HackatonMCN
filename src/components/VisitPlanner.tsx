// src/components/VisitPlanner.tsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { addReservation } from "../utils/localStorageHelpers";
import { Calendar, Users, CheckCircle2, Mail, User, Clock } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function VisitPlanner() {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !date || groupSize < 1) {
      alert(t("visitPlanner.fillAllFields", "Veuillez remplir tous les champs correctement"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert(t("visitPlanner.invalidEmail", "Veuillez entrer un email valide"));
      return;
    }

    addReservation({ name, email, date, groupSize });
    setSubmitted(true);

    setTimeout(() => {
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setGroupSize(1);
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-950 border-gray-700' : 'bg-white border-gray-200'} border p-8 rounded-lg shadow-lg text-center`}>
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-2`}>
          {t("visitPlanner.confirmed", "Réservation confirmée !")}
        </h3>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          {t("visitPlanner.confirmMessage", "Nous avons bien reçu votre demande de visite.")}
        </p>
      </div>
    );
  }

  return (
    <div className={`max-w-2xl mx-auto ${darkMode ? 'bg-gray-950 border-gray-700' : 'bg-white border-gray-200'} border p-8 rounded-lg shadow-lg`}>
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-6 w-6 text-yellow-400" />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
            {t("visitPlanner.title", "Planifier une Visite")}
          </h2>
        </div>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
          {t("visitPlanner.subtitle", "Réservez votre visite au musée")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col">
          <label htmlFor="name" className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-2`}>
            <User className="h-4 w-4 text-yellow-400" />
            {t("visitPlanner.fullName", "Nom complet")}
          </label>
          <input
            id="name"
            type="text"
            placeholder={t("visitPlanner.namePlaceholder", "Votre nom complet")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-yellow-400 transition`}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-2`}>
            <Mail className="h-4 w-4 text-yellow-400" />
            {t("visitPlanner.email", "Email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("visitPlanner.emailPlaceholder", "votre@email.com")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-yellow-400 transition`}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="date" className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-2`}>
              <Calendar className="h-4 w-4 text-yellow-400" />
              {t("visitPlanner.date", "Date de visite")}
            </label>
            <input
              id="date"
              type="date"
              value={date}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
              className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-yellow-400 transition`}
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="time" className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-2`}>
              <Clock className="h-4 w-4 text-yellow-400" />
              {t("visitPlanner.time", "Heure")}
            </label>
            <input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-yellow-400 transition`}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="groupSize" className={`mb-2 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} flex items-center gap-2`}>
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
            className={`p-3 rounded-lg ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-100' : 'bg-gray-100 border-gray-300 text-black'} border focus:outline-none focus:ring-2 focus:ring-yellow-400 transition`}
            required
          />
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
            {t("visitPlanner.groupSizeDesc", "Nombre de personnes (maximum 50)")}
          </p>
        </div>

        <button
          type="submit"
          className={`w-full p-4 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-all transform hover:scale-105 ${
            groupSize < 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={groupSize < 1}
        >
          {t("visitPlanner.confirm", "Confirmer la réservation")}
        </button>
      </form>

      <div className={`mt-6 p-4 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'} rounded-lg border`}>
        <h3 className={`text-sm font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mb-2`}>
          {t("visitPlanner.infoTitle", "Informations importantes")}
        </h3>
        <ul className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} space-y-1`}>
          <li>• {t("visitPlanner.info1", "Les visites sont gratuites mais la réservation est obligatoire")}</li>
          <li>• {t("visitPlanner.info2", "Arrivez 10 minutes avant l'heure prévue")}</li>
          <li>• {t("visitPlanner.info3", "Un guide vous accueillera à l'entrée")}</li>
        </ul>
      </div>
    </div>
  );
}