"use client";

import React, { useState, useEffect } from "react";
import { setAuthUser, AuthUser } from "../utils/localStorageHelpers";

interface AuthFormProps {
    onSuccess?: () => void;
}

export default function AuthForm({ onSuccess }: AuthFormProps) {
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

        // Vérifie si c'est l'administrateur
        const isAdmin = email.trim().toLowerCase() === "admin@mcn.sn" && password === "admin";

        // Création de l'objet utilisateur
        const authUser: AuthUser = {
            email,
            name: isAdmin ? "Administrateur" : name || "Utilisateur",
            isAdmin,
            loginDate: new Date().toISOString(),
        };

        // Sauvegarde dans le localStorage
        setAuthUser(authUser);

        // ✅ Récupérer l'URL de redirection sauvegardée
        const redirectUrl = localStorage.getItem("loa_redirectAfterLogin");

        setSuccessMessage(isAdmin ? "Connexion administrateur réussie !" : "Connexion réussie !");
        onSuccess?.();

        // ✅ Redirection après 1 seconde
        setTimeout(() => {
            if (redirectUrl) {
                // ✅ Supprimer la clé pour éviter des redirections non désirées
                localStorage.removeItem("loa_redirectAfterLogin");
                window.location.href = redirectUrl; // ✅ Retour à la page d'origine
            } else {
                // ✅ Redirection par défaut selon le type d'utilisateur
                window.location.href = isAdmin ? "/admin" : "/account";
            }
        }, 1000);
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? "Connexion" : "Inscription"}
            </h2>
            <p className="text-gray-300 mb-4">
                {isLogin
                    ? "Connectez-vous à votre compte Light Of Africa"
                    : "Créez votre compte Light Of Africa"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-gray-200">
                            Nom
                        </label>
                        <input
                            type="text"
                            placeholder="Votre nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-200">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>

                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-gray-200">
                            Confirmez le mot de passe
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full px-3 py-2 rounded bg-gray-700 text-white ${!passwordsMatch ? "border border-red-500" : ""
                                }`}
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
                    className={`w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded ${!isLogin && !passwordsMatch ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {isLogin ? "Se connecter" : "S'inscrire"}
                </button>
            </form>

            <div className="mt-4 text-center text-sm text-gray-300">
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