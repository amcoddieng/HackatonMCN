import { useState } from 'react';
import { Trophy, CheckCircle, XCircle } from 'lucide-react';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
  title?: string;
}

export const Quiz = ({ questions, onComplete, title = "Quiz" }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleValidate = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz terminé
      const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
      onComplete(finalScore, questions.length);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* En-tête avec progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="text-yellow-600" />
            {title}
          </h1>
          <div className="text-yellow-600 font-bold">
            {currentQuestion + 1}/{questions.length}
          </div>
        </div>
        
        {/* Barre de progression */}
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-yellow-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-gray-800 rounded-xl p-6 border border-yellow-600/30 mb-6">
        <h2 className="text-xl font-semibold mb-6">
          {questions[currentQuestion].question}
        </h2>

        {/* Options de réponse */}
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === questions[currentQuestion].correctAnswer;
            const showResult = showExplanation;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  showResult && isCorrect
                    ? 'bg-green-900/30 border-green-500'
                    : showResult && isSelected && !isCorrect
                    ? 'bg-red-900/30 border-red-500'
                    : isSelected
                    ? 'bg-yellow-600/20 border-yellow-600'
                    : 'bg-gray-900/50 border-gray-700 hover:border-yellow-600/50'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && isCorrect && <CheckCircle className="text-green-500" size={24} />}
                  {showResult && isSelected && !isCorrect && <XCircle className="text-red-500" size={24} />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explication */}
        {showExplanation && questions[currentQuestion].explanation && (
          <div className={`mt-6 p-4 rounded-lg ${
            selectedAnswer === questions[currentQuestion].correctAnswer
              ? 'bg-green-900/20 border border-green-500'
              : 'bg-blue-900/20 border border-blue-500'
          }`}>
            <p className="text-sm">{questions[currentQuestion].explanation}</p>
          </div>
        )}
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-4">
        {!showExplanation ? (
          <button
            onClick={handleValidate}
            disabled={selectedAnswer === null}
            className={`flex-1 py-4 rounded-lg font-bold transition-colors ${
              selectedAnswer !== null
                ? 'bg-yellow-600 text-black hover:bg-yellow-500'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 bg-yellow-600 text-black py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
          </button>
        )}
      </div>

      {/* Score actuel */}
      <div className="mt-6 text-center text-gray-400">
        Score actuel: <span className="text-yellow-600 font-bold">{score}</span> / {currentQuestion + (showExplanation ? 1 : 0)}
      </div>
    </div>
  );
};
