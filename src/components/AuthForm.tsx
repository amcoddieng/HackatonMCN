"use client";

import React, { useState, useEffect } from "react";
import { setAuthUser, AuthUser } from "../utils/localStorageHelpers";
import { useTheme } from "../contexts/ThemeContext";

interface AuthFormProps {
  onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
  const { darkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (!isLogin) {
      setPasswordsMatch(password === confirmPassword);
    }
  }, [password, confirmPassword, isLogin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer un email valide");
      return;
    }

    if (password.length < 4) {
      setError("Le mot de passe doit contenir au moins 4 caractères");
      return;
    }

    const isAdmin = email.trim().toLowerCase() === "admin@mcn.sn" && password === "admin";

    const authUser: AuthUser = {
      email,
      name: isAdmin ? "Administrateur" : name || "Utilisateur",
      isAdmin,
      loginDate: new Date().toISOString(),
    };

    setAuthUser(authUser);

    setSuccessMessage(isAdmin ? "Connexion administrateur réussie !" : "Connexion réussie !");
    onSuccess?.();

    setTimeout(() => {
      window.location.href = isAdmin ? "/admin" : "/account";
    }, 1000);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-black"} max-w-md mx-auto mt-12 p-6 rounded-lg shadow-lg`}>
      <h2 className="text-2xl font-bold mb-2">
        {isLogin ? "Connexion" : "Inscription"}
      </h2>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-4`}>
        {isLogin
          ? "Connectez-vous à votre compte Light Of Africa"
          : "Créez votre compte Light Of Africa"}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium">
              Nom
            </label>
            <input
              type="text"
              placeholder="Votre nom"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-black"} w-full px-3 py-2 rounded`}
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-black"} w-full px-3 py-2 rounded`}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-black"} w-full px-3 py-2 rounded`}
            required
          />
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium">
              Confirmez le mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-100 text-black"} w-full px-3 py-2 rounded ${!passwordsMatch ? "border border-red-500" : ""}`}
              required={!isLogin}
            />
            {!passwordsMatch && (
              <p className="text-xs text-red-500 mt-1">
                Les mots de passe ne correspondent pas
              </p>
            )}
          </div>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}
        {successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}

        <button
          type="submit"
          disabled={!isLogin && !passwordsMatch}
          className={`w-full py-2 ${darkMode ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-yellow-500 text-black hover:bg-yellow-600"} font-bold rounded ${!isLogin && !passwordsMatch ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLogin ? "Se connecter" : "S'inscrire"}
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setSuccessMessage("");
          }}
          className="hover:underline"
        >
          {isLogin
            ? "Pas encore de compte ? S'inscrire"
            : "Déjà un compte ? Se connecter"}
        </button>
      </div>
    </div>
  );
}