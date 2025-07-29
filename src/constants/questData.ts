// src/constants/questData.ts

/**
 * Quest Data Module
 * Currently, all quest data is managed via dailyQuests in gameData.ts.
 * This file is prepared for future modularization of quest types.
 */

export type Quest = {
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

// Placeholder for future quest data
export const quests: Quest[] = []; 