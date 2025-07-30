import { useState } from 'react';
import { gameModes } from '../constants/gameData';

interface GameModeState {
  gameModesState: Array<{
    id: number;
    title: string;
    description: string;
    color: string;
    badge: string;
    badgeColor: string;
    requiresUploads: number;
    route: string;
  }>;
  uploadCount: number;
}

interface GameModeActions {
  setGameModesState: (modes: Array<any>) => void;
  setUploadCount: (count: number) => void;
  handleGameModeSelect: (gameMode: any) => void;
  getBadgeConfig: (badgeType: string) => any;
}

export const useGameModeState = (): GameModeState & GameModeActions => {
  const [gameModesState, setGameModesState] = useState(gameModes);
  const [uploadCount, setUploadCount] = useState(0);

  const handleGameModeSelect = (gameMode: any) => {
    // Handle game mode selection logic
    console.log('Selected game mode:', gameMode);
  };

  const getBadgeConfig = (badgeType: string) => {
    const badgeConfigs = {
      'START HERE': {
        backgroundColor: '#10B981',
        textColor: '#FFFFFF',
        borderColor: '#059669',
      },
      'UNLOCK SOON': {
        backgroundColor: '#7C3AED',
        textColor: '#FFFFFF',
        borderColor: '#6D28D9',
      },
      'COMING SOON': {
        backgroundColor: '#3B82F6',
        textColor: '#FFFFFF',
        borderColor: '#2563EB',
      },
    };
    return badgeConfigs[badgeType as keyof typeof badgeConfigs] || badgeConfigs['COMING SOON'];
  };

  return {
    gameModesState,
    setGameModesState,
    uploadCount,
    setUploadCount,
    handleGameModeSelect,
    getBadgeConfig,
  };
}; 