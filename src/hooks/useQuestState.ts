import { useState } from 'react';
import { dailyQuests } from '../constants/gameData';

interface QuestState {
  dailyQuestsState: Array<{
    id: number;
    title: string;
    icon: string;
    color: string;
    progress: number;
    maxProgress: number;
    status: string;
  }>;
  userProgress: {
    totalQuests: number;
    completedQuests: number;
    currentStreak: number;
    totalXP: number;
    level: number;
  };
}

interface QuestActions {
  setDailyQuestsState: (quests: Array<any>) => void;
  setUserProgress: (progress: any) => void;
  handleQuestAction: (quest: any) => void;
  handleStartQuest: (quest: any) => void;
  handleClaimReward: (quest: any) => void;
  updateQuestProgress: (questType: string, progressAmount?: number) => void;
}

export const useQuestState = (): QuestState & QuestActions => {
  const [dailyQuestsState, setDailyQuestsState] = useState(dailyQuests);
  const [userProgress, setUserProgress] = useState({
    totalQuests: 12,
    completedQuests: 8,
    currentStreak: 23,
    totalXP: 2840,
    level: 7,
  });

  const handleQuestAction = (quest: any) => {
    if (quest.status === 'in_progress') {
      handleStartQuest(quest);
    } else if (quest.status === 'completed') {
      handleClaimReward(quest);
    }
  };

  const handleStartQuest = (quest: any) => {
    const updatedQuests = dailyQuestsState.map((q) =>
      q.id === quest.id ? { ...q, status: 'in_progress' } : q
    );
    setDailyQuestsState(updatedQuests);
  };

  const handleClaimReward = (quest: any) => {
    const updatedQuests = dailyQuestsState.map((q) =>
      q.id === quest.id ? { ...q, status: 'claimed' } : q
    );
    setDailyQuestsState(updatedQuests);
    
    // Update user progress
    setUserProgress(prev => ({
      ...prev,
      completedQuests: prev.completedQuests + 1,
      totalXP: prev.totalXP + 50,
    }));
  };

  const updateQuestProgress = (questType: string, progressAmount: number = 1) => {
    const updatedQuests = dailyQuestsState.map((quest) => {
      if (quest.type === questType && quest.status === 'in_progress') {
        const newProgress = Math.min(quest.progress + progressAmount, quest.maxProgress);
        const newStatus = newProgress >= quest.maxProgress ? 'completed' : 'in_progress';
        return { ...quest, progress: newProgress, status: newStatus };
      }
      return quest;
    });
    setDailyQuestsState(updatedQuests);
  };

  return {
    dailyQuestsState,
    setDailyQuestsState,
    userProgress,
    setUserProgress,
    handleQuestAction,
    handleStartQuest,
    handleClaimReward,
    updateQuestProgress,
  };
}; 