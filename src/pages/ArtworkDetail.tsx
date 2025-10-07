// src/pages/ArtworkDetail.tsx
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trophy, Award, BookOpen, CheckCircle } from 'lucide-react';
import { getArtworkById } from '../data/data';
import { Quiz, QuizQuestion } from '../components/Quiz';
import '@google/model-viewer';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

const badgeTemplates = {
  artwork_novice: {
    id: 'badge_artwork_novice',
    name: '🎯 Explorateur d\'œuvre',
    description: 'Premier quiz d\'œuvre terminé',
    icon: '🎯'
  },
  artwork_connaisseur: {
    id: 'badge_artwork_connaisseur',
    name: '🎨 Connaisseur d\'art',
    description: 'Score supérieur à 60% sur un quiz d\'œuvre',
    icon: '🎨'
  },
  artwork_expert: {
    id: 'badge_artwork_expert',
    name: '🏆 Expert d\'œuvre',
    description: 'Score supérieur à 80% sur un quiz d\'œuvre',
    icon: '🏆'
  },
  artwork_parfait: {
    id: 'badge_artwork_parfait',
    name: '💎 Maître de l\'œuvre',
    description: 'Score parfait 100% sur un quiz d\'œuvre',
    icon: '💎'
  }
};

export const ArtworkDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const artwork = getArtworkById(id || '');
  const [activeTab, setActiveTab] = useState<'description' | 'history' | 'cultural'>('description');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState<Badge[]>([]);

  const lang = i18n.language as 'fr' | 'en' | 'wo';
  
  // Créer les questions du quiz basées sur l'œuvre actuelle
  const createArtworkQuiz = (): QuizQuestion[] => {
    if (!artwork) return [];
    
    const questions: QuizQuestion[] = [];

    // Question 1 : Quiz original de data.ts
    questions.push({
      id: 1,
      question: artwork.quiz.question[lang],
      options: artwork.quiz.options[lang],
      correctAnswer: artwork.quiz.correctAnswer,
      explanation: t('quizExplanation1', 'Cette réponse se trouve dans la description de l\'œuvre.')
    });

    // Question 2 : Sur la période
    const periodOptions = [artwork.period, "2000-2010", "1500-1600", "1800-1850"];
    questions.push({
      id: 2,
      question: lang === 'fr' ? "De quelle période date cette œuvre?" : 
                lang === 'en' ? "From which period does this artwork date?" :
                "Lan moy période bu liggéey bii?",
      options: periodOptions,
      correctAnswer: 0,
      explanation: lang === 'fr' ? `Cette œuvre date de ${artwork.period}.` :
                   lang === 'en' ? `This artwork dates from ${artwork.period}.` :
                   `Liggéey bii dafa jóge ci ${artwork.period}.`
    });

    // Question 3 : Sur l'origine
    const originOptions = [artwork.origin, "Bamako, Mali", "Abidjan, Côte d'Ivoire", "Accra, Ghana"];
    questions.push({
      id: 3,
      question: lang === 'fr' ? "Quelle est l'origine géographique de cette œuvre?" :
                lang === 'en' ? "What is the geographical origin of this artwork?" :
                "Lan moy origine géographique bu liggéey bii?",
      options: originOptions,
      correctAnswer: 0,
      explanation: lang === 'fr' ? `Cette œuvre vient de ${artwork.origin}.` :
                   lang === 'en' ? `This artwork comes from ${artwork.origin}.` :
                   `Liggéey bii dafa jóge ci ${artwork.origin}.`
    });

    // Question 4 : Sur la catégorie
    const categoryOptions = [artwork.category, "Art Moderne", "Sculptures", "Photographie"];
    questions.push({
      id: 4,
      question: lang === 'fr' ? "À quelle catégorie appartient cette œuvre?" :
                lang === 'en' ? "To which category does this artwork belong?" :
                "Lan moy catégorie bu liggéey bii?",
      options: categoryOptions,
      correctAnswer: 0,
      explanation: lang === 'fr' ? `Cette œuvre appartient à la catégorie "${artwork.category}".` :
                   lang === 'en' ? `This artwork belongs to the "${artwork.category}" category.` :
                   `Liggéey bii dafa nekk ci catégorie "${artwork.category}".`
    });

    // Question 5 : Sur la signification culturelle
    const culturalText = artwork.culturalSignificance[lang];
    const shortText = culturalText.length > 60 ? culturalText.slice(0, 60) + "..." : culturalText;
    
    questions.push({
      id: 5,
      question: lang === 'fr' ? "Quelle est l'importance culturelle de cette œuvre?" :
                lang === 'en' ? "What is the cultural importance of this artwork?" :
                "Lan moy importance culturelle bu liggéey bii?",
      options: lang === 'fr' ?
        [
          shortText,
          "Elle servait uniquement de décoration",
          "Elle était utilisée pour le commerce",
          "Elle n'avait pas de signification"
        ] :
        lang === 'en' ?
        [
          shortText,
          "It was used only for decoration",
          "It was used for trade",
          "It had no significance"
        ] :
        [
          shortText,
          "Dafa jëfandikoo wala décoration rekk",
          "Dañu koy jëfandikoo ci jàllante",
          "Amul signification"
        ],
      correctAnswer: 0,
      explanation: culturalText
    });

    return questions;
  };

  const quizQuestions = createArtworkQuiz();
  const hasQuiz = quizQuestions.length > 0;

  // Récupérer le score précédent pour cette œuvre
  const artworkScores = JSON.parse(localStorage.getItem('artwork_quiz_scores') || '{}');
  const previousScore = artworkScores[id || ''];

  const getActiveText = () => {
    if (!artwork) return '';
    switch (activeTab) {
      case 'description':
        return artwork.description[lang];
      case 'history':
        return artwork.history[lang];
      case 'cultural':
        return artwork.culturalSignificance[lang];
      default:
        return '';
    }
  };

  const toggleSpeech = () => {
    const text = getActiveText();
    if (!text) return;

    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'fr' ? 'fr-FR' : lang === 'en' ? 'en-US' : 'wo-SN';
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handleQuizComplete = (score: number, total: number) => {
    setFinalScore(score);
    setTotalQuestions(total);
    
    const percentage = (score / total) * 100;

    // Incrémenter le compteur de quiz complétés
    const quizzesCompleted = parseInt(localStorage.getItem('quizzesCompleted') || '0') + 1;
    localStorage.setItem('quizzesCompleted', quizzesCompleted.toString());

    // Sauvegarder le score pour cette œuvre
    const updatedArtworkScores = {
      ...artworkScores,
      [id || '']: {
        score,
        total,
        percentage,
        completedAt: new Date().toISOString()
      }
    };
    localStorage.setItem('artwork_quiz_scores', JSON.stringify(updatedArtworkScores));

    // Déterminer les badges gagnés
    const newBadges: Badge[] = [];
    const existingBadges = JSON.parse(localStorage.getItem('loa_badges') || '[]');
    const existingBadgeIds = existingBadges.map((b: Badge) => b.id);

    if (!existingBadgeIds.includes(badgeTemplates.artwork_novice.id)) {
      newBadges.push({
        ...badgeTemplates.artwork_novice,
        earnedAt: new Date().toISOString()
      });
    }

    if (percentage >= 60 && !existingBadgeIds.includes(badgeTemplates.artwork_connaisseur.id)) {
      newBadges.push({
        ...badgeTemplates.artwork_connaisseur,
        earnedAt: new Date().toISOString()
      });
    }

    if (percentage >= 80 && !existingBadgeIds.includes(badgeTemplates.artwork_expert.id)) {
      newBadges.push({
        ...badgeTemplates.artwork_expert,
        earnedAt: new Date().toISOString()
      });
    }

    if (percentage === 100 && !existingBadgeIds.includes(badgeTemplates.artwork_parfait.id)) {
      newBadges.push({
        ...badgeTemplates.artwork_parfait,
        earnedAt: new Date().toISOString()
      });
    }

    if (newBadges.length > 0) {
      const allBadges = [...existingBadges, ...newBadges];
      localStorage.setItem('loa_badges', JSON.stringify(allBadges));
      setEarnedBadges(newBadges);
    }

    setQuizCompleted(true);
    setShowQuiz(false);
  };

  const handleStartQuiz = () => {
    // Scroll vers le quiz
    const quizSection = document.getElementById('quiz-section');
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRestartQuiz = () => {
    setQuizCompleted(false);
    setFinalScore(0);
    setTotalQuestions(0);
    setEarnedBadges([]);
    // Scroll vers le quiz
    setTimeout(() => {
      const quizSection = document.getElementById('quiz-section');
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  useEffect(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [activeTab]);

  if (!artwork) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-xl">{t('artworkNotFound', 'Œuvre non trouvée')}</p>
      </div>
    );
  }

  const percentage = quizCompleted ? (finalScore / totalQuestions) * 100 : 0;

  // Vue Principale de l'œuvre (TOUJOURS VISIBLE)
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image + AR */}
        <div className="relative">
          <img
            src={artwork.imageUrl}
            alt={artwork.title[lang]}
            className="w-full rounded-lg object-cover max-h-[500px]"
          />
         {artwork.arModel && (
  <Link 
    to={`/visite-virtuelle/${artwork.id}`}
    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
  >
    <button className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300">
      {t('viewInAR', 'Voir en Réalité Augmentée')}
    </button>
  </Link>
)}
        </div>

        {/* Infos + onglets */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{artwork.title[lang]}</h1>
          <p className="text-gray-400 mb-1">
            <span className="mr-4"><i className="fas fa-calendar-alt"></i> {artwork.period}</span>
            <span className="mr-4"><i className="fas fa-map-marker-alt"></i> {artwork.origin}</span>
            <span><i className="fas fa-tag"></i> {artwork.category}</span>
          </p>
          
          <div className="text-gray-300 mt-4 flex-grow">
            <p>{artwork.description[lang].slice(0, 700)}...</p>
          </div>
          
          {artwork.videoUrl && (
            <div className="mt-4">
              <a href={artwork.videoUrl} target="_blank" rel="noopener noreferrer">
                <button className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                  {t('viewVideo', 'Voir la vidéo')}
                </button>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Onglets */}
      <div className="container mx-auto px-4 mt-8">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'description' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('description')}
          >
            {t('description', 'Description')}
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('history')}
          >
            {t('history', 'Histoire')}
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'cultural' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('cultural')}
          >
            {t('culturalSignificance', 'Signification Culturelle')}
          </button>
        </div>

        {/* Contenu onglet */}
        <div className="bg-gray-900 p-6 rounded-b-lg shadow-md mt-2 text-gray-300 min-h-[150px]">
          <p>{getActiveText()}</p>
          <button
            onClick={toggleSpeech}
            className="mt-4 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
          >
            {isSpeaking ? t('stopReading', 'Arrêter') : t('readDescription', 'Lire le texte')}
          </button>
        </div>

        {/* Section Quiz - À la fin de la page */}
        {hasQuiz && (
          <div id="quiz-section" className="mt-12 scroll-mt-20">
            {!quizCompleted ? (
              <>
                {/* Carte d'invitation au quiz */}
                <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-lg p-6 border border-yellow-600/50 mb-8">
                  <div className="flex items-start gap-4">
                    <BookOpen className="w-12 h-12 text-yellow-400 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        {t('testYourKnowledge', 'Testez vos connaissances')}
                        {previousScore && (
                          <span className="text-sm font-normal text-gray-400">
                            (Meilleur score: {previousScore.score}/{previousScore.total})
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-300 mb-4">
                        Découvrez combien vous savez sur cette œuvre à travers un quiz interactif de {quizQuestions.length} questions.
                        Apprenez-en plus sur son histoire, sa signification et son contexte culturel.
                      </p>
                      
                      {previousScore && (
                        <div className="mb-4 flex items-center gap-2 text-green-400">
                          <CheckCircle size={20} />
                          <span>Quiz déjà complété avec {previousScore.percentage.toFixed(0)}%</span>
                        </div>
                      )}

                      <button
                        onClick={handleStartQuiz}
                        className="bg-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors flex items-center gap-2"
                      >
                        <Trophy size={20} />
                        {previousScore ? t('retakeQuiz', 'Refaire le quiz') : t('startQuiz', 'Lancer le quiz')}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Le Quiz lui-même */}
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-lg p-6">
                  <Quiz
                    questions={quizQuestions}
                    onComplete={handleQuizComplete}
                    title={`Quiz sur ${artwork.title[lang]}`}
                  />
                </div>
              </>
            ) : (
              /* Résultats du Quiz */
              <div className="bg-gray-800 rounded-xl p-8 border border-yellow-600/30">
                <div className="text-center mb-6">
                  <Trophy className="w-20 h-20 text-yellow-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">{t('quizCompleted', 'Quiz Terminé !')}</h2>
                  <p className="text-gray-400">{t('yourKnowledge', 'Vos connaissances sur cette œuvre')}</p>
                </div>

                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-yellow-600">
                        {finalScore}/{totalQuestions}
                      </div>
                      <div className="text-2xl text-gray-400 mt-2">
                        {percentage.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                    <div
                      className="bg-gradient-to-r from-yellow-600 to-yellow-500 h-4 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <p className="text-center text-lg">
                    {percentage === 100 && "🎉 Parfait ! Vous maîtrisez cette œuvre !"}
                    {percentage >= 80 && percentage < 100 && "👏 Excellent ! Très bonne connaissance !"}
                    {percentage >= 60 && percentage < 80 && "👍 Bien joué ! Bonne compréhension !"}
                    {percentage < 60 && "💪 Continuez à explorer cette œuvre !"}
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

                <button
                  onClick={handleRestartQuiz}
                  className="w-full bg-yellow-600 text-black py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                >
                  {t('retakeQuiz', 'Refaire le quiz')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function setShowQuiz(arg0: boolean) {
  throw new Error('Function not implemented.');
}
