// src/types/Quest.ts

/**
 * Quest system type definition
 * Used for daily quests, achievements, and future quest features.
 */

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