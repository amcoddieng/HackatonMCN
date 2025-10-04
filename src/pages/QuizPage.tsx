import { useState } from 'react';
import { Trophy, Award, Star, Home } from 'lucide-react';
import { Quiz, QuizQuestion } from '../components/Quiz';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

// Questions mockées sur la culture et l'art africain
const culturalQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Que représente principalement cette tapisserie?",
    options: ["Des batailles", "Des migrations", "Des mariages", "Des récoltes"],
    correctAnswer: 0,
    explanation: "Cette tapisserie historique représente des scènes de batailles importantes dans l'histoire wolof."
  },
  {
    id: 2,
    question: "Quel royaume wolof était connu pour sa puissance militaire?",
    options: ["Sine", "Cayor", "Saloum", "Walo"],
    correctAnswer: 1,
    explanation: "Le royaume du Cayor était réputé pour sa puissance militaire et ses Damel (rois) guerriers."
  },
  {
    id: 3,
    question: "Quelle est la signification des masques traditionnels?",
    options: ["Décoration uniquement", "Protection spirituelle", "Commerce", "Jeux"],
    correctAnswer: 1,
    explanation: "Les masques traditionnels avaient une fonction spirituelle et protectrice importante dans les rituels."
  },
  {
    id: 4,
    question: "Quel instrument est emblématique de la musique wolof?",
    options: ["Djembé", "Kora", "Sabar", "Balafon"],
    correctAnswer: 2,
    explanation: "Le Sabar est l'instrument de percussion emblématique de la culture wolof."
  },
  {
    id: 5,
    question: "Que symbolise la couleur jaune dans les textiles traditionnels?",
    options: ["La mort", "La richesse et la royauté", "La guerre", "L'eau"],
    correctAnswer: 1,
    explanation: "Le jaune symbolise la richesse, la royauté et la prospérité dans les textiles traditionnels sénégalais."
  }
];

const badgeTemplates = {
  novice: {
    id: 'badge_novice',
    name: '🌟 Explorateur Novice',
    description: 'Premier quiz terminé',
    icon: '🌟'
  },
  connaisseur: {
    id: 'badge_connaisseur',
    name: '🎓 Connaisseur Culturel',
    description: 'Score supérieur à 60%',
    icon: '🎓'
  },
  expert: {
    id: 'badge_expert',
    name: '👑 Expert du Patrimoine',
    description: 'Score supérieur à 80%',
    icon: '👑'
  },
  parfait: {
    id: 'badge_parfait',
    name: '⭐ Maître des Savoirs',
    description: 'Score parfait 100%',
    icon: '⭐'
  }
};

export default function QuizPage() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);
  const [showQuiz, setShowQuiz] = useState(true);

  const handleQuizComplete = (score: number, total: number) => {
    setFinalScore(score);
    setTotalQuestions(total);
    
    const percentage = (score / total) * 100;

    // Incrémenter le compteur de quiz complétés
    const quizzesCompleted = parseInt(localStorage.getItem('quizzesCompleted') || '0') + 1;
    localStorage.setItem('quizzesCompleted', quizzesCompleted.toString());

    // Déterminer les badges gagnés
    const newBadges: Badge[] = [];
    const existingBadges = JSON.parse(localStorage.getItem('loa_badges') || '[]');
    const existingBadgeIds = existingBadges.map((b: Badge) => b.id);

    // Badge Novice (toujours gagné au premier quiz)
    if (!existingBadgeIds.includes(badgeTemplates.novice.id)) {
      newBadges.push({
        ...badgeTemplates.novice,
        earnedAt: new Date().toISOString()
      });
    }

    // Badge Connaisseur (60%+)
    if (percentage >= 60 && !existingBadgeIds.includes(badgeTemplates.connaisseur.id)) {
      newBadges.push({
        ...badgeTemplates.connaisseur,
        earnedAt: new Date().toISOString()
      });
    }

    // Badge Expert (80%+)
    if (percentage >= 80 && !existingBadgeIds.includes(badgeTemplates.expert.id)) {
      newBadges.push({
        ...badgeTemplates.expert,
        earnedAt: new Date().toISOString()
      });
    }

    // Badge Parfait (100%)
    if (percentage === 100 && !existingBadgeIds.includes(badgeTemplates.parfait.id)) {
      newBadges.push({
        ...badgeTemplates.parfait,
        earnedAt: new Date().toISOString()
      });
    }

    // Sauvegarder les nouveaux badges
    if (newBadges.length > 0) {
      const allBadges = [...existingBadges, ...newBadges];
      localStorage.setItem('loa_badges', JSON.stringify(allBadges));
      setEarnedBadges(newBadges);
    }

    setQuizCompleted(true);
    setShowQuiz(false);
  };

  const handleRestart = () => {
    setShowQuiz(true);
    setQuizCompleted(false);
    setFinalScore(0);
    setTotalQuestions(0);
    setEarnedBadges([]);
  };

  const percentage = quizCompleted ? (finalScore / totalQuestions) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      {showQuiz ? (
        <Quiz
          questions={culturalQuizQuestions}
          onComplete={handleQuizComplete}
          title="Testez vos connaissances"
        />
      ) : (
        <div className="max-w-2xl mx-auto">
          {/* Écran de résultats */}
          <div className="bg-gray-800 rounded-xl p-8 border border-yellow-600/30 mb-6">
            <div className="text-center mb-6">
              <Trophy className="w-20 h-20 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Quiz Terminé !</h2>
              <p className="text-gray-400">Voici vos résultats</p>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-6xl font-bold text-yellow-600">{finalScore}/{totalQuestions}</div>
                  <div className="text-2xl text-gray-400 mt-2">{percentage.toFixed(0)}%</div>
                </div>
              </div>

              {/* Barre de progression */}
              <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                <div
                  className="bg-gradient-to-r from-yellow-600 to-yellow-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="text-center text-lg">
                {percentage === 100 && "🎉 Parfait ! Vous êtes un véritable expert !"}
                {percentage >= 80 && percentage < 100 && "👏 Excellent ! Très belle performance !"}
                {percentage >= 60 && percentage < 80 && "👍 Bien joué ! Bonne connaissance !"}
                {percentage < 60 && "💪 Continuez à apprendre, vous progressez !"}
              </p>
            </div>

            {/* Badges gagnés */}
            {earnedBadges.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-lg p-6 border border-yellow-600/50 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold">Nouveaux Badges Débloqués !</h3>
                </div>
                <div className="space-y-3">
                  {earnedBadges.map((badge) => (
                    <div key={badge.id} className="bg-gray-900/50 rounded-lg p-4 flex items-center gap-4 animate-pulse">
                      <div className="text-4xl">{badge.icon}</div>
                      <div>
                        <div className="font-bold text-yellow-600">{badge.name}</div>
                        <div className="text-sm text-gray-400">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Statistiques */}
            <div className="bg-gray-900 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Quiz complétés</div>
                  <div className="text-2xl font-bold">{localStorage.getItem('quizzesCompleted') || '0'}</div>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-400">Badges totaux</div>
                  <div className="text-2xl font-bold">
                    {JSON.parse(localStorage.getItem('loa_badges') || '[]').length}
                  </div>
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 bg-yellow-600 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
              >
                Recommencer
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
              >
                <Home size={20} />
                Accueil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}