import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Volume2, Star } from 'lucide-react';
import { FRUITS, FruitData } from '../types/fruit';
import { FruitIllustration } from './FruitIllustration';
import { sound } from '../utils/audio';

export const CountGame: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = useState<FruitData>(FRUITS[0]);
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleFruitChange = (fruit: FruitData) => {
    sound.playPop();
    setSelectedFruit(fruit);
    setTappedIndices([]);
    setIsCompleted(false);
    sound.speak(`Ayo hitung biji buah ${fruit.name}! Ketuk biji di dalam buah.`);
  };

  const handleResetCount = () => {
    sound.playPop();
    setTappedIndices([]);
    setIsCompleted(false);
  };

  const numberWords = [
    'Satu', 'Dua', 'Tiga', 'Empat', 'Lima',
    'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh',
    'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas',
  ];

  const handleSeedClick = (index: number) => {
    if (tappedIndices.includes(index)) {
      sound.playPop();
      return;
    }

    const nextIndices = [...tappedIndices, index];
    setTappedIndices(nextIndices);
    const count = nextIndices.length;

    sound.playSeedCount(count);

    const countWord = numberWords[count - 1] || `${count}`;

    if (nextIndices.length === selectedFruit.seeds.length) {
      // Completed all seeds on this fruit
      setIsCompleted(true);
      sound.playSuccessChime();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
      });

      const completionMessage =
        selectedFruit.category === 'biji-sedikit'
          ? `${countWord}! Selesai! Buah ${selectedFruit.name} bijinya cuma sedikit atau satu biji besar saja!`
          : `${countWord}! Wah hebat! Biji ${selectedFruit.name} buaanyaaak sekali!`;

      sound.speak(completionMessage);
    } else {
      sound.speak(countWord);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Title & Instructions Banner */}
      <div className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 rounded-3xl p-6 shadow-md border-2 border-emerald-300 text-emerald-950 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 text-emerald-950 text-xs sm:text-sm font-extrabold shadow-2xs">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Aktivitas Berhitung Anak TK</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-emerald-950 tracking-tight">
          Sentuh &amp; Hitung Biji Buah {selectedFruit.name}!
        </h2>
        <p className="text-sm sm:text-base font-semibold text-emerald-900/90 max-w-xl mx-auto">
          Ketuk setiap biji di dalam buah untuk mendengarkan hitungan suaranya satu persatu!
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-emerald-200 flex flex-col items-center justify-center gap-6">
        {/* Counter Badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-emerald-50 px-5 py-2.5 rounded-2xl border border-emerald-200">
            <span className="text-2xl">🌰</span>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-700">
                Biji Dihitung:
              </div>
              <div className="text-2xl font-black text-emerald-950">
                {tappedIndices.length} / {selectedFruit.seeds.length}
              </div>
            </div>
          </div>

          <button
            onClick={handleResetCount}
            className="p-3 rounded-2xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition-colors"
            title="Hitung Ulang"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              sound.speak(`Ayo sentuh biji di buah ${selectedFruit.name}.`);
            }}
            className="p-3 rounded-2xl bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-xs"
            title="Dengarkan Panduan"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        </div>

        {/* Big Fruit with Seed Touch Points */}
        <div className="py-4 relative flex flex-col items-center justify-center">
          <FruitIllustration
            fruit={selectedFruit}
            isSliced={true}
            size="xl"
            onSeedClick={handleSeedClick}
            countedSeeds={tappedIndices}
          />

          {isCompleted && (
            <div className="mt-4 px-6 py-2.5 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-lg animate-bounce flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <span>
                {selectedFruit.category === 'biji-sedikit'
                  ? 'Selesai! Buah Ini Berbiji Sedikit!'
                  : 'Selesai! Buah Ini Berbiji BANYAK Sekali!'}
              </span>
            </div>
          )}
        </div>

        {/* Seed Tap Visual Indicator List */}
        <div className="w-full max-w-md bg-stone-50 rounded-2xl p-4 border border-stone-200">
          <div className="text-xs font-bold text-stone-500 uppercase tracking-wide mb-2 text-center">
            Biji yang sudah disentuh:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {selectedFruit.seeds.map((_, idx) => {
              const isTapped = tappedIndices.includes(idx);
              return (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    isTapped
                      ? 'bg-amber-400 text-amber-950 scale-110 shadow-xs ring-2 ring-amber-300'
                      : 'bg-white text-stone-300 border border-stone-200'
                  }`}
                >
                  {isTapped ? idx + 1 : '○'}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fruit Picker Carousel for Counting */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-200 space-y-3">
        <h3 className="text-base font-extrabold text-stone-800 flex items-center gap-2">
          <span>🍉</span>
          <span>Pilih Buah untuk Dihitung Bijinya:</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {FRUITS.map((fruit) => {
            const isSelected = selectedFruit.id === fruit.id;
            return (
              <button
                key={fruit.id}
                onClick={() => handleFruitChange(fruit)}
                className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 scale-102'
                    : 'bg-stone-50/70 border-stone-200 hover:bg-white'
                }`}
              >
                <FruitIllustration fruit={fruit} isSliced={true} size="sm" />
                <span className="text-xs font-black text-stone-900">
                  {fruit.name}
                </span>
                <span className="text-[10px] text-stone-500 font-bold">
                  {fruit.category === 'biji-banyak' ? '🌾 Biji Banyak' : '🌰 Biji 1/Sedikit'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
