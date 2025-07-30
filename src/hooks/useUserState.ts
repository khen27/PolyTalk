import { useState } from 'react';

interface UserState {
  userName: string;
  selectedLanguage: string;
  learningStyle: string;
  uploadCount: number;
  wordBank: any[];
  textbookLinked: boolean;
  selectedTextbook: string;
  selectedPage: string;
  notes: string;
  image: any;
  review: string;
  selectedAnswer: any;
  showResult: boolean;
  isInputFocused: boolean;
}

interface UserActions {
  setUserName: (name: string) => void;
  setSelectedLanguage: (language: string) => void;
  setLearningStyle: (style: string) => void;
  setUploadCount: (count: number) => void;
  setWordBank: (words: any[]) => void;
  setTextbookLinked: (linked: boolean) => void;
  setSelectedTextbook: (textbook: string) => void;
  setSelectedPage: (page: string) => void;
  setNotes: (notes: string) => void;
  setImage: (image: any) => void;
  setReview: (review: string) => void;
  setSelectedAnswer: (answer: any) => void;
  setShowResult: (show: boolean) => void;
  setIsInputFocused: (focused: boolean) => void;
}

export const useUserState = (): UserState & UserActions => {
  const [userName, setUserName] = useState('Zander');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [uploadCount, setUploadCount] = useState(0);
  const [wordBank, setWordBank] = useState([]);
  const [textbookLinked, setTextbookLinked] = useState(true);
  const [selectedTextbook, setSelectedTextbook] = useState('Spanish 1: ¡Avancemos!');
  const [selectedPage, setSelectedPage] = useState('156');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [review, setReview] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  return {
    userName,
    setUserName,
    selectedLanguage,
    setSelectedLanguage,
    learningStyle,
    setLearningStyle,
    uploadCount,
    setUploadCount,
    wordBank,
    setWordBank,
    textbookLinked,
    setTextbookLinked,
    selectedTextbook,
    setSelectedTextbook,
    selectedPage,
    setSelectedPage,
    notes,
    setNotes,
    image,
    setImage,
    review,
    setReview,
    selectedAnswer,
    setSelectedAnswer,
    showResult,
    setShowResult,
    isInputFocused,
    setIsInputFocused,
  };
}; 