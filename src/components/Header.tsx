import React from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/audio';

export type GameTab = 'explore' | 'sorting' | 'quiz' | 'count';

interface HeaderProps {
  currentTab: GameTab;
  onSelectTab: (tab: GameTab) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isBgmOn: boolean;
  onToggleBgm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  isMuted,
  onToggleMute,
  isBgmOn,
  onToggleBgm,
}) => {
  const tabs: { id: GameTab; label: string }[] = [
    { id: 'explore', label: '1. Belah & Kenali' },
    { id: 'sorting', label: '2. Sortir Keranjang' },
    { id: 'quiz', label: '3. Kuis Tebak' },
    { id: 'count', label: '4. Hitung Biji' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            sound.playPop();
            onSelectTab('explore');
          }}
          className="text-lg sm:text-2xl font-bold tracking-tight text-amber-900 whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl sm:text-3xl" role="img" aria-label="buah">🍉</span>
          <span>Petualangan Buah</span>
        </button>

        {/* Zone 2: Navigation Links (Clean single line tabs) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 bg-amber-50/80 p-1 rounded-xl border border-amber-200">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playPop();
                  onSelectTab(tab.id);
                }}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-sm scale-102'
                    : 'text-amber-900/80 hover:bg-amber-100/70 hover:text-amber-950'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Audio & Voice Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Background Music Toggle */}
          <button
            onClick={() => {
              onToggleBgm();
            }}
            title={isBgmOn ? 'Matikan Musik' : 'Nyalakan Musik'}
            aria-label="Musik Latar"
            className={`p-2 rounded-xl border transition-all ${
              isBgmOn
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-xs'
                : 'bg-stone-100 text-stone-500 border-stone-200 hover:bg-stone-200'
            }`}
          >
            <Music className="w-5 h-5" />
          </button>

          {/* Sound & Voice Mute Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            aria-label="Suara Narator"
            className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 font-medium text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 ${
              isMuted
                ? 'bg-rose-50 text-rose-700 border-rose-300'
                : 'bg-amber-500 text-white border-amber-600 hover:bg-amber-600 shadow-xs'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMuted ? 'Suara Mati' : 'Suara Nyala'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-1.5 bg-amber-50/90 border-t border-amber-200 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                onSelectTab(tab.id);
              }}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-white'
                  : 'text-amber-900/80 hover:bg-amber-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
