// src/types/Navigation.ts

/**
 * Navigation type definitions for main app screens
 * Used for type-safe navigation and route params.
 */

export type MainScreen =
  | 'home'
  | 'upload'
  | 'review'
  | 'quiz'
  | 'profile'
  | 'onboarding'
  | 'settings';

export type NavigationParams = {
  [key in MainScreen]?: Record<string, any>;
}; 