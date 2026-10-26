import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, Star, Sparkles, RotateCcw, Award } from 'lucide-react';
import { FRUITS, FruitData, SeedCategory } from '../types/fruit';
import { FruitIllustration } from './FruitIllustration';
import { sound } from '../utils/audio';

interface QuizQuestion {
  promptText: string;
  targetCategory: SeedCategory;
  categoryTitle: string;
  options: FruitData[];
  correctFruit: FruitData;
}

export const QuizGame: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);

  // Generate 8 playful questions
  const generateQuestions = (): QuizQuestion[] => {
    const manySeedFruits = FRUITS.filter(f => f.category === 'biji-banyak');
    const fewSeedFruits = FRUITS.filter(f => f.category === 'biji-sedikit');

    const generated: QuizQuestion[] = [];

    // 4 "Biji Banyak" questions
    for (let i = 0; i < 4; i++) {
      const correctFruit = manySeedFruits[i % manySeedFruits.length];
      const otherFruits = [...fewSeedFruits].sort(() => Math.random() - 0.5).slice(0, 2);
      const options = [correctFruit, ...otherFruits].sort(() => Math.random() - 0.5);

      generated.push({
        promptText: 'Manakah buah yang berbiji BANYAK?',
        targetCategory: 'biji-banyak',
        categoryTitle: 'Biji Sangat Banyak',
        options,
        correctFruit,
      });
    }

    // 4 "Biji Sedikit / Satu Biji" questions
    for (let i = 0; i < 4; i++) {
      const correctFruit = fewSeedFruits[i % fewSeedFruits.length];
      const otherFruits = [...manySeedFruits].sort(() => Math.random() - 0.5).slice(0, 2);
      const options = [correctFruit, ...otherFruits].sort(() => Math.random() - 0.5);

      generated.push({
        promptText: 'Manakah buah yang berbiji SEDIKIT atau HANYA SATU BIJI?',
        targetCategory: 'biji-sedikit',
        categoryTitle: 'Biji Sedikit / Satu Biji',
        options,
        correctFruit,
      });
    }

    return generated.sort(() => Math.random() - 0.5);
  };

  const startQuiz = () => {
    const qs = generateQuestions();
    setQuestions(qs);
    setCurrentQIndex(0);
    setScore(0);
    setSelectedOptionId(null);
    setFeedback(null);
    setIsQuizComplete(false);

    // Speak initial question
    const firstQ = qs[0];
    if (firstQ) {
      sound.speak(firstQ.promptText);
    }
  };

  useEffect(() => {
    startQuiz();
  }, []);

  const currentQ = questions[currentQIndex];

  const handleSpeakQuestion = () => {
    if (!currentQ) return;
    sound.speak(currentQ.promptText);
  };

  const handleOptionSelect = (fruit: FruitData) => {
    if (selectedOptionId !== null || !currentQ) return;
    setSelectedOptionId(fruit.id);

    if (fruit.id === currentQ.correctFruit.id) {
      // Correct!
      setFeedback('correct');
      sound.playSuccessChime();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });

      const nextScore = score + 1;
      setScore(nextScore);

      const praise = `Horeee! Tepat sekali! ${fruit.name} adalah buah yang ${fruit.seedExplanation}`;
      sound.speak(praise, () => {
        setTimeout(() => {
          if (currentQIndex + 1 < questions.length) {
            setCurrentQIndex(currentQIndex + 1);
            setSelectedOptionId(null);
            setFeedback(null);
            const nextQ = questions[currentQIndex + 1];
            sound.speak(nextQ.promptText);
          } else {
            setIsQuizComplete(true);
            sound.playFanfare();
            sound.speak(`Luar biasa! Kamu menyelesaikan kuis dengan nilai ${nextScore} dari ${questions.length}!`);
          }
        }, 1200);
      });
    } else {
      // Incorrect
      setFeedback('wrong');
      sound.playSoftTryAgain();
      const encouragement = `Belum tepat sayang. ${fruit.name} ${fruit.category === 'biji-banyak' ? 'berbiji banyak' : 'berbiji sedikit'}. Ayo coba tebak buah yang lain!`;
      sound.speak(encouragement, () => {
        setTimeout(() => {
          setSelectedOptionId(null);
          setFeedback(null);
        }, 1200);
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top HUD */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-amber-200 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 rounded-2xl text-amber-800">
            <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-700">
              Skor Kuis:
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-950">
              {score} / {questions.length}
            </div>
          </div>
        </div>

        <div className="text-sm font-extrabold text-amber-800 bg-amber-50 px-3.5 py-1.5 rounded-full border border-amber-200">
          Soal {currentQIndex + 1} dari {questions.length}
        </div>

        <button
          onClick={startQuiz}
          className="px-3.5 py-2 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Mulai Ulang</span>
        </button>
      </div>

      {!isQuizComplete && currentQ ? (
        <div className="space-y-6">
          {/* Question Banner */}
          <div className="bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-300 rounded-3xl p-6 shadow-md border-2 border-amber-300 text-center space-y-3 relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 text-amber-950 text-xs sm:text-sm font-extrabold shadow-2xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Tebak Cepat Bergambar</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-tight flex items-center justify-center gap-3">
              <span>{currentQ.promptText}</span>
              <button
                onClick={handleSpeakQuestion}
                aria-label="Dengarkan soal"
                className="p-2.5 rounded-full bg-white text-amber-800 shadow-sm hover:scale-110 transition-transform cursor-pointer"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-amber-900/90">
              Ketuk salah satu buah di bawah ini yang paling tepat!
            </p>
          </div>

          {/* Three Giant Fruit Choice Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {currentQ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isCorrectFruit = option.id === currentQ.correctFruit.id;

              let cardStyle = 'bg-white border-2 border-stone-200 hover:border-amber-400 hover:shadow-lg';
              if (isSelected) {
                if (feedback === 'correct') {
                  cardStyle = 'bg-emerald-50 border-4 border-emerald-500 shadow-xl ring-4 ring-emerald-200 scale-103';
                } else if (feedback === 'wrong') {
                  cardStyle = 'bg-rose-50 border-4 border-rose-500 shadow-md animate-shake';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOptionId !== null}
                  className={`rounded-3xl p-6 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between gap-4 text-center group active:scale-95 ${cardStyle}`}
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs font-black uppercase px-2.5 py-1 rounded-lg bg-stone-100 text-stone-600">
                      PILIHAN
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.speak(option.name);
                      }}
                      className="p-1.5 rounded-full text-stone-400 hover:text-amber-600 hover:bg-amber-50"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sliced cross section is shown so kids clearly see seeds! */}
                  <div className="py-2">
                    <FruitIllustration
                      fruit={option}
                      isSliced={true}
                      size="lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-black text-stone-900">
                      {option.name}
                    </div>
                    {isSelected && feedback === 'correct' && (
                      <div className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full animate-bounce">
                        🎉 Jawaban Benar!
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Quiz Completed Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border-2 border-amber-300 text-center max-w-lg mx-auto space-y-6">
          <div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-5xl shadow-inner animate-bounce">
            🎖️
          </div>

          <div className="space-y-2">
            <span className="px-3.5 py-1 bg-amber-100 text-amber-800 rounded-full font-black text-xs uppercase">
              Kuis Selesai!
            </span>
            <h2 className="text-3xl font-black text-amber-950">
              Hebat Sekali, Sahabat Buah!
            </h2>
            <p className="text-stone-600 text-base font-medium">
              Kamu berhasil menjawab dengan benar <b>{score} dari {questions.length}</b> pertanyaan!
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            <span className="font-extrabold text-amber-900">
              Sertifikat Anak Pintar Mengenal Buah 🌟
            </span>
          </div>

          <button
            onClick={startQuiz}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Main Kuis Lagi</span>
          </button>
        </div>
      )}
    </div>
  );
};
