/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, GameTab } from './components/Header';
import { ExploreMode } from './components/ExploreMode';
import { SortingGame } from './components/SortingGame';
import { QuizGame } from './components/QuizGame';
import { CountGame } from './components/CountGame';
import { sound } from './utils/audio';

export default function App() {
  const [currentTab, setCurrentTab] = useState<GameTab>('explore');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmOn, setIsBgmOn] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playPop();
      sound.speak('Suara diaktifkan! Halo adik-adik!');
    }
  };

  const handleToggleBgm = () => {
    const active = sound.toggleBgm();
    setIsBgmOn(active);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/50 text-stone-800">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isBgmOn={isBgmOn}
        onToggleBgm={handleToggleBgm}
      />

      {/* Main Game Stage */}
      <main className="flex-1 pb-12">
        {currentTab === 'explore' && <ExploreMode />}
        {currentTab === 'sorting' && <SortingGame />}
        {currentTab === 'quiz' && <QuizGame />}
        {currentTab === 'count' && <CountGame />}
      </main>

      {/* Footer for Teachers & Parents */}
      <footer className="border-t border-amber-200/80 bg-white/80 py-6 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2 text-sm font-extrabold text-amber-900">
            <span>🍉</span>
            <span>Game Edukasi Sains &amp; Berhitung Anak TK</span>
            <span>🥑</span>
          </div>
          <p className="text-xs text-stone-500 font-medium max-w-xl mx-auto">
            Media pembelajaran interaktif mengenalkan pengelompokan buah berbiji banyak dan berbiji sedikit (atau satu biji) dengan audio suara narator ramah anak dan gambar ilustrasi besar.
          </p>
        </div>
      </footer>
    </div>
  );
}
