// src/constants/gameData.ts

export type GameMode = {
  id: number;
  title: string;
  description: string;
  color: string;
  badge: string;
  badgeColor: string;
  requiresUploads: number;
  route: string;
};

export type DailyQuest = {
  id: number;
  title: string;
  description: string;
  type: string;
  icon: string;
  xpReward: number;
  gemReward: number;
  progress: number;
  maxProgress: number;
  status: string;
  color: string;
  category: string;
};

export type WordBankEntry = {
  id: number;
  word: string;
  translation: string;
  category: string;
  difficulty: string;
  dateAdded: string;
  source: string;
  example: string;
  exampleTranslation: string;
};

export const gameModes: GameMode[] = [
  {
    id: 1,
    title: "Upload & Learn",
    description: "Add notes, photos, or voice recordings to get AI-powered reviews",
    color: "rgba(88, 204, 103, 0.9)",
    badge: "START HERE",
    badgeColor: "#10B981",
    requiresUploads: 0,
    route: "upload"
  },
  {
    id: 2,
    title: "Quiz Challenge",
    description: "Test your knowledge with personalized quizzes",
    color: "rgba(124, 58, 237, 0.9)",
    badge: "UNLOCK SOON",
    badgeColor: "#7C3AED",
    requiresUploads: 3,
    route: "quiz"
  },
  {
    id: 3,
    title: "AI Chat Practice",
    description: "Practice conversations with AI in real scenarios",
    color: "rgba(58, 177, 255, 0.9)",
    badge: "COMING SOON",
    badgeColor: "#3B82F6",
    requiresUploads: 0,
    route: "chat"
  }
];

export const dailyQuests: DailyQuest[] = [
  {
    id: 1,
    title: "Practice Session",
    description: "Complete 1 practice session",
    type: "practice",
    icon: "🎯",
    xpReward: 25,
    gemReward: 5,
    progress: 0,
    maxProgress: 1,
    status: "available",
    color: "#58CC67",
    category: "daily"
  },
  {
    id: 2,
    title: "Vocabulary Review",
    description: "Review 5 words from yesterday",
    type: "review",
    icon: "📚",
    xpReward: 35,
    gemReward: 8,
    progress: 3,
    maxProgress: 5,
    status: "in_progress",
    color: "#3AB1FF",
    category: "daily"
  },
  {
    id: 3,
    title: "Upload Content",
    description: "Add 1 new lesson material",
    type: "upload",
    icon: "📤",
    xpReward: 50,
    gemReward: 10,
    progress: 0,
    maxProgress: 1,
    status: "available",
    color: "#7C3AED",
    category: "daily"
  },
  {
    id: 4,
    title: "Quiz Challenge",
    description: "Score 80%+ on any quiz",
    type: "quiz",
    icon: "🏆",
    xpReward: 40,
    gemReward: 12,
    progress: 0,
    maxProgress: 1,
    status: "available",
    color: "#FF6B6B",
    category: "daily"
  }
];

export const initialWordBank: WordBankEntry[] = [
  {
    id: 1,
    word: "estudiar",
    translation: "to study",
    category: "verbs",
    difficulty: "beginner",
    dateAdded: "Today",
    source: "upload",
    example: "Me gusta estudiar español",
    exampleTranslation: "I like to study Spanish"
  },
  {
    id: 2,
    word: "biblioteca",
    translation: "library",
    category: "places",
    difficulty: "beginner",
    dateAdded: "Yesterday",
    source: "ai_review",
    example: "La biblioteca está cerrada",
    exampleTranslation: "The library is closed"
  },
  {
    id: 3,
    word: "subjuntivo",
    translation: "subjunctive",
    category: "grammar",
    difficulty: "advanced",
    dateAdded: "Dec 28",
    source: "upload",
    example: "Espero que estudies el subjuntivo",
    exampleTranslation: "I hope you study the subjunctive"
  },
  {
    id: 4,
    word: "aeropuerto",
    translation: "airport",
    category: "travel",
    difficulty: "intermediate",
    dateAdded: "Dec 27",
    source: "ai_review",
    example: "El aeropuerto está muy lejos",
    exampleTranslation: "The airport is very far"
  }
]; 