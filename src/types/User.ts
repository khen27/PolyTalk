// src/types/User.ts

/**
 * User profile and progress type definition
 * Used for user state, profile, and progress tracking.
 */

export interface UserLanguage {
  id: number;
  name: string;
  flag: string;
  proficiency: string;
  progress: number;
  region: string;
}

export interface UserBook {
  id: number;
  title: string;
  author: string;
  progress: number;
  cover: string;
  status: string;
}

export interface UserRegion {
  origin: string;
  flag: string;
  timezone: string;
  learningRegion: string;
}

export interface UserProfile {
  userName: string;
  languages: UserLanguage[];
  books: UserBook[];
  region: UserRegion;
} 