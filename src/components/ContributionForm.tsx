"use client";

import React, { useState } from "react";
import { addContribution } from "../utils/localStorageHelpers";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function ContributionForm() {
  const { darkMode } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    addContribution({ name, email, message });
    setSubmitted(true);

    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-black"} max-w-2xl mx-auto p-6 rounded-lg shadow-lg text-center transition-all duration-300`}>
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Merci pour votre contribution !</h3>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Votre témoignage a été enregistré et sera examiné par notre équipe.
        </p>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-white text-black"} max-w-2xl mx-auto p-6 rounded-lg shadow-lg transition-all duration-300`}>
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="h-5 w-5 text-yellow-400" />
          <h2 className="text-xl font-bold">Partagez votre Témoignage</h2>
        </div>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Contribuez à l'histoire du musée Light Of Africa en partageant votre expérience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-sm font-medium">
            Nom complet
          </label>
          <input
            id="name"
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`${darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-black"} p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300`}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-black"} p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300`}
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="mb-1 text-sm font-medium">
            Votre témoignage
          </label>
          <textarea
            id="message"
            placeholder="Partagez votre expérience..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className={`${darkMode ? "bg-gray-600 text-gray-100" : "bg-gray-100 text-black"} p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300`}
            required
          />
          <p className={`${darkMode ? "text-xs text-gray-500 mt-1" : "text-xs text-gray-600 mt-1"}`}>Minimum 10 caractères</p>
        </div>

        <button
          type="submit"
          className={`w-full p-3 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-300 hover:shadow-lg ${message.length < 10 ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={message.length < 10}
        >
          Envoyer ma contribution
        </button>
      </form>
    </div>
  );
}