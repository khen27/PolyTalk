/**
 * Style Utility Functions
 * Contains color getters and style configuration utilities
 */

type StatusType = 'completed' | 'claimed' | 'in_progress';
type RankType = number;
type CategoryType = string;
type RecommendationType = string;
type BadgeType = string;

/**
 * Get the color for a given status
 */
export const getStatusColor = (status: StatusType): string => {
  switch (status) {
    case 'completed': return '#58CC67';
    case 'claimed': return '#9CA3AF';
    case 'in_progress': return '#4B5563'; // Default color for in_progress
    default: return '#4B5563';
  }
};

/**
 * Get the color for a leaderboard rank
 */
export const getRankColor = (rank: RankType): string => {
  if (rank === 1) return '#FFD700'; // Gold
  if (rank === 2) return '#C0C0C0'; // Silver
  if (rank === 3) return '#CD7F32'; // Bronze
  return '#4B5563'; // Default gray
};

/**
 * Get the color for a category
 */
export const getCategoryColor = (category: CategoryType): string => {
  switch (category.toLowerCase()) {
    case 'beginner': return '#4CAF50';
    case 'intermediate': return '#2196F3';
    case 'advanced': return '#9C27B0';
    default: return '#4B5563';
  }
};

/**
 * Get the color for a recommendation type
 */
export const getRecommendationColor = (type: RecommendationType): string => {
  switch (type.toLowerCase()) {
    case 'practice': return '#4CAF50';
    case 'review': return '#FFC107';
    case 'challenge': return '#F44336';
    default: return '#4B5563';
  }
};

/**
 * Get the badge configuration for a badge type
 */
export const getBadgeConfig = (badgeType: BadgeType): { color: string; icon: string } => {
  switch (badgeType.toLowerCase()) {
    case 'achievement':
      return { color: '#4CAF50', icon: '🏆' };
    case 'milestone':
      return { color: '#2196F3', icon: '🎯' };
    case 'special':
      return { color: '#9C27B0', icon: '⭐' };
    default:
      return { color: '#4B5563', icon: '📋' };
  }
};

/**
 * Get the category configuration
 */
export const getCategoryConfig = (category: CategoryType): { color: string; icon: string } => {
  switch (category.toLowerCase()) {
    case 'vocabulary':
      return { color: '#4CAF50', icon: '📚' };
    case 'grammar':
      return { color: '#2196F3', icon: '📝' };
    case 'pronunciation':
      return { color: '#9C27B0', icon: '🗣️' };
    case 'conversation':
      return { color: '#F44336', icon: '💬' };
    default:
      return { color: '#4B5563', icon: '📋' };
  }
}; 