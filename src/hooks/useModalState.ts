import { useState } from 'react';

interface ModalState {
  showLeaderboardModal: boolean;
  showAchievementsModal: boolean;
  showLearningPath: boolean;
  showStreakModal: boolean;
  showTextbookModal: boolean;
}

interface ModalActions {
  setShowLeaderboardModal: (show: boolean) => void;
  setShowAchievementsModal: (show: boolean) => void;
  setShowLearningPath: (show: boolean) => void;
  setShowStreakModal: (show: boolean) => void;
  setShowTextbookModal: (show: boolean) => void;
  closeAllModals: () => void;
}

export const useModalState = (): ModalState & ModalActions => {
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showTextbookModal, setShowTextbookModal] = useState(false);

  const closeAllModals = () => {
    setShowLeaderboardModal(false);
    setShowAchievementsModal(false);
    setShowLearningPath(false);
    setShowStreakModal(false);
    setShowTextbookModal(false);
  };

  return {
    showLeaderboardModal,
    setShowLeaderboardModal,
    showAchievementsModal,
    setShowAchievementsModal,
    showLearningPath,
    setShowLearningPath,
    showStreakModal,
    setShowStreakModal,
    showTextbookModal,
    setShowTextbookModal,
    closeAllModals,
  };
}; 