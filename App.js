import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Professional SVG Icon Components
const BookIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3848)">
      <Path d="M2 4.65969C2 3.46969 2.96997 2.5697 4.15997 2.6697C6.25997 2.8397 9.43997 3.89973 11.22 5.00973L11.47 5.15969C11.76 5.33969 12.24 5.33969 12.53 5.15969L12.7 5.04971C13.33 4.65971 14.13 4.2697 15 3.9197V7.99972L17 6.6697L19 7.99972V2.77975C19.27 2.72975 19.53 2.69971 19.77 2.67971H19.83C21.02 2.57971 22 3.4697 22 4.6697V16.7397C22 17.6997 21.22 18.5997 20.26 18.7197L19.93 18.7597C17.75 19.0497 14.39 20.1597 12.47 21.2197C12.21 21.3697 11.78 21.3697 11.51 21.2197L11.47 21.1997C9.54997 20.1497 6.20003 19.0497 4.03003 18.7597L3.73999 18.7197C2.77999 18.5997 2 17.6997 2 16.7397V8.84969" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 5.49023V20.4902" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M19 2.7793V7.99927L17 6.66925L15 7.99927V3.91925C16.31 3.39925 17.77 2.9793 19 2.7793Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3848">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const RocketIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3015)">
      <Path d="M19.0598 18.6703L16.9198 14.4004L14.7798 18.6703" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M15.1699 17.9102H18.6899" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M19.9201 21.0198C19.0801 21.6298 18.0501 21.9998 16.9301 21.9998C14.1301 21.9998 11.8501 19.7298 11.8501 16.9198C11.8501 14.1198 14.1201 11.8398 16.9301 11.8398C19.7301 11.8398 22.0101 14.1098 22.0101 16.9198" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.95 8.93024C12 11.0002 11 12.0003 8.92999 11.9503H5.00999C2.99999 12.0003 2 11.0002 2 8.93024V5.01025C2 2.99025 3 1.99023 5.02 1.99023H8.94C11.01 1.99023 12.01 2.99025 11.96 5.01025" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.0097 5.84961H4.94971" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.96973 5.16992V5.84991" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7.98994 5.83984C7.98994 7.58984 6.61994 9.00983 4.93994 9.00983" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3015">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const ChartIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3961)">
      <Path d="M9 22H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2 22H6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M3 13.0009V18.0009C3 18.5509 3.45 19.0009 4 19.0009H5.59998C6.14998 19.0009 6.59998 18.5509 6.59998 18.0009V9.38086C6.59998 8.83086 6.14998 8.38086 5.59998 8.38086H4C3.45 8.38086 3 8.83086 3 9.38086" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.8002 5.18945H11.2002C10.6502 5.18945 10.2002 5.63945 10.2002 6.18945V17.9995C10.2002 18.5495 10.6502 18.9995 11.2002 18.9995H12.8002C13.3502 18.9995 13.8002 18.5495 13.8002 17.9995V6.18945C13.8002 5.63945 13.3502 5.18945 12.8002 5.18945Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20.9999 3C20.9999 2.45 20.5499 2 19.9999 2H18.3999C17.8499 2 17.3999 2.45 17.3999 3V18C17.3999 18.55 17.8499 19 18.3999 19H19.9999C20.5499 19 20.9999 18.55 20.9999 18V7.13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3961">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const FireIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3795)">
      <Path d="M20.59 4.96961C21.47 5.95961 22 7.25961 22 8.68961C22 15.6896 15.52 19.8196 12.62 20.8196C12.28 20.9396 11.72 20.9396 11.38 20.8196C8.48 19.8196 2 15.6896 2 8.68961C2 5.59961 4.49 3.09961 7.56 3.09961C9.38 3.09961 10.99 3.97961 12 5.33961C13.01 3.97961 14.63 3.09961 16.44 3.09961" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3795">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const DocumentIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3620)">
      <Path d="M20 15.04V18C20 21 18.21 22 16 22H8C5.79 22 4 21 4 18V8.25C4 5 5.79 4.25 8 4.25C8 4.87 8.24997 5.43 8.65997 5.84C9.06997 6.25 9.63 6.5 10.25 6.5H13.75C14.99 6.5 16 5.49 16 4.25C18.21 4.25 20 5 20 8.25V10.07" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 4.25C16 5.49 14.99 6.5 13.75 6.5H10.25C9.63 6.5 9.06997 6.25 8.65997 5.84C8.24997 5.43 8 4.87 8 4.25C8 3.01 9.01 2 10.25 2H13.75C14.37 2 14.93 2.25 15.34 2.66C15.75 3.07 16 3.63 16 4.25Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 13H12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 17H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3620">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const CameraIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3159)">
      <Path d="M2.77017 18.25C2.89017 20.31 4.00017 22 6.76017 22H17.2402C20.0002 22 21.1002 20.31 21.2302 18.25L21.7502 9.99C21.8902 7.83 20.1702 6 18.0002 6C17.3902 6 16.8302 5.65 16.5502 5.11L15.8302 3.66C15.3702 2.75 14.1702 2 13.1502 2H10.8602C9.83017 2 8.63017 2.75 8.17017 3.66L7.45017 5.11C7.17017 5.65 6.61017 6 6.00017 6C3.83017 6 2.11017 7.83 2.25017 9.99L2.51017 14.06" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.5 8H13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 18C13.79 18 15.25 16.54 15.25 14.75C15.25 12.96 13.79 11.5 12 11.5C10.21 11.5 8.75 12.96 8.75 14.75C8.75 16.54 10.21 18 12 18Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3159">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const ClockIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3933)">
      <Path d="M12 9.66016V12.4502L13.4 13.8502" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6.96 7.89C8.16 6.43 9.97 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 14.08 17.52 15.94 16 17.13H15.99C14.89 17.99 13.51 18.5 12 18.5C10.51 18.5 9.14 18 8.04 17.15H8.03C6.49 15.96 5.5 14.1 5.5 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.02979 17.1509H8.03979C9.13979 18.0009 10.5098 18.5009 11.9998 18.5009C13.5098 18.5009 14.8898 17.9909 15.9898 17.1309H15.9998L15.4898 19.6009C14.9998 21.5009 13.8998 22.0009 12.5498 22.0009H11.4598C10.1098 22.0009 8.99979 21.5009 8.51979 19.5909L8.02979 17.1509Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8.02979 6.85H8.03979C9.13979 6 10.5098 5.5 11.9998 5.5C13.5098 5.5 14.8898 6.01 15.9898 6.87H15.9998L15.4898 4.4C14.9998 2.5 13.8998 2 12.5498 2H11.4598C10.1098 2 8.99979 2.5 8.51979 4.41L8.02979 6.85Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3933">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const AwardIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3372)">
      <Path d="M18.0198 18.9597C19.7398 17.7997 19.7398 17.7997 19.7398 15.9797V11.0097C19.7398 9.18969 19.7398 9.18969 18.0198 8.02969L13.2898 5.29969C12.5798 4.88969 11.4198 4.88969 10.7098 5.29969L5.97977 8.03969C4.25977 9.19969 4.25977 9.19969 4.25977 11.0197V15.9897C4.25977 17.8097 4.25977 17.8097 5.97977 18.9697L10.7098 21.6997C11.4198 22.1097 12.5798 22.1097 13.2898 21.6997L14.8098 20.8197" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17.5 7.63V5C17.5 3 16.5 2 14.5 2H9.5C7.5 2 6.5 3 6.5 5V7.56" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12.28 16.4199C12.13 16.3599 11.88 16.3599 11.73 16.4199L10.75 16.8099C10.15 17.0499 9.69003 16.7099 9.73003 16.0699L9.79003 15.0199C9.80003 14.8599 9.72003 14.6199 9.62003 14.4999L8.95003 13.6899C8.54003 13.1899 8.71003 12.6499 9.34003 12.4899L10.36 12.2299C10.52 12.1899 10.72 12.0399 10.8 11.9099L11.37 11.0199C11.72 10.4699 12.29 10.4699 12.64 11.0199L13.21 11.9099C13.3 12.0499 13.5 12.1899 13.65 12.2299L14.67 12.4899C15.3 12.6499 15.47 13.1899 15.06 13.6899L14.39 14.4999C14.29 14.6299 14.21 14.8599 14.22 15.0199" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3372">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState('home');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [review, setReview] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  // Recent lessons state - Spanish-focused examples
  const [recentLessons] = useState([
    {
      id: 1,
      title: "Spanish Imperfect Past Tense",
      subtitle: "Era, tenía, hacía patterns",
      date: "Today",
      type: "notes",
      progress: 85,
      badge: "review",
      lastStudied: "2 hours ago",
      difficulty: "intermediate"
    },
    {
      id: 2,
      title: "Spanish Subjunctive Mood",
      subtitle: "Que + subjunctive expressions",
      date: "Yesterday", 
      type: "photo",
      progress: 92,
      badge: "mastered",
      lastStudied: "1 day ago",
      difficulty: "advanced"
    },
    {
      id: 3,
      title: "Spanish Travel Vocabulary",
      subtitle: "Airport, hotel, restaurant terms",
      date: "Dec 28",
      type: "notes", 
      progress: 67,
      badge: "practice",
      lastStudied: "3 days ago",
      difficulty: "beginner"
    }
  ]);

  // Splash screen animations
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const particleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (showSplash) {
      // Start splash screen animations
      Animated.sequence([
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(logoRotation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(particleAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
          }),
        ])
      ]).start();

      // Hide splash screen after 3 seconds
      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    }
  }, [showSplash]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setReview(
        `🧠 AI Review Generated:\n\n` +
        `📘 Vocabulary:\n- estudiar (to study)\n- amigo (friend)\n- biblioteca (library)\n- profesor (teacher)\n\n` +
        `💬 Practice Phrases:\n"Hola, soy estudiante de español."\n"Me gusta estudiar con mis amigos."\n"Voy a la biblioteca todos los días."\n\n` +
        `📝 Interactive Quiz:\nReady to test your knowledge?`
      );
      setScreen('review');
    }
  };

  const handleTextSubmit = () => {
    if (notes.trim().length > 0) {
      setReview(
        `🧠 AI Review Based on Your Notes:\n\n` +
        `📘 Key Vocabulary:\n- casa (house)\n- aprender (to learn)\n- español (Spanish)\n- práctica (practice)\n\n` +
        `💬 Practice Sentences:\n"Estoy aprendiendo español en casa."\n"Necesito más práctica con vocabulario."\n"Mi casa es muy bonita."\n\n` +
        `📝 Interactive Quiz:\nLet's practice what you've learned!`
      );
      setScreen('review');
    }
  };

  const handleQuizAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleLessonSelect = (lesson) => {
    // Set mock review content based on lesson
    setReview(
      `🧠 Reviewing: ${lesson.title}\n\n` +
      `📘 Key Points from ${lesson.lastStudied}:\n` +
      `- Progress: ${lesson.progress}% complete\n` +
      `- Type: ${lesson.type === 'notes' ? 'Text Notes' : 'Photo Upload'}\n` +
      `- Last studied: ${lesson.lastStudied}\n\n` +
      `💡 Quick Review:\n` +
      `${lesson.type === 'notes' ? 'Your written notes about language fundamentals' : 'Photo-based learning material'}\n\n` +
      `📝 Ready for a refresher quiz?`
    );
    setScreen('review');
  };

  // Badge configuration function
  const getBadgeConfig = (badgeType) => {
    const badgeConfigs = {
      review: {
        text: "Review!",
        backgroundColor: "#FF6B6B",
        textColor: "#FFFFFF"
      },
      practice: {
        text: "Practice",
        backgroundColor: "#FF9500", 
        textColor: "#FFFFFF"
      },
      mastered: {
        text: "Mastered",
        backgroundColor: "#4CAF50",
        textColor: "#FFFFFF"
      },
      new: {
        text: "New!",
        backgroundColor: "#7C3AED",
        textColor: "#FFFFFF"
      },
      complete: {
        text: "Complete",
        backgroundColor: "#10B981",
        textColor: "#FFFFFF"
      }
    };
    return badgeConfigs[badgeType] || badgeConfigs.review;
  };

  const SplashScreen = () => {
    const spin = logoRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const particleTranslateY = particleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [50, -50],
    });

    return (
      <LinearGradient
        colors={['#4f46e5', '#7c3aed', '#a855f7']}
        locations={[0, 0.6, 1]}
        style={styles.splashContainer}
      >
        <StatusBar barStyle="light-content" />
        
        {/* Animated floating particles */}
        <Animated.View 
          style={[
            styles.particle,
            styles.particle1,
            {
              transform: [
                { translateY: particleTranslateY },
                { rotate: spin },
              ],
            },
          ]}
        >
          <Text style={styles.particleText}>🌍</Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.particle,
            styles.particle2,
            {
              transform: [
                { translateY: particleTranslateY },
                { rotate: spin },
              ],
            },
          ]}
        >
          <Text style={styles.particleText}>💬</Text>
        </Animated.View>
        
        <Animated.View 
          style={[
            styles.particle,
            styles.particle3,
            {
              transform: [
                { translateY: particleTranslateY },
                { rotate: spin },
              ],
            },
          ]}
        >
          <Text style={styles.particleText}>🧠</Text>
        </Animated.View>

        {/* Main Logo */}
        <View style={styles.logoContainer}>
          <Animated.View
            style={[
              styles.logoBackground,
              {
                transform: [
                  { scale: logoScale },
                  { rotate: spin },
                ],
              },
            ]}
          >
            {/* Custom PolyTalk Logo */}
            <View style={styles.logoInner}>
              <View style={styles.logoLetterP}>
                <Text style={styles.logoMainText}>P</Text>
              </View>
              <View style={styles.logoSpeechBubbles}>
                <View style={styles.speechBubble1}>
                  <Text style={styles.speechBubbleText}>Hi</Text>
                </View>
                <View style={styles.speechBubble2}>
                  <Text style={styles.speechBubbleText}>你好</Text>
                </View>
                <View style={styles.speechBubble3}>
                  <Text style={styles.speechBubbleText}>¡Hola!</Text>
                </View>
              </View>
            </View>
          </Animated.View>
        </View>

        {/* App Title */}
        <Animated.View style={[styles.splashTextContainer, { opacity: textOpacity }]}>
          <Image 
            source={require('./assets/polytalk-logo.png')} 
            style={styles.splashLogo}
            resizeMode="contain"
          />
          <Text style={styles.splashTitle}>Poly Talk</Text>
          <Text style={styles.splashSubtitle}>Speak Any Language, Anywhere</Text>
          <Text style={styles.splashTagline}>AI-Powered Language Learning</Text>
        </Animated.View>

        {/* Powered by text */}
        <Animated.View style={[styles.poweredByContainer, { opacity: textOpacity }]}>
          <Text style={styles.poweredByText}>Powered by Zander</Text>
        </Animated.View>
      </LinearGradient>
    );
  };

  const HomeScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.safeArea}>
              <ScrollView 
                contentContainerStyle={styles.homeScrollContainer}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.homeContainer}>
        <View style={styles.profileContainer}>
          <Image source={require('./assets/zander.jpg')} style={styles.profileImage} />
          <View style={styles.onlineIndicator} />
        </View>
        <View style={styles.headerContainer}>
          <Image 
            source={require('./assets/polytalk-logo.png')} 
            style={styles.homeLogo}
            resizeMode="contain"
          />
          <Text style={styles.appTitle}>Poly Talk</Text>
          <Text style={styles.tagline}>Lets make today's practice easy. Ready to upload your lesson?</Text>
          <Text style={styles.creator}>Creator: Zander</Text>
        </View>
        
        <View style={styles.streakContainer}>
          <View style={styles.streakIconContainer}>
            <FireIcon size={20} color="#FF6B6B" />
          </View>
          <Text style={styles.streakText}>3 Day Streak!</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => setScreen('upload')}
          >
            <LinearGradient
              colors={['#58CC67', '#42B883']}
              style={styles.buttonGradient}
            >
              <View style={styles.buttonContent}>
                <RocketIcon size={18} color="#FFFFFF" />
                <Text style={styles.primaryButtonText}>Start Today's Lesson</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => setScreen('progress')}
          >
            <View style={styles.buttonContent}>
              <ChartIcon size={18} color="#58CC67" />
              <Text style={styles.secondaryButtonText}>View Progress</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Daily Challenge Section */}
        <View style={styles.dailyChallengeContainer}>
          <View style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <View style={styles.challengeIconContainer}>
                <AwardIcon size={20} color="#7C3AED" />
              </View>
              <View style={styles.challengeBadge}>
                <Text style={styles.challengeBadgeText}>DAILY</Text>
              </View>
            </View>
            <Text style={styles.challengeTitle}>Daily Challenge</Text>
            <Text style={styles.challengePrompt}>Up for a quick quiz from the last two weeks?</Text>
            <TouchableOpacity 
              style={styles.challengeButton}
              onPress={() => setScreen('quiz')}
            >
                              <LinearGradient
                  colors={['#7C3AED', '#A855F7']}
                  style={styles.challengeButtonGradient}
                >
                <Text style={styles.challengeButtonText}>Take Challenge</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Lessons Section */}
        <View style={styles.recentLessonsContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <BookIcon size={22} color="#FFFFFF" />
              <Text style={styles.sectionTitle}>Recent Lessons</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Pick up where you left off</Text>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.lessonsScrollContainer}
            style={styles.lessonsScroll}
          >
            {recentLessons.map((lesson) => (
              <TouchableOpacity 
                key={lesson.id}
                style={styles.lessonCard}
                onPress={() => handleLessonSelect(lesson)}
              >
                <View style={styles.lessonCardContent}>
                  {/* Header with dynamic badge */}
                  <View style={styles.lessonCardHeader}>
                    <View style={styles.lessonTypeContainer}>
                      {lesson.type === 'notes' ? (
                        <DocumentIcon size={14} color="#6B7280" />
                      ) : (
                        <CameraIcon size={14} color="#6B7280" />
                      )}
                      <Text style={styles.lessonTypeText}>
                        {lesson.type === 'notes' ? 'Notes' : 'Photo'}
                      </Text>
                    </View>
                    <View style={[
                      styles.dynamicBadge, 
                      { backgroundColor: getBadgeConfig(lesson.badge).backgroundColor }
                    ]}>
                      <Text style={[
                        styles.dynamicBadgeText,
                        { color: getBadgeConfig(lesson.badge).textColor }
                      ]}>
                        {getBadgeConfig(lesson.badge).text}
                      </Text>
                    </View>
                  </View>
                  
                  {/* Lesson Info */}
                  <Text style={styles.lessonTitle} numberOfLines={2}>
                    {lesson.title}
                  </Text>
                  <Text style={styles.lessonSubtitle} numberOfLines={2}>
                    {lesson.subtitle}
                  </Text>
                  <Text style={styles.lessonDate}>{lesson.date}</Text>
                  
                  {/* Progress Bar */}
                  <View style={styles.lessonProgressContainer}>
                    <View style={styles.lessonProgressBar}>
                      <View 
                        style={[
                          styles.lessonProgressFill, 
                          { width: `${lesson.progress}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.lessonProgressText}>{lesson.progress}%</Text>
                  </View>
                  
                  {/* Last Studied */}
                  <Text style={styles.lastStudiedText}>{lesson.lastStudied}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.quickStatsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Words</Text>
          </View>
        </View>
      </View>
              </ScrollView>
            </SafeAreaView>
      </LinearGradient>
  );

  const UploadScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.uploadContainer}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => setScreen('home')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.screenTitleContainer}>
          <BookIcon size={28} color="#FFFFFF" />
          <Text style={styles.screenTitle}>Upload Study Material</Text>
        </View>
        <Text style={styles.screenSubtitle}>Share your notes or snap a photo of your materials</Text>
        
        <View style={styles.uploadOptions}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type or paste your class notes here..."
              placeholderTextColor="#999"
              value={notes}
              onChangeText={setNotes}
              style={[styles.textInput, isInputFocused && styles.textInputFocused]}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
              autoCapitalize="sentences"
              autoCorrect={true}
              returnKeyType="default"
              blurOnSubmit={false}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
          </View>
          
          <Text style={styles.orText}>— OR —</Text>
          
          <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
            <LinearGradient
              colors={['#3AB1FF', '#7C3AED']}
              style={styles.buttonGradient}
            >
              <View style={styles.buttonContent}>
                <CameraIcon size={18} color="#FFFFFF" />
                <Text style={styles.imageButtonText}>Take Photo</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          
          {image && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <Text style={styles.imagePreviewText}>✅ Image uploaded successfully!</Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={[styles.generateButton, (!notes.trim() && !image) && styles.disabledButton]} 
            onPress={handleTextSubmit}
            disabled={!notes.trim() && !image}
          >
            <LinearGradient
              colors={(!notes.trim() && !image) ? ['#ccc', '#999'] : ['#58CC67', '#42B883']}
              style={styles.buttonGradient}
            >
              <Text style={styles.generateButtonText}>✨ Generate AI Review</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );

  const ReviewScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.reviewContainer}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => setScreen('upload')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.screenTitle}>🧠 Your AI Review</Text>
        
        <View style={styles.reviewCard}>
          <Text style={styles.reviewText}>{review}</Text>
        </View>
        
        <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('quiz')}>
          <LinearGradient
            colors={['#7C3AED', '#A855F7']}
            style={styles.buttonGradient}
          >
            <Text style={styles.primaryButtonText}>🎮 Start Practice Quiz</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  );

  const QuizScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.quizContainer}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => setScreen('review')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
          <Text style={styles.progressText}>1 of 3</Text>
        </View>
        
        <Text style={styles.screenTitle}>🎯 Practice Quiz</Text>
        
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>Translate "study" to Spanish</Text>
          
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={[
                styles.quizOption,
                selectedAnswer === 'A' && styles.selectedOption,
                showResult && selectedAnswer === 'A' && styles.wrongOption
              ]}
              onPress={() => handleQuizAnswer('A')}
              disabled={showResult}
            >
              <Text style={[styles.optionText, selectedAnswer === 'A' && styles.selectedOptionText]}>
                A) correr
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.quizOption,
                selectedAnswer === 'B' && styles.selectedOption,
                showResult && styles.correctOption
              ]}
              onPress={() => handleQuizAnswer('B')}
              disabled={showResult}
            >
              <Text style={[styles.optionText, (selectedAnswer === 'B' || showResult) && styles.selectedOptionText]}>
                B) estudiar ✓
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.quizOption,
                selectedAnswer === 'C' && styles.selectedOption,
                showResult && selectedAnswer === 'C' && styles.wrongOption
              ]}
              onPress={() => handleQuizAnswer('C')}
              disabled={showResult}
            >
              <Text style={[styles.optionText, selectedAnswer === 'C' && styles.selectedOptionText]}>
                C) leer
              </Text>
            </TouchableOpacity>
          </View>
          
          {showResult && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                {selectedAnswer === 'B' ? '🎉 Correct! Great job!' : '❌ Incorrect. The answer is "estudiar"'}
              </Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.primaryButton} 
          onPress={() => setScreen('progress')}
        >
          <LinearGradient
            colors={['#58CC67', '#42B883']}
            style={styles.buttonGradient}
          >
            <Text style={styles.primaryButtonText}>Continue Learning 🚀</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </LinearGradient>
  );

  const ProgressScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.progressScreenContainer}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => setScreen('home')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.screenTitle}>📊 Your Progress</Text>
        
        <View style={styles.achievementCard}>
          <Text style={styles.achievementTitle}>🏆 Today's Achievement</Text>
          <Text style={styles.achievementText}>Completed 1 lesson!</Text>
        </View>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statName}>Day Streak</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>⭐</Text>
            <Text style={styles.statValue}>150</Text>
            <Text style={styles.statName}>Total Points</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>📚</Text>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statName}>Lessons Done</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statEmoji}>🎯</Text>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statName}>Accuracy</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.primaryButton} onPress={() => setScreen('home')}>
          <LinearGradient
            colors={['#58CC67', '#42B883']}
            style={styles.buttonGradient}
          >
            <Text style={styles.primaryButtonText}>🏠 Back to Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          {screen === 'home' && <HomeScreen />}
          {screen === 'upload' && <UploadScreen />}
          {screen === 'review' && <ReviewScreen />}
          {screen === 'quiz' && <QuizScreen />}
          {screen === 'progress' && <ProgressScreen />}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4f46e5',
  },
  gradientContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroImageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  heroImage: {
    opacity: 0.9, // Slight transparency for sophistication
  },
  primaryGradientOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  readabilityOverlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  homeScrollContainer: {
    flexGrow: 1,
    minHeight: height - 100, // Ensure full height scrollability
  },
  profileContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  homeLogo: {
    width: 60,
    height: 60,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    letterSpacing: 0,
    lineHeight: 22,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    fontWeight: '400',
  },
  creator: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  streakIconContainer: {
    marginRight: 8,
  },

  streakText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  actionContainer: {
    marginTop: 40,
  },
  primaryButton: {
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#58CC67',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#58CC67',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  quickStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 4,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  screenTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginLeft: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  screenSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 30,
  },
  uploadContainer: {
    padding: 20,
    minHeight: height - 100,
  },
  uploadOptions: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
     textInput: {
     backgroundColor: 'rgba(255, 255, 255, 0.95)',
     borderRadius: 16,
     padding: 20,
     fontSize: 16,
     minHeight: 150,
     maxHeight: 200,
     textAlignVertical: 'top',
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 4,
     elevation: 3,
     borderWidth: 1,
     borderColor: 'rgba(255, 255, 255, 0.3)',
     color: '#333',
   },
   textInputFocused: {
     borderColor: '#4CAF50',
     borderWidth: 2,
     shadowOpacity: 0.2,
     shadowRadius: 6,
     elevation: 5,
   },
  orText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 20,
    opacity: 0.8,
  },
  imageButton: {
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#3AB1FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  imageButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 10,
  },
  imagePreviewText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  generateButton: {
    borderRadius: 24,
    marginTop: 20,
    shadowColor: '#58CC67',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    shadowOpacity: 0.1,
    elevation: 2,
  },
  reviewContainer: {
    padding: 20,
    minHeight: height - 100,
  },
  reviewCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  quizContainer: {
    flex: 1,
    padding: 20,
  },
  progressBarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  questionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  quizOption: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#667eea',
    backgroundColor: '#f0f2ff',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#e8f5e8',
  },
  wrongOption: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#667eea',
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  progressScreenContainer: {
    flex: 1,
    padding: 20,
  },
  achievementCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 16,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statName: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  logoInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoLetterP: {
    position: 'absolute',
    top: 10,
    left: 15,
  },
  logoMainText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#4f46e5',
    textShadowColor: 'rgba(124, 58, 237, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logoSpeechBubbles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  speechBubble1: {
    position: 'absolute',
    top: 15,
    right: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  speechBubble2: {
    position: 'absolute',
    bottom: 40,
    left: 5,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  speechBubble3: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: '#FF9500',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  speechBubbleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  particle: {
    position: 'absolute',
  },
  particle1: {
    top: '20%',
    left: '15%',
  },
  particle2: {
    top: '25%',
    right: '10%',
  },
  particle3: {
    bottom: '30%',
    left: '10%',
  },
  particleText: {
    fontSize: 32,
    opacity: 0.7,
  },
  splashTextContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  splashLogo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  splashTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
  },
  splashSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 6,
    textAlign: 'center',
  },
  splashTagline: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  poweredByContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
  },
  poweredByText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  
  // Daily Challenge Section Styles
  dailyChallengeContainer: {
    marginTop: 25,
    marginBottom: 20,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeIconContainer: {
    marginRight: 4,
  },
  challengeBadge: {
    backgroundColor: '#7C3AED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  challengeBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  challengePrompt: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  challengeButton: {
    borderRadius: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  challengeButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Recent Lessons Section Styles
  recentLessonsContainer: {
    marginTop: 25,
    marginBottom: 20,
  },
  sectionHeader: {
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 2,
  },
  lessonsScroll: {
    marginHorizontal: -20, // Offset container padding for full-width scroll
  },
  lessonsScrollContainer: {
    paddingHorizontal: 20,
    paddingRight: 40, // Extra padding at end
  },
  lessonCard: {
    width: 240,
    marginRight: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
  },
  lessonCardContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    minHeight: 180,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'space-between',
  },
  lessonCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lessonTypeContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  lessonTypeText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  dynamicBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  dynamicBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  lessonTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lessonSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
    lineHeight: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lessonDate: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 10,
    fontWeight: '500',
  },
  lessonProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonProgressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    marginRight: 8,
  },
  lessonProgressFill: {
    height: '100%',
    backgroundColor: '#58CC67',
    borderRadius: 6,
  },
  lessonProgressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#58CC67',
    minWidth: 30,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lastStudiedText: {
    fontSize: 10,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: 2,
  },
});
