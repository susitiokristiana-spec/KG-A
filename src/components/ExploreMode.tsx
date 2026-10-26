import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Scissors, RotateCcw } from 'lucide-react';
import { FRUITS, FruitData } from '../types/fruit';
import { FruitIllustration } from './FruitIllustration';
import { sound } from '../utils/audio';

export const ExploreMode: React.FC = () => {
  const [selectedFruit, setSelectedFruit] = useState<FruitData>(FRUITS[0]);
  const [isSliced, setIsSliced] = useState<boolean>(true);
  const [countedSeeds, setCountedSeeds] = useState<number[]>([]);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // When fruit changes, slice it automatically so seeds are visible, reset counted seeds, and speak fruit name
  useEffect(() => {
    setIsSliced(true);
    setCountedSeeds([]);
    handleSpeakFruit(selectedFruit);
  }, [selectedFruit]);

  const handleSpeakFruit = (fruit: FruitData) => {
    setIsSpeaking(true);
    const textToRead = `${fruit.name}. ${fruit.category === 'biji-banyak' ? 'Buah berbiji banyak!' : 'Buah berbiji sedikit atau hanya satu biji!'} ${fruit.seedExplanation}`;
    sound.speak(textToRead, () => {
      setIsSpeaking(false);
    });
  };

  const handleSliceToggle = () => {
    if (!isSliced) {
      sound.playSlice();
      setIsSliced(true);
      sound.speak(`Belah ${selectedFruit.name}! Lihat bijinya!`);
    } else {
      sound.playPop();
      setIsSliced(false);
      setCountedSeeds([]);
    }
  };

  const handleSeedClick = (seedIndex: number) => {
    if (!countedSeeds.includes(seedIndex)) {
      const nextCount = countedSeeds.length + 1;
      setCountedSeeds([...countedSeeds, seedIndex]);
      sound.playSeedCount(nextCount);

      if (selectedFruit.category === 'biji-sedikit') {
        sound.speak(`Satu biji besar ${selectedFruit.name}!`);
      } else {
        if (nextCount === 1) sound.speak('Satu!');
        else if (nextCount === 2) sound.speak('Dua!');
        else if (nextCount === 3) sound.speak('Tiga!');
        else if (nextCount === 4) sound.speak('Empat!');
        else if (nextCount === 5) sound.speak('Lima! Wah, banyak sekali bijinya!');
      }
    } else {
      sound.playPop();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Friendly Kindergarten Banner with Garden Mascot */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-300 to-emerald-400 p-4 sm:p-6 shadow-md border-2 border-amber-300 text-amber-950 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 backdrop-blur-xs rounded-full text-xs sm:text-sm font-bold text-amber-900 border border-amber-300">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Mengenal Buah &amp; Bijinya Bersama Si Beruang</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-amber-950">
            Ayo Belah &amp; Lihat Bijinya!
          </h1>
          <p className="text-sm sm:text-base text-amber-900/90 max-w-xl font-medium">
            Ada buah yang memiliki <b>biji sangat banyak</b>, dan ada buah yang hanya memiliki <b>satu atau sedikit biji</b>. Tekan tombol belah buah untuk melihat ke dalamnya!
          </p>
        </div>

        {/* Mascot Image Thumbnail */}
        <div className="shrink-0 relative group">
          <img
            src="/src/assets/images/game_mascot_garden_1792978065282.jpg"
            alt="Mascot Beruang di Kebun Buah"
            className="w-32 h-24 sm:w-48 sm:h-32 object-cover rounded-2xl border-4 border-white shadow-lg transform rotate-2 group-hover:rotate-0 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Big Visual Showcase & Slice Controller */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200 flex flex-col items-center justify-between relative overflow-hidden">
          {/* Category Top Banner on the Card */}
          <div className="w-full flex items-center justify-between gap-2 border-b border-amber-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-950">
                {selectedFruit.name}
              </span>
              <button
                onClick={() => handleSpeakFruit(selectedFruit)}
                aria-label={`Dengarkan nama ${selectedFruit.name}`}
                className={`p-2.5 rounded-2xl transition-all ${
                  isSpeaking
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:scale-105'
                }`}
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>

            {/* Seed Category Badge */}
            <div
              className={`px-3 py-1.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border ${
                selectedFruit.category === 'biji-banyak'
                  ? 'bg-rose-50 text-rose-700 border-rose-300'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
            >
              <span>{selectedFruit.category === 'biji-banyak' ? '🌾' : '🌰'}</span>
              <span>{selectedFruit.categoryLabel}</span>
            </div>
          </div>

          {/* Central Interactive Fruit SVG Display */}
          <div className="py-6 sm:py-8 relative w-full flex flex-col items-center justify-center">
            <FruitIllustration
              fruit={selectedFruit}
              isSliced={isSliced}
              size="xl"
              onSeedClick={handleSeedClick}
              countedSeeds={countedSeeds}
            />

            {/* State Indicator */}
            <div className="mt-4 text-xs sm:text-sm font-semibold text-stone-500 flex items-center gap-2">
              <span>{isSliced ? '🔍 Tampilan: Terbelah (Terlihat Biji)' : '🍎 Tampilan: Utuh'}</span>
            </div>
          </div>

          {/* Big Action Buttons */}
          <div className="w-full flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-amber-100">
            <button
              onClick={handleSliceToggle}
              className={`px-5 py-3 rounded-2xl font-bold text-base sm:text-lg flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                isSliced
                  ? 'bg-stone-100 text-stone-700 border border-stone-300 hover:bg-stone-200'
                  : 'bg-emerald-500 text-white hover:bg-emerald-600 border border-emerald-600'
              }`}
            >
              {isSliced ? (
                <>
                  <RotateCcw className="w-5 h-5" />
                  <span>Satukan Buah</span>
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  <span>🔪 Belah Buah!</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSpeakFruit(selectedFruit)}
              className="px-5 py-3 rounded-2xl font-bold text-base sm:text-lg flex items-center gap-2 bg-amber-500 text-white hover:bg-amber-600 border border-amber-600 shadow-md transition-all active:scale-95"
            >
              <Volume2 className="w-5 h-5" />
              <span>Dengarkan Suara</span>
            </button>
          </div>
        </div>

        {/* Right Side: Educational Details & Seed Tap Counting */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Card: Penjelasan Biji untuk Anak TK */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200 space-y-4">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-lg">
              <span className="text-2xl">🌱</span>
              <h2>Biji Buah {selectedFruit.name}</h2>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 space-y-2">
              <div className="text-xs uppercase tracking-wide font-extrabold text-amber-700">
                Jumlah Biji:
              </div>
              <div className="text-lg font-bold text-amber-900">
                {selectedFruit.seedCountDesc}
              </div>
              <p className="text-sm leading-relaxed text-amber-900/90 font-medium">
                {selectedFruit.seedExplanation}
              </p>
            </div>

            {/* Interactive Tap Seeds Instruction */}
            {isSliced && (
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">Sentuh Biji di Gambar!</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-200 text-sky-800 font-extrabold text-xs">
                    {countedSeeds.length} Terhitung
                  </span>
                </div>
                <p className="text-xs text-sky-700">
                  Ayo sentuh biji-biji pada gambar buah untuk menghitungnya satu persatu!
                </p>
                {countedSeeds.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {countedSeeds.map((_, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-0.5 rounded-md bg-amber-400 text-amber-950 font-bold text-xs animate-bounce"
                      >
                        ⭐ {i + 1}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Fun Fact Card */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
              <div className="text-xs uppercase tracking-wide font-extrabold text-emerald-700 flex items-center gap-1.5">
                <span>💡</span>
                <span>Tahukah Kamu?</span>
              </div>
              <p className="text-sm font-medium mt-1 text-emerald-900">
                {selectedFruit.funFact}
              </p>
            </div>
          </div>

          {/* Quick Comparison Card: Biji Banyak vs Biji Sedikit */}
          <div className="bg-amber-100/60 rounded-3xl p-5 border border-amber-200 space-y-3">
            <h3 className="font-extrabold text-amber-900 text-sm flex items-center gap-1.5">
              <span>🌟</span>
              <span>Ingat Perbedaannya ya Adik-Adik:</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="bg-white p-3 rounded-2xl border border-rose-200 shadow-2xs">
                <div className="font-bold text-rose-700 flex items-center gap-1 mb-1">
                  <span>🍉</span>
                  <span>Biji Banyak</span>
                </div>
                <p className="text-stone-600 text-xs">
                  Semangka, Pepaya, Buah Naga, Melon, Jambu Biji, Jeruk.
                </p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-2xs">
                <div className="font-bold text-emerald-700 flex items-center gap-1 mb-1">
                  <span>🥑</span>
                  <span>Biji Sedikit/Satu</span>
                </div>
                <p className="text-stone-600 text-xs">
                  Mangga (1 biji), Alpukat (1 biji), Rambutan (1 biji), Apel (sedikit).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fruit Selection Carousel / Grid */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-amber-950 flex items-center gap-2">
            <span>🧺</span>
            <span>Pilih Buah Lainnya:</span>
          </h3>
          <span className="text-xs font-semibold text-stone-500">
            Ada {FRUITS.length} buah lezat
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {FRUITS.map((fruit) => {
            const isSelected = selectedFruit.id === fruit.id;
            return (
              <button
                key={fruit.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedFruit(fruit);
                }}
                className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? 'bg-amber-100 border-amber-400 shadow-md ring-2 ring-amber-400 scale-102'
                    : 'bg-stone-50/70 border-stone-200 hover:bg-white hover:border-amber-300'
                }`}
              >
                <FruitIllustration fruit={fruit} isSliced={true} size="sm" />
                <div className="text-center">
                  <div className="text-sm font-extrabold text-stone-800">
                    {fruit.name}
                  </div>
                  <span
                    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      fruit.category === 'biji-banyak'
                        ? 'text-rose-600 bg-rose-50'
                        : 'text-emerald-700 bg-emerald-50'
                    }`}
                  >
                    {fruit.category === 'biji-banyak' ? 'Banyak' : 'Sedikit/1'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
