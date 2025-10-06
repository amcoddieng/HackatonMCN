// src/pages/Admin.tsx
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getAuthUser } from "../utils/localStorageHelpers";
import AuthForm from "../components/AuthForm";
import AdminDashboard from "../components/AdminDashboard";
import { useTheme } from "../contexts/ThemeContext";

export const Admin = () => {
  const { t } = useTranslation();
  const { darkMode } = useTheme();
  const [user, setUser] = useState(getAuthUser());

  useEffect(() => {
    const handleStorageChange = () => setUser(getAuthUser());
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!user || !user.isAdmin) {
    return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-black"} flex flex-col items-center justify-center p-6`}>
        <p className="text-xl text-red-400 mb-6">
          {t("admin.accessDenied") || "Accès refusé. Connexion administrateur requise."}
        </p>
        <AuthForm onSuccess={() => window.location.reload()} />
      </div>
    );
  }

  return <AdminDashboard />;
};