// src/types/index.ts

/**
 * Comprehensive type definitions for PolyTalk app
 * This file contains all the types needed for the TypeScript migration
 */

// Re-export existing types
export * from './User';
export * from './Quest';
export * from './Navigation';

// Import Achievement type
import type { Achievement } from './Achievement';
export type { Achievement };

// Game Mode Types
export interface GameMode {
  id: number;
  title: string;
  description: string;
  color: string;
  badge?: string;
  badgeColor?: string;
  requiresUploads: number;
  route: string;
  icon?: string;
  isLocked?: boolean;
  requiredUploads?: number;
}

// Quest Types
export interface Quest {
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
}

// Word Bank Types
export interface WordBankEntry {
  id: number;
  word: string;
  translation: string;
  category: string;
  difficulty: string;
  dateAdded: string;
  source: string;
  example: string;
  exampleTranslation: string;
  lastReviewed?: string;
}

export interface WordBankItem {
  id: number;
  word: string;
  translation: string;
  category: string;
  difficulty: string;
  lastReviewed: string;
  example: string;
  exampleTranslation: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  id: number;
  name: string;
  avatar: string;
  xp: number;
  rank: number;
  isCurrentUser: boolean;
  gems: number;
  streak: number;
}

// Learning Path Types
export interface LearningPathItem {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'locked' | 'available';
  progress: number;
  xpReward: number;
  lessons: LearningPathLesson[];
}

export interface LearningPathLesson {
  id: number;
  title: string;
  status: string;
  xp: number;
}

// Streak Data Types
export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  weeklyGoal: number;
  reviewItems: ReviewItem[];
}

export interface ReviewItem {
  id: number;
  word: string;
  translation: string;
  category: string;
  difficulty: string;
}

// Recommendation Types
export interface Recommendation {
  type: string;
  title: string;
  description: string;
  subtitle?: string;
  estimatedTime?: string;
  xpReward?: number;
}

// Category Config Types
export interface CategoryConfig {
  text: string;
  backgroundColor: string;
  textColor: string;
}

// Badge Config Types
export interface BadgeConfig {
  text: string;
  backgroundColor: string;
  textColor: string;
}

// Animation Types
export interface SpringAnimationConfig {
  toValue: number;
  useNativeDriver: boolean;
  duration?: number;
}

// State Types
export interface UserState {
  userName: string;
  userLevel: number;
  userXP: number;
  userGems: number;
  userStreak: number;
  selectedLanguage: string;
  learningStyle: string;
  wordBank: WordBankEntry[];
  gameModes: GameMode[];
  dailyQuests: Quest[];
  achievements: Achievement[];
  leaderboardData: LeaderboardEntry[];
  learningPathData: LearningPathItem[];
  streakData: StreakData;
  recommendations: Recommendation[];
}

export interface UserActions {
  setUserName: (name: string) => void;
  setUserLevel: (level: number) => void;
  setUserXP: (xp: number) => void;
  setUserGems: (gems: number) => void;
  setUserStreak: (streak: number) => void;
  setSelectedLanguage: (language: string) => void;
  setLearningStyle: (style: string) => void;
  setWordBank: (words: WordBankEntry[]) => void;
  setGameModes: (modes: GameMode[]) => void;
  setDailyQuests: (quests: Quest[]) => void;
  setAchievements: (achievements: Achievement[]) => void;
  setLeaderboardData: (data: LeaderboardEntry[]) => void;
  setLearningPathData: (data: LearningPathItem[]) => void;
  setStreakData: (data: StreakData) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
}

// Component Props Types
export interface GameModeCarouselProps {
  gameModes: GameMode[];
  onGameModePress: (mode: GameMode) => void;
}

export interface LeaderboardModalProps {
  leaderboardData: LeaderboardEntry[];
  visible: boolean;
  onClose: () => void;
}

export interface LearningPathModalProps {
  learningPathData: LearningPathItem[];
  visible: boolean;
  onClose: () => void;
}

// Screen Types
export type ScreenType = 'home' | 'upload' | 'review' | 'progress' | 'quiz' | 'chat';

// Navigation Types
export interface NavigationState {
  currentScreen: ScreenType;
  nextScreen: ScreenType | null;
  showSplash: boolean;
  showOnboarding: boolean;
  onboardingStep: number;
}

// Animation State Types
export interface AnimationState {
  fadeAnim: any;
  slideAnim: any;
  scaleAnim: any;
  rotateAnim: any;
}

// Data State Types
export interface DataState {
  wordBank: WordBankEntry[];
  gameModes: GameMode[];
  dailyQuests: Quest[];
  achievements: Achievement[];
  leaderboardData: LeaderboardEntry[];
  learningPathData: LearningPathItem[];
  streakData: StreakData;
  recommendations: Recommendation[];
}

// Game Mode State Types
export interface GameModeState {
  selectedGameMode: GameMode | null;
  gameModeProgress: Record<number, number>;
  gameModeUnlocked: Record<number, boolean>;
}

// Upload State Types
export interface UploadState {
  selectedImage: string | null;
  recording: boolean;
  audioUri: string | null;
  uploadProgress: number;
  uploadStatus: 'idle' | 'uploading' | 'success' | 'error';
}

// Quiz State Types
export interface QuizState {
  currentQuestion: number;
  selectedAnswer: string | null;
  quizProgress: number;
  quizScore: number;
  quizComplete: boolean;
}

// Progress State Types
export interface ProgressState {
  weeklyProgress: number;
  monthlyProgress: number;
  totalProgress: number;
  goalProgress: number;
}

// Utility Types
export type RankType = number;
export type CategoryType = string;
export type BadgeType = string;
export type StatType = string; 