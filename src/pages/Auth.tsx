// src/pages/Auth.tsx
import AuthForm from "../components/AuthForm";
import { useTheme } from "../contexts/ThemeContext";

export const Auth = () => {
  const { darkMode } = useTheme();
  return (
    <div className={`${darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-black"} min-h-screen flex items-center justify-center py-12`}>
      <AuthForm onSuccess={() => (window.location.href = "/account")} />
    </div>
  );
};