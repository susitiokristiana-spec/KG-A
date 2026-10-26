import React from 'react';
import { FruitData } from '../types/fruit';

interface FruitIllustrationProps {
  fruit: FruitData;
  isSliced: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onSeedClick?: (seedIndex: number) => void;
  countedSeeds?: number[];
  className?: string;
}

export const FruitIllustration: React.FC<FruitIllustrationProps> = ({
  fruit,
  isSliced,
  size = 'lg',
  onSeedClick,
  countedSeeds = [],
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-56 h-56 sm:w-64 sm:h-64',
    xl: 'w-72 h-72 sm:w-80 sm:h-80',
  };

  const renderWholeFruit = () => {
    switch (fruit.id) {
      case 'semangka':
        return (
          <g>
            <ellipse cx="100" cy="100" rx="78" ry="68" fill="#2E7D32" stroke="#1B5E20" strokeWidth="5" />
            {/* Dark green stripes */}
            <path d="M 40 46 Q 30 100 40 154" stroke="#1B5E20" strokeWidth="12" strokeLinecap="round" fill="none" />
            <path d="M 68 36 Q 60 100 68 164" stroke="#1B5E20" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M 100 32 Q 95 100 100 168" stroke="#1B5E20" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M 132 36 Q 140 100 132 164" stroke="#1B5E20" strokeWidth="14" strokeLinecap="round" fill="none" />
            <path d="M 160 46 Q 170 100 160 154" stroke="#1B5E20" strokeWidth="12" strokeLinecap="round" fill="none" />
            {/* Stem */}
            <path d="M 100 32 Q 102 18 116 16" stroke="#4E342E" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Little cute smile for kids */}
            <circle cx="85" cy="98" r="4" fill="#0E3D12" />
            <circle cx="115" cy="98" r="4" fill="#0E3D12" />
            <path d="M 94 106 Q 100 114 106 106" stroke="#0E3D12" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Highlights */}
            <path d="M 60 52 A 50 40 0 0 1 140 52" stroke="rgba(255,255,255,0.4)" strokeWidth="6" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'pepaya':
        return (
          <g>
            {/* Papaya pear shape */}
            <path
              d="M 100 32 C 122 32 135 60 138 90 C 144 130 134 168 100 168 C 66 168 56 130 62 90 C 65 60 78 32 100 32 Z"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="5"
            />
            {/* Green tinge gradients */}
            <path
              d="M 100 34 C 114 34 125 50 128 70 C 95 62 75 70 72 70 C 75 50 86 34 100 34 Z"
              fill="#84CC16"
              opacity="0.8"
            />
            {/* Stem */}
            <path d="M 100 32 L 100 18" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            {/* Face */}
            <circle cx="88" cy="115" r="4" fill="#78350F" />
            <circle cx="112" cy="115" r="4" fill="#78350F" />
            <path d="M 94 125 Q 100 132 106 125" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'buah-naga':
        return (
          <g>
            {/* Dragon fruit oval with scales */}
            <path
              d="M 100 38 C 145 38 152 95 145 145 C 138 175 62 175 55 145 C 48 95 55 38 100 38 Z"
              fill="#EC4899"
              stroke="#BE185D"
              strokeWidth="5"
            />
            {/* Green leaf tips / scales */}
            <path d="M 100 36 C 96 15 106 10 100 2" stroke="#84CC16" strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M 70 60 C 50 48 45 35 40 45 C 48 65 60 70 70 60 Z" fill="#84CC16" stroke="#4D7C0F" strokeWidth="2" />
            <path d="M 130 60 C 150 48 155 35 160 45 C 152 65 140 70 130 60 Z" fill="#84CC16" stroke="#4D7C0F" strokeWidth="2" />
            <path d="M 60 110 C 38 105 32 95 35 110 C 45 125 58 120 60 110 Z" fill="#84CC16" stroke="#4D7C0F" strokeWidth="2" />
            <path d="M 140 110 C 162 105 168 95 165 110 C 155 125 142 120 140 110 Z" fill="#84CC16" stroke="#4D7C0F" strokeWidth="2" />
            <path d="M 75 155 C 60 165 65 178 75 172 Z" fill="#84CC16" />
            <path d="M 125 155 C 140 165 135 178 125 172 Z" fill="#84CC16" />
            {/* Face */}
            <circle cx="88" cy="110" r="4" fill="#831843" />
            <circle cx="112" cy="110" r="4" fill="#831843" />
            <path d="M 94 120 Q 100 128 106 120" stroke="#831843" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'melon':
        return (
          <g>
            <circle cx="100" cy="100" r="70" fill="#A3E635" stroke="#4D7C0F" strokeWidth="5" />
            {/* Netting lines */}
            <path d="M 50 75 Q 100 45 150 75" stroke="#ECFCCB" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M 40 100 Q 100 80 160 100" stroke="#ECFCCB" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M 50 125 Q 100 115 150 125" stroke="#ECFCCB" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M 75 50 Q 55 100 75 150" stroke="#ECFCCB" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M 100 35 Q 85 100 100 165" stroke="#ECFCCB" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M 125 50 Q 145 100 125 150" stroke="#ECFCCB" strokeWidth="3" fill="none" opacity="0.8" />
            {/* T-stem */}
            <path d="M 100 32 L 100 20 M 88 18 L 112 18" stroke="#4D7C0F" strokeWidth="6" strokeLinecap="round" />
            {/* Face */}
            <circle cx="86" cy="102" r="4" fill="#365314" />
            <circle cx="114" cy="102" r="4" fill="#365314" />
            <path d="M 94 112 Q 100 120 106 112" stroke="#365314" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'jambu-biji':
        return (
          <g>
            <circle cx="100" cy="104" r="66" fill="#84CC16" stroke="#4D7C0F" strokeWidth="5" />
            {/* Crown base */}
            <path d="M 90 170 C 95 176 105 176 110 170" stroke="#3F6212" strokeWidth="4" fill="none" />
            {/* Stem & leaf */}
            <path d="M 100 40 L 100 22" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
            <path d="M 100 28 Q 125 20 122 35 Q 110 40 100 32" fill="#65A30D" stroke="#3F6212" strokeWidth="2" />
            {/* Face */}
            <circle cx="88" cy="100" r="4" fill="#3F6212" />
            <circle cx="112" cy="100" r="4" fill="#3F6212" />
            <path d="M 94 110 Q 100 118 106 110" stroke="#3F6212" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'jeruk':
        return (
          <g>
            <circle cx="100" cy="104" r="68" fill="#F97316" stroke="#C2410C" strokeWidth="5" />
            {/* Orange skin pores */}
            <circle cx="65" cy="80" r="1.5" fill="#C2410C" />
            <circle cx="135" cy="80" r="1.5" fill="#C2410C" />
            <circle cx="70" cy="125" r="1.5" fill="#C2410C" />
            <circle cx="130" cy="130" r="1.5" fill="#C2410C" />
            <circle cx="100" cy="148" r="1.5" fill="#C2410C" />
            {/* Leaf and stem */}
            <path d="M 100 38 L 100 24" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
            <path d="M 100 30 Q 130 18 128 38 Q 112 44 100 34" fill="#65A30D" stroke="#365314" strokeWidth="2" />
            {/* Face */}
            <circle cx="88" cy="100" r="4" fill="#7C2D12" />
            <circle cx="112" cy="100" r="4" fill="#7C2D12" />
            <path d="M 94 110 Q 100 118 106 110" stroke="#7C2D12" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'mangga':
        return (
          <g>
            {/* Mango kidney curve */}
            <path
              d="M 100 36 C 135 36 150 70 145 110 C 140 148 115 168 85 168 C 65 168 55 140 60 100 C 65 65 75 36 100 36 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="5"
            />
            {/* Red blush */}
            <path
              d="M 100 38 C 128 38 142 60 140 85 C 120 70 100 70 85 80 C 88 50 95 38 100 38 Z"
              fill="#F87171"
              opacity="0.6"
            />
            {/* Stem and leaf */}
            <path d="M 100 36 L 100 22" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
            <path d="M 100 26 Q 130 20 128 35 Q 112 40 100 30" fill="#65A30D" stroke="#365314" strokeWidth="2" />
            {/* Face */}
            <circle cx="88" cy="110" r="4" fill="#78350F" />
            <circle cx="112" cy="110" r="4" fill="#78350F" />
            <path d="M 94 120 Q 100 128 106 120" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'alpukat':
        return (
          <g>
            {/* Whole dark green avocado */}
            <path
              d="M 100 35 C 125 35 135 65 145 105 C 152 145 136 170 100 170 C 64 170 48 145 55 105 C 65 65 75 35 100 35 Z"
              fill="#14532D"
              stroke="#052E16"
              strokeWidth="5"
            />
            {/* Stem */}
            <path d="M 100 35 L 100 20" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            {/* Subtle texture */}
            <circle cx="75" cy="90" r="2" fill="#166534" />
            <circle cx="125" cy="90" r="2" fill="#166534" />
            <circle cx="80" cy="135" r="2" fill="#166534" />
            <circle cx="120" cy="140" r="2" fill="#166534" />
            {/* Face */}
            <circle cx="88" cy="115" r="4" fill="#86EFAC" />
            <circle cx="112" cy="115" r="4" fill="#86EFAC" />
            <path d="M 94 125 Q 100 133 106 125" stroke="#86EFAC" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'rambutan':
        return (
          <g>
            {/* Rambutan body */}
            <circle cx="100" cy="100" r="54" fill="#DC2626" stroke="#991B1B" strokeWidth="4" />
            {/* Soft curly hairs */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 100 + 52 * Math.cos(rad);
              const y1 = 100 + 52 * Math.sin(rad);
              const x2 = 100 + 72 * Math.cos(rad + 0.2);
              const y2 = 100 + 72 * Math.sin(rad + 0.2);
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${x2} ${y2} ${100 + 78 * Math.cos(rad)} ${100 + 78 * Math.sin(rad)}`}
                  stroke={i % 2 === 0 ? '#84CC16' : '#EF4444'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              );
            })}
            {/* Face */}
            <circle cx="88" cy="96" r="4" fill="#450A0A" />
            <circle cx="112" cy="96" r="4" fill="#450A0A" />
            <path d="M 94 105 Q 100 113 106 105" stroke="#450A0A" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'kelengkeng':
        return (
          <g>
            <circle cx="100" cy="104" r="60" fill="#D97706" stroke="#92400E" strokeWidth="5" />
            <circle cx="100" cy="104" r="56" fill="#F59E0B" />
            {/* Tan skin dots */}
            <circle cx="80" cy="85" r="2" fill="#B45309" />
            <circle cx="120" cy="85" r="2" fill="#B45309" />
            <circle cx="95" cy="135" r="2" fill="#B45309" />
            {/* Little twig */}
            <path d="M 100 46 L 100 28" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
            {/* Face */}
            <circle cx="88" cy="100" r="4" fill="#78350F" />
            <circle cx="112" cy="100" r="4" fill="#78350F" />
            <path d="M 94 110 Q 100 118 106 110" stroke="#78350F" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'apel':
        return (
          <g>
            {/* Apple shape with dimple at top & bottom */}
            <path
              d="M 100 50 C 125 32 160 52 155 95 C 150 135 125 168 100 162 C 75 168 50 135 45 95 C 40 52 75 32 100 50 Z"
              fill="#EF4444"
              stroke="#B91C1C"
              strokeWidth="5"
            />
            {/* Stem and green leaf */}
            <path d="M 100 50 Q 105 32 115 22" stroke="#78350F" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 105 34 Q 135 22 130 40 Q 115 45 105 38" fill="#84CC16" stroke="#4D7C0F" strokeWidth="2" />
            {/* Highlight */}
            <ellipse cx="75" cy="78" rx="8" ry="16" fill="rgba(255,255,255,0.4)" transform="rotate(-20 75 78)" />
            {/* Face */}
            <circle cx="88" cy="108" r="4" fill="#7F1D1D" />
            <circle cx="112" cy="108" r="4" fill="#7F1D1D" />
            <path d="M 94 118 Q 100 126 106 118" stroke="#7F1D1D" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      case 'salak':
        return (
          <g>
            {/* Teardrop snake fruit */}
            <path
              d="M 100 28 C 115 45 145 80 145 125 C 145 165 65 165 65 125 C 65 80 85 45 100 28 Z"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="5"
            />
            {/* Snake scale texture pattern */}
            <path d="M 85 75 Q 100 85 115 75" stroke="#92400E" strokeWidth="3" fill="none" />
            <path d="M 75 95 Q 100 108 125 95" stroke="#92400E" strokeWidth="3" fill="none" />
            <path d="M 75 118 Q 100 130 125 118" stroke="#92400E" strokeWidth="3" fill="none" />
            <path d="M 85 140 Q 100 150 115 140" stroke="#92400E" strokeWidth="3" fill="none" />
            {/* Face */}
            <circle cx="88" cy="112" r="4" fill="#FEF3C7" />
            <circle cx="112" cy="112" r="4" fill="#FEF3C7" />
            <path d="M 94 122 Q 100 128 106 122" stroke="#FEF3C7" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        );

      default:
        return null;
    }
  };

  const renderSlicedFruit = () => {
    switch (fruit.id) {
      case 'semangka':
        return (
          <g>
            {/* Big triangular / half slice showing red interior and seeds */}
            <path
              d="M 25 60 C 25 140 175 140 175 60 Z"
              fill="#15803D"
              stroke="#14532D"
              strokeWidth="5"
            />
            <path
              d="M 30 60 C 30 134 170 134 170 60 Z"
              fill="#DCFCE7"
            />
            <path
              d="M 38 60 C 38 126 162 126 162 60 Z"
              fill="#EF4444"
              stroke="#B91C1C"
              strokeWidth="2"
            />
            {/* Top flat cut edge */}
            <line x1="25" y1="60" x2="175" y2="60" stroke="#15803D" strokeWidth="6" strokeLinecap="round" />
          </g>
        );

      case 'pepaya':
        return (
          <g>
            {/* Sliced half papaya with central cavity */}
            <path
              d="M 100 28 C 128 28 145 60 148 95 C 152 135 138 174 100 174 C 62 174 48 135 52 95 C 55 60 72 28 100 28 Z"
              fill="#16A34A"
              stroke="#14532D"
              strokeWidth="5"
            />
            {/* Orange flesh */}
            <path
              d="M 100 34 C 122 34 138 64 140 95 C 144 130 132 166 100 166 C 68 166 56 130 60 95 C 62 64 78 34 100 34 Z"
              fill="#F97316"
            />
            {/* Central cavity for seeds */}
            <ellipse cx="100" cy="105" rx="22" ry="50" fill="#7C2D12" opacity="0.85" />
          </g>
        );

      case 'buah-naga':
        return (
          <g>
            <circle cx="100" cy="100" r="72" fill="#EC4899" stroke="#BE185D" strokeWidth="6" />
            {/* White interior flesh */}
            <circle cx="100" cy="100" r="62" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          </g>
        );

      case 'melon':
        return (
          <g>
            <circle cx="100" cy="100" r="70" fill="#65A30D" stroke="#3F6212" strokeWidth="5" />
            <circle cx="100" cy="100" r="64" fill="#ECFCCB" />
            <circle cx="100" cy="100" r="54" fill="#BEF264" />
            {/* Hollow seed ring */}
            <ellipse cx="100" cy="100" rx="24" ry="32" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
          </g>
        );

      case 'jambu-biji':
        return (
          <g>
            <circle cx="100" cy="100" r="68" fill="#84CC16" stroke="#4D7C0F" strokeWidth="5" />
            <circle cx="100" cy="100" r="62" fill="#DCFCE7" />
            <circle cx="100" cy="100" r="52" fill="#F43F5E" />
            <circle cx="100" cy="100" r="26" fill="#FDA4AF" stroke="#FB7185" strokeWidth="2" />
          </g>
        );

      case 'jeruk':
        return (
          <g>
            <circle cx="100" cy="100" r="70" fill="#EA580C" stroke="#9A3412" strokeWidth="5" />
            <circle cx="100" cy="100" r="64" fill="#FFEDD5" />
            {/* 8 Orange segments */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const radNext = ((deg + 38) * Math.PI) / 180;
              const x1 = 100 + 12 * Math.cos(rad);
              const y1 = 100 + 12 * Math.sin(rad);
              const x2 = 100 + 56 * Math.cos(rad);
              const y2 = 100 + 56 * Math.sin(rad);
              const x3 = 100 + 56 * Math.cos(radNext);
              const y3 = 100 + 56 * Math.sin(radNext);
              const x4 = 100 + 12 * Math.cos(radNext);
              const y4 = 100 + 12 * Math.sin(radNext);
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} L ${x2} ${y2} A 56 56 0 0 1 ${x3} ${y3} L ${x4} ${y4} Z`}
                  fill="#F97316"
                  stroke="#FFEDD5"
                  strokeWidth="2"
                />
              );
            })}
            <circle cx="100" cy="100" r="8" fill="#FFEDD5" />
          </g>
        );

      case 'mangga':
        return (
          <g>
            {/* Sliced half mango with ONE large flat oval seed */}
            <path
              d="M 100 36 C 135 36 150 70 145 110 C 140 148 115 168 85 168 C 65 168 55 140 60 100 C 65 65 75 36 100 36 Z"
              fill="#FBBF24"
              stroke="#D97706"
              strokeWidth="5"
            />
            {/* The single giant seed (Pelok Mangga) */}
            <ellipse
              cx="100"
              cy="105"
              rx="22"
              ry="42"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="4"
              strokeDasharray="4 2"
            />
            {/* Fibers on mango seed */}
            <path d="M 100 70 L 100 140" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 3" />
            <path d="M 92 80 Q 88 105 92 130" stroke="#F59E0B" strokeWidth="2" />
            <path d="M 108 80 Q 112 105 108 130" stroke="#F59E0B" strokeWidth="2" />
          </g>
        );

      case 'alpukat':
        return (
          <g>
            {/* Sliced avocado half */}
            <path
              d="M 100 35 C 125 35 135 65 145 105 C 152 145 136 170 100 170 C 64 170 48 145 55 105 C 65 65 75 35 100 35 Z"
              fill="#166534"
              stroke="#052E16"
              strokeWidth="5"
            />
            {/* Creamy yellow-green inner flesh */}
            <path
              d="M 100 42 C 120 42 128 68 136 105 C 142 138 128 162 100 162 C 72 162 58 138 64 105 C 72 68 80 42 100 42 Z"
              fill="#BEF264"
            />
            <path
              d="M 100 50 C 115 50 122 72 128 105 C 132 132 122 154 100 154 C 78 154 68 132 72 105 C 78 72 85 50 100 50 Z"
              fill="#FEF08A"
            />
            {/* The ONE Giant Seed (Biji Bulat Cokelat) */}
            <circle cx="100" cy="116" r="30" fill="#78350F" stroke="#451A03" strokeWidth="4" />
            {/* Highlight on seed */}
            <ellipse cx="90" cy="106" rx="8" ry="5" fill="#A16207" opacity="0.6" />
          </g>
        );

      case 'rambutan':
        return (
          <g>
            {/* Halved open rambutan */}
            <circle cx="100" cy="100" r="62" fill="#DC2626" stroke="#991B1B" strokeWidth="4" />
            {/* Juicy white translucent aril */}
            <circle cx="100" cy="100" r="50" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="3" />
            {/* The single seed inside */}
            <ellipse cx="100" cy="100" rx="16" ry="24" fill="#92400E" stroke="#78350F" strokeWidth="3" />
          </g>
        );

      case 'kelengkeng':
        return (
          <g>
            {/* Halved longan */}
            <circle cx="100" cy="100" r="60" fill="#D97706" stroke="#78350F" strokeWidth="4" />
            <circle cx="100" cy="100" r="52" fill="#FEF3C7" />
            {/* Translucent glass-like meat */}
            <circle cx="100" cy="100" r="44" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
            {/* The 1 shiny black seed ("Mata Naga") */}
            <circle cx="100" cy="100" r="18" fill="#18181B" stroke="#09090B" strokeWidth="3" />
            <circle cx="94" cy="94" r="5" fill="#FFFFFF" />
          </g>
        );

      case 'apel':
        return (
          <g>
            {/* Sliced cross section apple */}
            <path
              d="M 100 48 C 125 32 160 52 155 95 C 150 135 125 168 100 162 C 75 168 50 135 45 95 C 40 52 75 32 100 48 Z"
              fill="#EF4444"
              stroke="#B91C1C"
              strokeWidth="5"
            />
            {/* Creamy white flesh */}
            <path
              d="M 100 54 C 120 40 150 58 146 95 C 142 130 120 158 100 154 C 80 158 58 130 54 95 C 50 58 80 40 100 54 Z"
              fill="#FEF3C7"
            />
            {/* Core star pocket */}
            <path
              d="M 100 90 L 104 98 L 112 100 L 106 106 L 107 114 L 100 110 L 93 114 L 94 106 L 88 100 L 96 98 Z"
              fill="#FDE68A"
              stroke="#D97706"
              strokeWidth="1.5"
            />
          </g>
        );

      case 'salak':
        return (
          <g>
            {/* Halved salak with white cloves */}
            <path
              d="M 100 28 C 115 45 145 80 145 125 C 145 165 65 165 65 125 C 65 80 85 45 100 28 Z"
              fill="#78350F"
              stroke="#451A03"
              strokeWidth="4"
            />
            {/* Pearly white clove segment */}
            <ellipse cx="100" cy="115" rx="36" ry="42" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2" />
            <ellipse cx="100" cy="115" rx="20" ry="26" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]} ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full filter drop-shadow-md select-none transition-transform duration-300 transform hover:scale-105"
      >
        {isSliced ? renderSlicedFruit() : renderWholeFruit()}

        {/* Interactive Seed Markers if sliced */}
        {isSliced &&
          fruit.seeds.map((seed, idx) => {
            const isCounted = countedSeeds.includes(idx);
            // Default seed rendering based on category
            const isSingleBig = fruit.category === 'biji-sedikit' && (fruit.id === 'mangga' || fruit.id === 'alpukat' || fruit.id === 'rambutan' || fruit.id === 'kelengkeng');
            const seedR = seed.size ? seed.size / 2 : (isSingleBig ? 18 : 4.5);

            // Calculate SVG coordinates (scaled to 200x200 viewBox)
            const cx = (seed.x / 100) * 200;
            const cy = (seed.y / 100) * 200;

            return (
              <g
                key={idx}
                className="cursor-pointer group"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSeedClick) onSeedClick(idx);
                }}
              >
                {/* Clickable hit area */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={Math.max(seedR + 8, 14)}
                  fill="transparent"
                />

                {/* Visible Seed */}
                {fruit.id === 'semangka' && (
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={seedR}
                    ry={seedR * 1.5}
                    fill={isCounted ? '#FACC15' : '#18181B'}
                    stroke={isCounted ? '#CA8A04' : '#09090B'}
                    strokeWidth={isCounted ? 2 : 1}
                    transform={`rotate(${((idx * 37) % 60) - 30} ${cx} ${cy})`}
                    className="transition-colors duration-200"
                  />
                )}

                {fruit.id === 'pepaya' && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={seedR}
                    fill={isCounted ? '#FACC15' : '#171717'}
                    stroke={isCounted ? '#CA8A04' : '#404040'}
                    strokeWidth={isCounted ? 2 : 1}
                    className="transition-colors duration-200"
                  />
                )}

                {fruit.id === 'buah-naga' && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isCounted ? seedR * 1.6 : seedR * 0.9}
                    fill={isCounted ? '#E11D48' : '#1E293B'}
                    className="transition-colors duration-200"
                  />
                )}

                {fruit.id === 'melon' && (
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={seedR}
                    ry={seedR * 1.6}
                    fill={isCounted ? '#FACC15' : '#FEF08A'}
                    stroke={isCounted ? '#CA8A04' : '#CA8A04'}
                    strokeWidth={1.5}
                    transform={`rotate(${((idx * 45) % 80) - 40} ${cx} ${cy})`}
                  />
                )}

                {fruit.id === 'jambu-biji' && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={seedR}
                    fill={isCounted ? '#FACC15' : '#FEF3C7'}
                    stroke="#D97706"
                    strokeWidth={1.5}
                  />
                )}

                {fruit.id === 'jeruk' && (
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={seedR}
                    ry={seedR * 1.4}
                    fill={isCounted ? '#FACC15' : '#FFFFFF'}
                    stroke="#FDBA74"
                    strokeWidth={1.5}
                    transform={`rotate(${idx * 45} ${cx} ${cy})`}
                  />
                )}

                {fruit.id === 'apel' && (
                  <ellipse
                    cx={cx}
                    cy={cy}
                    rx={seedR}
                    ry={seedR * 1.5}
                    fill={isCounted ? '#FACC15' : '#451A03'}
                    stroke="#1C1917"
                    strokeWidth={1}
                  />
                )}

                {fruit.id === 'salak' && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={seedR}
                    fill={isCounted ? '#FACC15' : '#451A03'}
                    stroke="#1C1917"
                    strokeWidth={2}
                  />
                )}

                {/* Star or pulse when seed is clicked/counted */}
                {isCounted && (
                  <g className="animate-ping origin-center">
                    <circle
                      cx={cx}
                      cy={cy}
                      r={seedR + 4}
                      fill="none"
                      stroke="#FACC15"
                      strokeWidth={2}
                    />
                  </g>
                )}
              </g>
            );
          })}
      </svg>
    </div>
  );
};
