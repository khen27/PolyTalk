// src/types/Achievement.ts

/**
 * Achievement (badge) type definition
 * Used for user achievements, badges, and progress tracking.
 */

export interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
} 