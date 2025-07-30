import { useState } from 'react';

interface DataState {
  leaderboardData: Array<any>;
  achievementsData: Array<any>;
  learningPathData: Array<any>;
  streakData: any;
  textbooks: Array<string>;
  userProfile: {
    languages: Array<{
      id: string;
      name: string;
      flag: string;
      proficiency: string;
      region: string;
      progress: number;
    }>;
    books: Array<{
      id: string;
      title: string;
      author: string;
      cover: string;
      progress: number;
    }>;
  };
  learningStyles: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
}

interface DataActions {
  setLeaderboardData: (data: Array<any>) => void;
  setAchievementsData: (data: Array<any>) => void;
  setLearningPathData: (data: Array<any>) => void;
  setStreakData: (data: any) => void;
  setTextbooks: (books: Array<string>) => void;
  setUserProfile: (profile: any) => void;
  setLearningStyles: (styles: Array<any>) => void;
}

export const useDataState = (): DataState & DataActions => {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, name: 'Sarah M.', rank: 1, xp: 3240, avatar: require('../../assets/one.png') },
    { id: 2, name: 'Alex K.', rank: 2, xp: 2980, avatar: require('../../assets/two.png') },
    { id: 3, name: 'Zander', rank: 3, xp: 2840, avatar: require('../../assets/zander.jpg') },
    { id: 4, name: 'Maria L.', rank: 4, xp: 2650, avatar: require('../../assets/three.png') },
    { id: 5, name: 'David P.', rank: 5, xp: 2480, avatar: require('../../assets/four.png') },
    { id: 6, name: 'Emma R.', rank: 6, xp: 2320, avatar: require('../../assets/five.png') },
    { id: 7, name: 'James T.', rank: 7, xp: 2180, avatar: require('../../assets/six.png') },
    { id: 8, name: 'Lisa W.', rank: 8, xp: 2040, avatar: require('../../assets/seven.png') },
  ]);

  const [achievementsData, setAchievementsData] = useState([
    { id: 1, title: 'First Steps', description: 'Complete your first lesson', icon: '🎯', category: 'learning', earned: true, progress: 100 },
    { id: 2, title: 'Streak Master', description: 'Maintain a 7-day streak', icon: '🔥', category: 'consistency', earned: true, progress: 100 },
    { id: 3, title: 'Vocabulary Builder', description: 'Learn 50 new words', icon: '📚', category: 'vocabulary', earned: false, progress: 65 },
    { id: 4, title: 'Grammar Guru', description: 'Complete 10 grammar exercises', icon: '📝', category: 'grammar', earned: false, progress: 40 },
    { id: 5, title: 'Conversation Starter', description: 'Practice speaking for 30 minutes', icon: '💬', category: 'speaking', earned: true, progress: 100 },
    { id: 6, title: 'Cultural Explorer', description: 'Learn about 5 cultural topics', icon: '🌍', category: 'culture', earned: false, progress: 20 },
  ]);

  const [learningPathData, setLearningPathData] = useState([
    { id: 1, title: 'Beginner Basics', status: 'completed', progress: 100, lessons: 5 },
    { id: 2, title: 'Essential Vocabulary', status: 'completed', progress: 100, lessons: 8 },
    { id: 3, title: 'Grammar Foundations', status: 'in_progress', progress: 60, lessons: 6 },
    { id: 4, title: 'Conversation Skills', status: 'locked', progress: 0, lessons: 10 },
    { id: 5, title: 'Advanced Topics', status: 'locked', progress: 0, lessons: 12 },
  ]);

  const [streakData, setStreakData] = useState({
    currentStreak: 23,
    longestStreak: 45,
    totalDays: 67,
    weeklyGoal: 5,
    weeklyProgress: 4,
    recommendations: [
      { type: 'vocabulary', title: 'Review yesterday\'s words', icon: '📚' },
      { type: 'grammar', title: 'Practice verb conjugations', icon: '📝' },
      { type: 'speaking', title: 'Record a short conversation', icon: '🎤' },
    ],
  });

  const [textbooks, setTextbooks] = useState(['Spanish 1: ¡Avancemos!', 'Spanish 2: ¡Avancemos!', 'Spanish 3: ¡Avancemos!']);

  const [userProfile, setUserProfile] = useState({
    languages: [
      { id: '1', name: 'Spanish', flag: '🇪🇸', proficiency: 'Intermediate', region: 'Spain', progress: 75 },
      { id: '2', name: 'French', flag: '🇫🇷', proficiency: 'Beginner', region: 'France', progress: 25 },
    ],
    books: [
      { id: '1', title: 'Spanish 1: ¡Avancemos!', author: 'McDougal Littell', cover: '📖', progress: 60 },
      { id: '2', title: 'French for Beginners', author: 'Collins', cover: '📚', progress: 30 },
    ],
  });

  const [learningStyles, setLearningStyles] = useState([
    { id: 'visual', title: 'Visual Learner', description: 'Learn best through images, charts, and videos', icon: '👁️', color: '#58CC67' },
    { id: 'auditory', title: 'Auditory Learner', description: 'Learn best through listening and speaking', icon: '👂', color: '#3AB1FF' },
    { id: 'kinesthetic', title: 'Kinesthetic Learner', description: 'Learn best through hands-on activities', icon: '✋', color: '#7C3AED' },
    { id: 'reading', title: 'Reading/Writing Learner', description: 'Learn best through text and writing', icon: '📖', color: '#F59E0B' },
  ]);

  return {
    leaderboardData,
    setLeaderboardData,
    achievementsData,
    setAchievementsData,
    learningPathData,
    setLearningPathData,
    streakData,
    setStreakData,
    textbooks,
    setTextbooks,
    userProfile,
    setUserProfile,
    learningStyles,
    setLearningStyles,
  };
}; 