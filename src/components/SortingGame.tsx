import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Star, Volume2, RotateCcw, CheckCircle2, Heart } from 'lucide-react';
import { FRUITS, FruitData, SeedCategory } from '../types/fruit';
import { FruitIllustration } from './FruitIllustration';
import { sound } from '../utils/audio';

export const SortingGame: React.FC = () => {
  const [deck, setDeck] = useState<FruitData[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isSliced, setIsSliced] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<{
    type: 'correct' | 'wrong' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isRoundFinished, setIsRoundFinished] = useState<boolean>(false);

  // Initialize randomized game deck
  const startNewGame = () => {
    const shuffled = [...FRUITS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setIsSliced(true);
    setFeedback({ type: null, message: '' });
    setIsRoundFinished(false);

    // Speak initial instructions
    sound.playPop();
    const firstFruit = shuffled[0];
    if (firstFruit) {
      sound.speak(`Ayo masukkan ${firstFruit.name} ke keranjang yang tepat! Apakah berbiji sedikit atau berbiji banyak?`);
    }
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const currentFruit = deck[currentIndex];

  const handleBasketClick = (selectedCategory: SeedCategory) => {
    if (!currentFruit || feedback.type !== null) return;

    if (currentFruit.category === selectedCategory) {
      // Correct answer!
      sound.playSuccessChime();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
      });

      const nextScore = score + 1;
      setScore(nextScore);

      const praiseWords = ['Pintar sekali!', 'Hebat!', 'Luar biasa!', 'Benar sekali!'];
      const randomPraise = praiseWords[Math.floor(Math.random() * praiseWords.length)];
      const praiseMessage = `${randomPraise} ${currentFruit.name} berbiji ${currentFruit.category === 'biji-banyak' ? 'banyak' : 'sedikit'}!`;

      setFeedback({
        type: 'correct',
        message: praiseMessage,
      });

      sound.speak(praiseMessage, () => {
        // Move to next fruit or finish round
        setTimeout(() => {
          if (currentIndex + 1 < deck.length) {
            setCurrentIndex(currentIndex + 1);
            setFeedback({ type: null, message: '' });
            const nextFruit = deck[currentIndex + 1];
            sound.speak(`Sekarang, buah ${nextFruit.name}! Masuk keranjang mana ya?`);
          } else {
            setIsRoundFinished(true);
            sound.playFanfare();
            sound.speak('Horeee! Kamu berhasil memilah semua buah dengan sangat pintar!');
          }
        }, 600);
      });
    } else {
      // Incorrect attempt
      sound.playSoftTryAgain();
      const encouragement = `Wah hampir tepat! ${currentFruit.name} ${currentFruit.category === 'biji-banyak' ? 'punya banyak biji' : 'hanya punya sedikit biji'}. Coba lagi ya!`;
      setFeedback({
        type: 'wrong',
        message: encouragement,
      });
      sound.speak(encouragement, () => {
        setTimeout(() => {
          setFeedback({ type: null, message: '' });
        }, 1200);
      });
    }
  };

  const handleSpeakCurrentFruit = () => {
    if (!currentFruit) return;
    sound.speak(`Ini buah ${currentFruit.name}. Masukkan ke keranjang berbiji sedikit atau berbiji banyak?`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Game HUD: Progress and Stars */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-amber-200 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-100 rounded-2xl text-amber-800">
            <Star className="w-6 h-6 fill-amber-400 text-amber-500" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-amber-700">
              Bintang Terkumpul:
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-950 flex items-center gap-1">
              <span>{score}</span>
              <span className="text-sm font-bold text-stone-400">/ {deck.length}</span>
            </div>
          </div>
        </div>

        {/* Visual Progress Stars */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {deck.map((_, idx) => (
            <div
              key={idx}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                idx < currentIndex
                  ? 'bg-amber-400 text-amber-950 shadow-xs scale-105'
                  : idx === currentIndex
                  ? 'bg-amber-100 text-amber-800 border-2 border-amber-400 animate-pulse'
                  : 'bg-stone-100 text-stone-400'
              }`}
            >
              {idx < currentIndex ? '⭐' : idx + 1}
            </div>
          ))}
        </div>

        <button
          onClick={startNewGame}
          className="px-3.5 py-2 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Game</span>
        </button>
      </div>

      {!isRoundFinished && currentFruit ? (
        <div className="space-y-6">
          {/* Question / Instruction Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-sm font-extrabold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Tantangan Memilah Buah</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-amber-950 flex items-center justify-center gap-2">
              <span>Masukkan</span>
              <span className="text-amber-600 underline decoration-amber-400 decoration-wavy">
                {currentFruit.name}
              </span>
              <span>ke mana ya?</span>
            </h2>
            <p className="text-sm text-stone-600 font-medium">
              Ketuk keranjang yang cocok di bawah ini sesuai jumlah bijinya!
            </p>
          </div>

          {/* Current Fruit Active Stage Card */}
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 shadow-md border-2 border-amber-300 flex flex-col items-center justify-center gap-3 relative overflow-hidden">
            {/* View Mode Toggle for Kids */}
            <div className="w-full flex items-center justify-between">
              <button
                onClick={() => {
                  sound.playPop();
                  setIsSliced(!isSliced);
                }}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
              >
                {isSliced ? '🍎 Lihat Buah Utuh' : '🔪 Lihat Biji di Dalam'}
              </button>

              <button
                onClick={handleSpeakCurrentFruit}
                aria-label="Ulangi instruksi suara"
                className="p-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-xs"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Big Fruit Vector */}
            <div
              className={`p-2 transition-transform duration-300 ${
                feedback.type === 'wrong' ? 'animate-shake' : ''
              }`}
            >
              <FruitIllustration fruit={currentFruit} isSliced={isSliced} size="lg" />
            </div>

            <div className="text-xl font-black text-stone-800">
              {currentFruit.name}
            </div>

            {/* Instant Feedback Banner */}
            {feedback.message && (
              <div
                className={`w-full py-2.5 px-4 rounded-2xl text-center font-bold text-sm sm:text-base animate-bounce ${
                  feedback.type === 'correct'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                {feedback.message}
              </div>
            )}
          </div>

          {/* The Two Giant Baskets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Left Basket: Biji Sedikit / Satu Biji */}
            <button
              onClick={() => handleBasketClick('biji-sedikit')}
              disabled={feedback.type !== null}
              className="group text-left bg-gradient-to-b from-emerald-50 to-emerald-100/70 hover:to-emerald-100 rounded-3xl p-6 border-3 border-emerald-300 hover:border-emerald-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 active:scale-98 flex flex-col sm:flex-row items-center gap-5 cursor-pointer disabled:opacity-80"
            >
              <div className="relative shrink-0">
                <img
                  src="/src/assets/images/basket_single_seed_1792978065967.jpg"
                  alt="Keranjang Biji Sedikit"
                  className="w-36 h-36 sm:w-44 sm:h-44 object-cover rounded-2xl border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                />
                <span className="absolute -top-2 -left-2 bg-emerald-600 text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-xs">
                  1 BIJI BESAR
                </span>
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-extrabold">
                  🧺 KERANJANG HIJAU
                </div>
                <h3 className="text-2xl font-black text-emerald-950">
                  Biji Sedikit / Satu Biji
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800/90 font-medium leading-relaxed">
                  Untuk buah seperti <b>Mangga</b>, <b>Alpukat</b>, <b>Rambutan</b>, dan <b>Apel</b> yang hanya memiliki satu atau sedikit biji.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-emerald-600 text-white font-black text-sm group-hover:bg-emerald-700 transition-colors shadow-xs">
                    <span>Pilih Keranjang Ini</span>
                    <span>👉</span>
                  </span>
                </div>
              </div>
            </button>

            {/* Right Basket: Biji Banyak */}
            <button
              onClick={() => handleBasketClick('biji-banyak')}
              disabled={feedback.type !== null}
              className="group text-left bg-gradient-to-b from-rose-50 to-rose-100/70 hover:to-rose-100 rounded-3xl p-6 border-3 border-rose-300 hover:border-rose-500 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 active:scale-98 flex flex-col sm:flex-row items-center gap-5 cursor-pointer disabled:opacity-80"
            >
              <div className="relative shrink-0">
                <img
                  src="/src/assets/images/basket_many_seeds_1792978064902.jpg"
                  alt="Keranjang Biji Banyak"
                  className="w-36 h-36 sm:w-44 sm:h-44 object-cover rounded-2xl border-4 border-white shadow-md group-hover:scale-105 transition-transform"
                />
                <span className="absolute -top-2 -left-2 bg-rose-600 text-white px-2.5 py-1 rounded-xl text-xs font-black shadow-xs">
                  BANYAK BIJI
                </span>
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-200 text-rose-900 text-xs font-extrabold">
                  🧺 KERANJANG MERAH
                </div>
                <h3 className="text-2xl font-black text-rose-950">
                  Biji Sangat Banyak
                </h3>
                <p className="text-xs sm:text-sm text-rose-800/90 font-medium leading-relaxed">
                  Untuk buah seperti <b>Semangka</b>, <b>Pepaya</b>, <b>Buah Naga</b>, dan <b>Melon</b> yang memiliki puluhan atau ratusan biji.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-rose-600 text-white font-black text-sm group-hover:bg-rose-700 transition-colors shadow-xs">
                    <span>Pilih Keranjang Ini</span>
                    <span>👉</span>
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Round Completed Celebration Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg border-2 border-amber-300 text-center max-w-xl mx-auto space-y-6">
          <div className="w-24 h-24 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-5xl shadow-inner animate-bounce">
            🏆
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-black text-xs uppercase tracking-wider">
              Luar Biasa Hebat!
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-amber-950">
              Semua Buah Berhasil Disortir!
            </h2>
            <p className="text-stone-600 text-base font-medium">
              Kamu telah mengumpulkan <b>{score} Bintang Emas</b>! Adik-adik sekarang sudah mengerti perbedaan buah berbiji banyak dan sedikit!
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span className="font-extrabold text-amber-900 text-base">
              Piala Juara Memilah Buah TK 🌟
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={startNewGame}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Main Lagi!</span>
            </button>

            <button
              onClick={() => {
                sound.speak(`Kamu hebat sekali! Mendapatkan nilai sempurna ${score} bintang!`);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-extrabold text-base border border-stone-300 transition-all flex items-center justify-center gap-2"
            >
              <Volume2 className="w-5 h-5" />
              <span>Dengar Pujian</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
