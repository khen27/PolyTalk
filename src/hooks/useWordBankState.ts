import { useState } from 'react';
import { initialWordBank } from '../constants/gameData';

interface WordBankState {
  wordBank: Array<{
    id: number;
    word: string;
    translation: string;
    category: string;
    difficulty: string;
    dateAdded: string;
    source: string;
    example: string;
    exampleTranslation: string;
  }>;
}

interface WordBankActions {
  setWordBank: (words: Array<any>) => void;
  addWord: (word: any) => void;
  removeWord: (wordId: number) => void;
  getCategoryConfig: (category: string) => any;
}

export const useWordBankState = (): WordBankState & WordBankActions => {
  const [wordBank, setWordBank] = useState(initialWordBank);

  const addWord = (word: any) => {
    setWordBank(prev => [...prev, { ...word, id: Date.now() }]);
  };

  const removeWord = (wordId: number) => {
    setWordBank(prev => prev.filter(word => word.id !== wordId));
  };

  const getCategoryConfig = (category: string) => {
    const categoryConfigs = {
      'Basic Vocabulary': {
        color: '#58CC67',
        icon: '📚',
        backgroundColor: 'rgba(88, 204, 103, 0.1)',
      },
      'Advanced Vocabulary': {
        color: '#3AB1FF',
        icon: '🎯',
        backgroundColor: 'rgba(58, 177, 255, 0.1)',
      },
      'Grammar': {
        color: '#7C3AED',
        icon: '📝',
        backgroundColor: 'rgba(124, 58, 237, 0.1)',
      },
      'Conversation': {
        color: '#F59E0B',
        icon: '💬',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
      },
      'Culture': {
        color: '#EF4444',
        icon: '🌍',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
      },
    };
    return categoryConfigs[category as keyof typeof categoryConfigs] || categoryConfigs['Basic Vocabulary'];
  };

  return {
    wordBank,
    setWordBank,
    addWord,
    removeWord,
    getCategoryConfig,
  };
}; 