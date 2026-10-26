export type SeedCategory = 'biji-banyak' | 'biji-sedikit';

export interface SeedPoint {
  x: number;
  y: number;
  size?: number;
  rotation?: number;
}

export interface FruitData {
  id: string;
  name: string;
  category: SeedCategory;
  categoryLabel: string;
  seedCountDesc: string;
  seedExplanation: string;
  speechText: string;
  funFact: string;
  themeColor: {
    bg: string;
    border: string;
    accent: string;
    light: string;
    text: string;
  };
  seeds: SeedPoint[];
}

export const FRUITS: FruitData[] = [
  {
    id: 'semangka',
    name: 'Semangka',
    category: 'biji-banyak',
    categoryLabel: 'Biji Banyak',
    seedCountDesc: 'Puluhan hingga ratusan biji',
    seedExplanation: 'Semangka memiliki sangat banyak biji kecil berwarna hitam atau putih yang tersebar di dalam daging merahnya yang manis.',
    speechText: 'Semangka! Dagingnya merah manis dan memiliki sangat banyak biji!',
    funFact: 'Semangka mengandung banyak air, cocok dimakan saat cuaca panas!',
    themeColor: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      accent: 'bg-emerald-500',
      light: '#E8F5E9',
      text: 'text-emerald-800',
    },
    seeds: [
      { x: 38, y: 45 }, { x: 50, y: 40 }, { x: 62, y: 45 },
      { x: 32, y: 56 }, { x: 44, y: 53 }, { x: 56, y: 53 }, { x: 68, y: 56 },
      { x: 40, y: 66 }, { x: 50, y: 64 }, { x: 60, y: 66 },
      { x: 46, y: 75 }, { x: 54, y: 75 }
    ]
  },
  {
    id: 'pepaya',
    name: 'Pepaya',
    category: 'biji-banyak',
    categoryLabel: 'Biji Banyak',
    seedCountDesc: 'Ratusan biji hitam',
    seedExplanation: 'Pepaya memiliki banyak sekali biji bulat berwarna hitam berkilau yang berkumpul di rongga tengah buah.',
    speechText: 'Pepaya! Dagingnya oranye lembut dan punya banyak sekali biji hitam di tengahnya!',
    funFact: 'Pepaya sangat baik untuk kesehatan pencernaan perut kita!',
    themeColor: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      accent: 'bg-amber-500',
      light: '#FFF8E1',
      text: 'text-amber-800',
    },
    seeds: [
      { x: 48, y: 35 }, { x: 52, y: 37 }, { x: 46, y: 42 }, { x: 53, y: 43 },
      { x: 49, y: 48 }, { x: 45, y: 52 }, { x: 54, y: 53 }, { x: 48, y: 58 },
      { x: 52, y: 61 }, { x: 46, y: 65 }, { x: 53, y: 67 }, { x: 49, y: 72 }
    ]
  },
  {
    id: 'buah-naga',
    name: 'Buah Naga',
    category: 'biji-banyak',
    categoryLabel: 'Biji Banyak',
    seedCountDesc: 'Ribuan biji halus',
    seedExplanation: 'Buah naga memiliki ribuan biji kecil berwarna hitam seperti taburan biji wijen yang bisa dimakan langsung.',
    speechText: 'Buah naga! Kulitnya merah bersisik dan bijinya sangat banyak seperti taburan wijen!',
    funFact: 'Biji buah naga renyah dan bisa kita makan langsung bersama buahnya!',
    themeColor: {
      bg: 'bg-rose-50',
      border: 'border-rose-300',
      accent: 'bg-rose-500',
      light: '#FCE4EC',
      text: 'text-rose-800',
    },
    seeds: [
      { x: 35, y: 38 }, { x: 45, y: 35 }, { x: 55, y: 36 }, { x: 65, y: 40 },
      { x: 32, y: 48 }, { x: 42, y: 46 }, { x: 50, y: 48 }, { x: 58, y: 45 }, { x: 67, y: 50 },
      { x: 36, y: 58 }, { x: 46, y: 57 }, { x: 54, y: 58 }, { x: 63, y: 60 },
      { x: 40, y: 68 }, { x: 50, y: 68 }, { x: 60, y: 70 },
      { x: 47, y: 77 }
    ]
  },
  {
    id: 'melon',
    name: 'Melon',
    category: 'biji-banyak',
    categoryLabel: 'Biji Banyak',
    seedCountDesc: 'Puluhan biji pipih',
    seedExplanation: 'Melon memiliki banyak biji lonjong pipih berwarna kuning muda yang terbungkus serat di bagian tengahnya.',
    speechText: 'Melon! Wangi harum dan di tengahnya tersimpan banyak biji pipih!',
    funFact: 'Kulit buah melon memiliki pola jaring-jaring yang unik!',
    themeColor: {
      bg: 'bg-lime-50',
      border: 'border-lime-300',
      accent: 'bg-lime-500',
      light: '#F1F8E9',
      text: 'text-lime-800',
    },
    seeds: [
      { x: 45, y: 42 }, { x: 53, y: 40 }, { x: 43, y: 48 }, { x: 54, y: 47 },
      { x: 48, y: 52 }, { x: 44, y: 57 }, { x: 55, y: 56 }, { x: 47, y: 62 },
      { x: 52, y: 64 }, { x: 48, y: 69 }
    ]
  },
  {
    id: 'jambu-biji',
    name: 'Jambu Biji',
    category: 'biji-banyak',
    categoryLabel: 'Biji Banyak',
    seedCountDesc: 'Banyak biji kecil keras',
    seedExplanation: 'Jambu biji memiliki banyak sekali biji kecil yang keras di bagian tengah daging buahnya yang merah atau putih.',
    speechText: 'Jambu biji! Sesuai namanya, jambu ini punya banyak biji kecil yang keras!',
    funFact: 'Jambu biji sangat kaya vitamin C, lebih banyak dari jeruk!',
    themeColor: {
      bg: 'bg-green-50',
      border: 'border-green-300',
      accent: 'bg-green-500',
      light: '#E8F5E9',
      text: 'text-green-800',
    },
    seeds: [
      { x: 44, y: 42 }, { x: 52, y: 43 }, { x: 48, y: 48 }, { x: 42, y: 52 },
      { x: 55, y: 51 }, { x: 46, y: 58 }, { x: 53, y: 57 }, { x: 48, y: 63 }
    ]
  },
  {
    id: 'jeruk',
    name: 'Jeruk',
    category: 'biji-banyak',
    categoryLabel: 'Biji Banyak',
    seedCountDesc: 'Banyak biji di tiap juring',
    seedExplanation: 'Di dalam bulir-bulir buah jeruk terdapat beberapa biji di setiap potongannya, sehingga tergolong berbiji banyak.',
    speechText: 'Jeruk! Segar asam manis dengan beberapa biji di setiap juring buahnya!',
    funFact: 'Buah jeruk kaya vitamin C yang membuat tubuh kita kuat dan tidak mudah sakit!',
    themeColor: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      accent: 'bg-orange-500',
      light: '#FFF3E0',
      text: 'text-orange-800',
    },
    seeds: [
      { x: 42, y: 40 }, { x: 56, y: 42 }, { x: 38, y: 55 },
      { x: 60, y: 54 }, { x: 45, y: 65 }, { x: 55, y: 63 }
    ]
  },
  {
    id: 'mangga',
    name: 'Mangga',
    category: 'biji-sedikit',
    categoryLabel: 'Biji Sedikit (Satu)',
    seedCountDesc: 'Hanya 1 biji besar',
    seedExplanation: 'Mangga hanya memiliki SATU biji besar dan pipih di tengahnya. Biji mangga sering disebut pelok.',
    speechText: 'Mangga! Manis lezat dan hanya memiliki satu biji besar di tengahnya!',
    funFact: 'Biji mangga berukuran sangat besar sehingga mudah kita pisahkan saat makan!',
    themeColor: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      accent: 'bg-yellow-500',
      light: '#FFFDE7',
      text: 'text-yellow-800',
    },
    seeds: [
      { x: 50, y: 53, size: 28 }
    ]
  },
  {
    id: 'alpukat',
    name: 'Alpukat',
    category: 'biji-sedikit',
    categoryLabel: 'Biji Sedikit (Satu)',
    seedCountDesc: 'Hanya 1 biji bulat besar',
    seedExplanation: 'Alpukat hanya memiliki SATU biji bulat berwarna cokelat di bagian tengahnya.',
    speechText: 'Alpukat! Lembut dan bergizi, hanya ada satu biji bulat besar di dalamnya!',
    funFact: 'Biji alpukat bulat licin seperti bola kecil berwarna cokelat!',
    themeColor: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      accent: 'bg-emerald-600',
      light: '#E8F5E9',
      text: 'text-emerald-900',
    },
    seeds: [
      { x: 50, y: 58, size: 30 }
    ]
  },
  {
    id: 'rambutan',
    name: 'Rambutan',
    category: 'biji-sedikit',
    categoryLabel: 'Biji Sedikit (Satu)',
    seedCountDesc: 'Hanya 1 biji lonjong',
    seedExplanation: 'Rambutan hanya memiliki SATU biji lonjong yang diselimuti daging putih bening yang manis.',
    speechText: 'Rambutan! Kulitnya lucu berambut merah dan hanya punya satu biji di dalam!',
    funFact: 'Nama buah ini rambutan karena kulit luarnya penuh rambut-rambut halus!',
    themeColor: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      accent: 'bg-red-500',
      light: '#FFEBEE',
      text: 'text-red-800',
    },
    seeds: [
      { x: 50, y: 52, size: 22 }
    ]
  },
  {
    id: 'kelengkeng',
    name: 'Kelengkeng',
    category: 'biji-sedikit',
    categoryLabel: 'Biji Sedikit (Satu)',
    seedCountDesc: 'Hanya 1 biji hitam bulat',
    seedExplanation: 'Kelengkeng hanya memiliki SATU biji hitam mengilap di tengah daging buahnya yang manis kenyal.',
    speechText: 'Kelengkeng! Manis seperti madu dan hanya ada satu biji hitam mengkilap!',
    funFact: 'Kelengkeng sering disebut mata naga karena biji hitamnya mirip pupil mata!',
    themeColor: {
      bg: 'bg-amber-50',
      border: 'border-amber-300',
      accent: 'bg-amber-600',
      light: '#FFF8E1',
      text: 'text-amber-900',
    },
    seeds: [
      { x: 50, y: 50, size: 20 }
    ]
  },
  {
    id: 'apel',
    name: 'Apel',
    category: 'biji-sedikit',
    categoryLabel: 'Biji Sedikit',
    seedCountDesc: 'Hanya 2 sampai 4 biji kecil',
    seedExplanation: 'Apel hanya memiliki sedikit biji kecil (sekitar dua sampai empat biji) yang berkumpul di rumah biji tengah.',
    speechText: 'Apel! Renyah dan manis, bijinya hanya sedikit di bagian tengah!',
    funFact: 'Makan apel membuat gigi kita bersih dan gusi jadi sehat!',
    themeColor: {
      bg: 'bg-red-50',
      border: 'border-red-300',
      accent: 'bg-red-500',
      light: '#FFEBEE',
      text: 'text-red-800',
    },
    seeds: [
      { x: 47, y: 48, size: 8 },
      { x: 53, y: 48, size: 8 },
      { x: 50, y: 54, size: 8 }
    ]
  },
  {
    id: 'salak',
    name: 'Salak',
    category: 'biji-sedikit',
    categoryLabel: 'Biji Sedikit (1-3 Biji)',
    seedCountDesc: 'Hanya 1 sampai 3 biji',
    seedExplanation: 'Salak berkulit sisik cokelat dan di dalamnya hanya ada sedikit biji, biasanya satu sampai tiga biji keras.',
    speechText: 'Salak! Kulitnya bersisik seperti ular dan hanya memiliki satu sampai tiga biji!',
    funFact: 'Salak dijuluki snake fruit oleh orang luar negeri karena kulitnya mirip sisik ular!',
    themeColor: {
      bg: 'bg-stone-50',
      border: 'border-stone-300',
      accent: 'bg-stone-600',
      light: '#EFEBE9',
      text: 'text-stone-800',
    },
    seeds: [
      { x: 46, y: 52, size: 16 },
      { x: 54, y: 52, size: 16 }
    ]
  }
];
