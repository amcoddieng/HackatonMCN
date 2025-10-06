// src/pages/VisitPlanner.tsx
import VisitPlannerComponent from '../components/VisitPlanner';
import { useTheme } from '../contexts/ThemeContext';

export const VisitPlanner = () => {
  const { darkMode } = useTheme();
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950 text-gray-100" : "bg-white text-black"} py-12`}>
      <div className="container mx-auto px-4">
        <VisitPlannerComponent />
      </div>
    </div>
  );
};