import { useState, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface AnimationState {
  isTransitioning: boolean;
  nextScreen: string | null;
  pressedStat: string | null;
}

interface AnimationActions {
  setIsTransitioning: (transitioning: boolean) => void;
  setNextScreen: (screen: string | null) => void;
  setPressedStat: (stat: string | null) => void;
}

interface AnimationRefs {
  logoScale: Animated.Value;
  gradientShift: Animated.Value;
  taglineOpacity: Animated.Value;
  taglineTranslateY: Animated.Value;
  screenFadeOut: Animated.Value;
  mainScreenSlideUp: Animated.Value;
  screenTransitionX: Animated.Value;
  screenOpacity: Animated.Value;
  screenScale: Animated.Value;
}

export const useAnimationState = (): AnimationState & AnimationActions & AnimationRefs => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextScreen, setNextScreen] = useState<string | null>(null);
  const [pressedStat, setPressedStat] = useState<string | null>(null);

  // Animation refs
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const gradientShift = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(10)).current;
  const screenFadeOut = useRef(new Animated.Value(1)).current;
  const mainScreenSlideUp = useRef(new Animated.Value(height)).current;
  const screenTransitionX = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const screenScale = useRef(new Animated.Value(1)).current;

  return {
    isTransitioning,
    setIsTransitioning,
    nextScreen,
    setNextScreen,
    pressedStat,
    setPressedStat,
    logoScale,
    gradientShift,
    taglineOpacity,
    taglineTranslateY,
    screenFadeOut,
    mainScreenSlideUp,
    screenTransitionX,
    screenOpacity,
    screenScale,
  };
}; 