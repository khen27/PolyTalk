import {
  getStatusColor,
  getRankColor,
  getCategoryColor,
  getRecommendationColor,
  getBadgeConfig,
  getCategoryConfig
} from '../styles';

describe('Style Utilities', () => {
  describe('getStatusColor', () => {
    it('returns correct color for completed status', () => {
      expect(getStatusColor('completed')).toBe('#58CC67');
    });

    it('returns correct color for claimed status', () => {
      expect(getStatusColor('claimed')).toBe('#9CA3AF');
    });

    it('returns default color for in_progress status', () => {
      expect(getStatusColor('in_progress')).toBe('#4B5563');
    });

    it('returns default color for unknown status', () => {
      expect(getStatusColor('unknown' as any)).toBe('#4B5563');
    });
  });

  describe('getRankColor', () => {
    it('returns gold for rank 1', () => {
      expect(getRankColor(1)).toBe('#FFD700');
    });

    it('returns silver for rank 2', () => {
      expect(getRankColor(2)).toBe('#C0C0C0');
    });

    it('returns bronze for rank 3', () => {
      expect(getRankColor(3)).toBe('#CD7F32');
    });

    it('returns default color for other ranks', () => {
      expect(getRankColor(4)).toBe('#4B5563');
    });
  });

  describe('getCategoryColor', () => {
    it('returns correct color for beginner category', () => {
      expect(getCategoryColor('beginner')).toBe('#4CAF50');
    });

    it('returns correct color for intermediate category', () => {
      expect(getCategoryColor('intermediate')).toBe('#2196F3');
    });

    it('returns correct color for advanced category', () => {
      expect(getCategoryColor('advanced')).toBe('#9C27B0');
    });

    it('returns default color for unknown category', () => {
      expect(getCategoryColor('unknown')).toBe('#4B5563');
    });

    it('is case insensitive', () => {
      expect(getCategoryColor('BEGINNER')).toBe('#4CAF50');
    });
  });

  describe('getRecommendationColor', () => {
    it('returns correct color for practice type', () => {
      expect(getRecommendationColor('practice')).toBe('#4CAF50');
    });

    it('returns correct color for review type', () => {
      expect(getRecommendationColor('review')).toBe('#FFC107');
    });

    it('returns correct color for challenge type', () => {
      expect(getRecommendationColor('challenge')).toBe('#F44336');
    });

    it('returns default color for unknown type', () => {
      expect(getRecommendationColor('unknown')).toBe('#4B5563');
    });

    it('is case insensitive', () => {
      expect(getRecommendationColor('PRACTICE')).toBe('#4CAF50');
    });
  });

  describe('getBadgeConfig', () => {
    it('returns correct config for achievement badge', () => {
      expect(getBadgeConfig('achievement')).toEqual({
        color: '#4CAF50',
        icon: '🏆'
      });
    });

    it('returns correct config for milestone badge', () => {
      expect(getBadgeConfig('milestone')).toEqual({
        color: '#2196F3',
        icon: '🎯'
      });
    });

    it('returns correct config for special badge', () => {
      expect(getBadgeConfig('special')).toEqual({
        color: '#9C27B0',
        icon: '⭐'
      });
    });

    it('returns default config for unknown badge type', () => {
      expect(getBadgeConfig('unknown')).toEqual({
        color: '#4B5563',
        icon: '📋'
      });
    });

    it('is case insensitive', () => {
      expect(getBadgeConfig('ACHIEVEMENT')).toEqual({
        color: '#4CAF50',
        icon: '🏆'
      });
    });
  });

  describe('getCategoryConfig', () => {
    it('returns correct config for vocabulary category', () => {
      expect(getCategoryConfig('vocabulary')).toEqual({
        color: '#4CAF50',
        icon: '📚'
      });
    });

    it('returns correct config for grammar category', () => {
      expect(getCategoryConfig('grammar')).toEqual({
        color: '#2196F3',
        icon: '📝'
      });
    });

    it('returns correct config for pronunciation category', () => {
      expect(getCategoryConfig('pronunciation')).toEqual({
        color: '#9C27B0',
        icon: '🗣️'
      });
    });

    it('returns correct config for conversation category', () => {
      expect(getCategoryConfig('conversation')).toEqual({
        color: '#F44336',
        icon: '💬'
      });
    });

    it('returns default config for unknown category', () => {
      expect(getCategoryConfig('unknown')).toEqual({
        color: '#4B5563',
        icon: '📋'
      });
    });

    it('is case insensitive', () => {
      expect(getCategoryConfig('VOCABULARY')).toEqual({
        color: '#4CAF50',
        icon: '📚'
      });
    });
  });
}); 