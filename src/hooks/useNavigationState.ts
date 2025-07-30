import { useState } from 'react';

interface NavigationState {
  screen: string;
  showSplash: boolean;
  showOnboarding: boolean;
  onboardingStep: number;
}

interface NavigationActions {
  setScreen: (screen: string) => void;
  setShowSplash: (show: boolean) => void;
  setShowOnboarding: (show: boolean) => void;
  setOnboardingStep: (step: number) => void;
}

export const useNavigationState = (): NavigationState & NavigationActions => {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [screen, setScreen] = useState('home');

  return {
    screen,
    setScreen,
    showSplash,
    setShowSplash,
    showOnboarding,
    setShowOnboarding,
    onboardingStep,
    setOnboardingStep,
  };
}; 