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

const MicrophoneIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <G clipPath="url(#clip0_4418_3500)">
      <Path d="M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4.35 9.65V11.5C4.35 15.92 7.58 19.5 12 19.5C16.42 19.5 19.65 15.92 19.65 11.5V9.65" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10.61 6.43C11.51 6.1 12.49 6.1 13.39 6.43" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.2 8.55C11.73 8.41 12.27 8.41 12.8 8.55" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 19.5V22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_3500">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
);

const BackArrowIcon = ({ size = 24, color = "#fff" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M13.98 5.31975L10.77 8.52975L8.79999 10.4897C7.96999 11.3197 7.96999 12.6697 8.79999 13.4997L13.98 18.6797C14.66 19.3597 15.82 18.8697 15.82 17.9197V12.3097V6.07975C15.82 5.11975 14.66 4.63975 13.98 5.31975Z" fill={color} />
  </Svg>
);

// Challenge Carousel Component
const ChallengeCarousel = ({ challenges, onChallengeSelect, getBadgeConfig }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentPage = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(currentPage);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.carouselScrollView}
        contentContainerStyle={styles.carouselContent}
      >
        {challenges.map((challenge, index) => (
          <View key={challenge.id} style={styles.carouselCardContainer}>
            <TouchableOpacity
              style={styles.carouselCard}
              onPress={() => onChallengeSelect(challenge)}
              activeOpacity={0.9}
            >
              <View style={styles.challengeCardContent}>
                {/* Header with badge */}
                <View style={styles.challengeCardHeader}>
                  <View style={styles.challengeTypeContainer}>
                    <AwardIcon size={14} color="#6B7280" />
                    <Text style={styles.challengeTypeText}>
                      {challenge.type}
                    </Text>
                  </View>
                  <View style={[
                    styles.dynamicBadge, 
                    { backgroundColor: getBadgeConfig(challenge.badge).backgroundColor }
                  ]}>
                    <Text style={[
                      styles.dynamicBadgeText,
                      { color: getBadgeConfig(challenge.badge).textColor }
                    ]}>
                      {getBadgeConfig(challenge.badge).text}
                    </Text>
                  </View>
                </View>
                
                {/* Challenge Info */}
                <Text style={styles.challengeTitle} numberOfLines={2}>
                  {challenge.title}
                </Text>
                <Text style={styles.challengeSubtitle} numberOfLines={2}>
                  {challenge.subtitle}
                </Text>
                
                {/* Challenge Details */}
                <View style={styles.challengeDetailsContainer}>
                  <Text style={styles.challengePoints}>+{challenge.points} pts</Text>
                  <Text style={styles.challengeTime}>{challenge.timeLimit}</Text>
                </View>
                
                {/* Difficulty */}
                <Text style={styles.challengeDifficulty}>{challenge.difficulty}</Text>
              </View>
              
              {/* Pagination Dots Overlay */}
              <View style={styles.cardPaginationOverlay}>
                {challenges.map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[
                      styles.cardPaginationDot,
                      dotIndex === currentIndex ? styles.activeDot : styles.inactiveDot
                    ]}
                  />
                ))}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Lessons Carousel Component
const LessonsCarousel = ({ lessons, onLessonSelect, getBadgeConfig }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef();

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const currentPage = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentIndex(currentPage);
  };

  return (
    <View style={styles.carouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.carouselScrollView}
        contentContainerStyle={styles.carouselContent}
      >
        {lessons.map((lesson, index) => (
          <View key={lesson.id} style={styles.carouselCardContainer}>
            <TouchableOpacity
              style={styles.carouselCard}
              onPress={() => onLessonSelect(lesson)}
              activeOpacity={0.9}
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
              
              {/* Pagination Dots Overlay */}
              <View style={styles.cardPaginationOverlay}>
                {lessons.map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[
                      styles.cardPaginationDot,
                      dotIndex === currentIndex ? styles.activeDot : styles.inactiveDot
                    ]}
                  />
                ))}
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

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

  // Daily challenges state
  const [dailyChallenges] = useState([
    {
      id: 1,
      title: "Morning Quiz",
      subtitle: "Start your day with 5 quick questions",
      type: "quiz",
      badge: "new",
      difficulty: "easy",
      points: 25,
      timeLimit: "3 min"
    },
    {
      id: 2,
      title: "Speed Round",
      subtitle: "Translate 20 words in 60 seconds",
      type: "speed",
      badge: "new",
      difficulty: "hard",
      points: 100,
      timeLimit: "1 min"
    },
    {
      id: 3,
      title: "Grammar Master",
      subtitle: "Advanced conjugation patterns",
      type: "grammar",
      badge: "practice",
      difficulty: "expert",
      points: 150,
      timeLimit: "10 min"
    },
    {
      id: 4,
      title: "Listening Challenge",
      subtitle: "Understand native speaker audio",
      type: "audio",
      badge: "new",
      difficulty: "hard",
      points: 120,
      timeLimit: "7 min"
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

  const handleVoiceRecord = () => {
    // Mock voice recording functionality
    setReview(
      `🧠 AI Review from Voice Recording:\n\n` +
      `📘 Vocabulary:\n- conversar (to converse)\n- pronunciar (to pronounce)\n- practicar (to practice)\n- escuchar (to listen)\n\n` +
      `💬 Practice Phrases:\n"Quiero mejorar mi pronunciación."\n"Vamos a conversar en español."\n"Necesito practicar más."\n\n` +
      `📝 Interactive Quiz:\nReady to test your listening skills?`
    );
    setScreen('review');
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

  const handleChallengeSelect = (challenge) => {
    // Set mock challenge content
    setReview(
      `🚀 Challenge: ${challenge.title}\n\n` +
      `🎯 Challenge Details:\n` +
      `- Difficulty: ${challenge.difficulty}\n` +
      `- Points: ${challenge.points}\n` +
      `- Time Limit: ${challenge.timeLimit}\n\n` +
      `💡 Challenge Description:\n` +
      `${challenge.subtitle}\n\n` +
      `📝 Ready to take the challenge?`
    );
    setScreen('quiz');
  };

  // Badge configuration function
  const getBadgeConfig = (badgeType) => {
    const badgeConfigs = {
      review: {
        text: "Review!",
        backgroundColor: "#3AB1FF",
        textColor: "#FFFFFF"
      },
      practice: {
        text: "Practice",
        backgroundColor: "#58CC67", 
        textColor: "#FFFFFF"
      },
      mastered: {
        text: "Mastered",
        backgroundColor: "#7C3AED",
        textColor: "#FFFFFF"
      },
      new: {
        text: "New!",
        backgroundColor: "#A855F7",
        textColor: "#FFFFFF"
      },
      complete: {
        text: "Complete",
        backgroundColor: "#58CC67",
        textColor: "#FFFFFF"
      },
      daily: {
        text: "DAILY",
        backgroundColor: "#7C3AED",
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
        <View style={styles.topSection}>
          <View style={styles.profileRow}>
            <TouchableOpacity 
              style={styles.profileContainer}
              onPress={() => setScreen('progress')}
              activeOpacity={0.8}
            >
              <Image source={require('./assets/zander.jpg')} style={styles.profileImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContainer}>
            <Image 
              source={require('./assets/polytalk-logo.png')} 
              style={styles.homeLogo}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>PolyTalk</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.premiumPillButton} 
            onPress={() => setScreen('upload')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={['#58CC67', '#40E0D0']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.premiumPillGradient}
            >
              <View style={styles.premiumButtonContent}>
                <RocketIcon size={18} color="#FFFFFF" />
                <Text style={styles.premiumPillText}>START TODAY'S LESSON</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Daily Challenges Section */}
        <View style={styles.dailyChallengesContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <AwardIcon size={22} color="#FFFFFF" />
              <Text style={styles.sectionTitle}>Daily Challenges</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Test your skills and earn rewards</Text>
          </View>
          
          <ChallengeCarousel 
            challenges={dailyChallenges}
            onChallengeSelect={handleChallengeSelect}
            getBadgeConfig={getBadgeConfig}
          />
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
          
          <LessonsCarousel 
            lessons={recentLessons}
            onLessonSelect={handleLessonSelect}
            getBadgeConfig={getBadgeConfig}
          />
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
          <View style={styles.uploadBackButton}>
            <TouchableOpacity onPress={() => setScreen('home')}>
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.uploadHeaderContainer}>
            <Image 
              source={require('./assets/polytalk-logo.png')} 
              style={styles.uploadLogo}
              resizeMode="contain"
            />
            <Text style={styles.uploadTitle}>Your Lesson for Today</Text>
            <Text style={styles.uploadSubtitle}>Photo, voice, or text—choose how you learn</Text>
          </View>
          
          <View style={styles.uploadCard}>
            <View style={styles.uploadTextContainer}>
              <TextInput
                placeholder="Type or paste your class notes here..."
                placeholderTextColor="#999"
                value={notes}
                onChangeText={setNotes}
                style={[styles.uploadTextInput, isInputFocused && styles.uploadTextInputFocused]}
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
            
            <View style={styles.uploadButtonsContainer}>
              <TouchableOpacity 
                style={styles.uploadIconButton} 
                onPress={handlePickImage}
                activeOpacity={0.8}
              >
                <CameraIcon size={24} color="#6B7280" />
                <Text style={styles.uploadIconButtonText}>📷 Photo</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.uploadIconButton} 
                onPress={handleVoiceRecord}
                activeOpacity={0.8}
              >
                <MicrophoneIcon size={24} color="#6B7280" />
                <Text style={styles.uploadIconButtonText}>🎤 Voice</Text>
              </TouchableOpacity>
            </View>
            
            {image && (
              <View style={styles.uploadImagePreview}>
                <Image source={{ uri: image }} style={styles.uploadPreviewImage} />
                <Text style={styles.uploadPreviewText}>✅ Image uploaded successfully!</Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            style={[styles.uploadGenerateButton, (!notes.trim() && !image) && styles.disabledButton]} 
            onPress={handleTextSubmit}
            disabled={!notes.trim() && !image}
          >
            <LinearGradient
              colors={(!notes.trim() && !image) ? ['#ccc', '#999'] : ['#58CC67', '#3AB1FF']}
              style={styles.buttonGradient}
            >
              <Text style={styles.generateButtonText}>✨ Generate AI Review</Text>
            </LinearGradient>
          </TouchableOpacity>
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
        <ScrollView 
          contentContainerStyle={styles.progressScrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header Section */}
          <View style={styles.progressHeader}>
            <TouchableOpacity 
              onPress={() => setScreen('home')}
              style={styles.progressBackButton}
            >
              <BackArrowIcon size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Greeting Section */}
          <View style={styles.gradientGreetingSection}>
            <Text style={styles.gradientGreetingText}>Hi Zander</Text>
            <Text style={styles.gradientGreetingSubtext}>Great progress today! Keep it up!</Text>
          </View>

          {/* Centered Avatar */}
          <View style={styles.centeredAvatarSection}>
            <Image source={require('./assets/zander.jpg')} style={styles.centeredAvatar} />
          </View>

          {/* Stats Row - Single Horizontal Line */}
          <View style={styles.gradientStatsSection}>
            <View style={styles.gradientStatsRow}>
              <View style={styles.gradientStatItem}>
                <View style={styles.gradientStatIconCircle}>
                  <BookIcon size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.gradientStatValue}>2</Text>
                <Text style={styles.gradientStatLabel}>Courses</Text>
              </View>
              
              <View style={styles.gradientStatItem}>
                <View style={styles.gradientStatIconCircle}>
                  <FireIcon size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.gradientStatValue}>5</Text>
                <Text style={styles.gradientStatLabel}>Streak</Text>
              </View>
              
              <View style={styles.gradientStatItem}>
                <View style={styles.gradientStatIconCircle}>
                  <AwardIcon size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.gradientStatValue}>8</Text>
                <Text style={styles.gradientStatLabel}>Friends</Text>
              </View>
              
              <View style={styles.gradientStatItem}>
                <View style={styles.gradientStatIconCircle}>
                  <ChartIcon size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.gradientStatValue}>10</Text>
                <Text style={styles.gradientStatLabel}>Badges</Text>
              </View>
            </View>
          </View>

          {/* Premium Action Cards */}
          <View style={styles.premiumActionCardsSection}>
            <TouchableOpacity style={styles.premiumActionCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.premiumActionCardGradient}
              >
                <View style={styles.premiumActionIconContainer}>
                  <BookIcon size={24} color="#FFFFFF" />
                </View>
                <View style={styles.premiumActionContent}>
                  <Text style={styles.premiumActionTitle}>Courses Enrolled</Text>
                  <Text style={styles.premiumActionSubtitle}>2 active courses • Spanish & French</Text>
                </View>
                <View style={styles.premiumActionArrow}>
                  <Text style={styles.premiumActionArrowText}>›</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.premiumActionCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                style={styles.premiumActionCardGradient}
              >
                <View style={styles.premiumActionIconContainer}>
                  <AwardIcon size={24} color="#FFFFFF" />
                </View>
                <View style={styles.premiumActionContent}>
                  <Text style={styles.premiumActionTitle}>Achievements</Text>
                  <Text style={styles.premiumActionSubtitle}>10 earned • 5 new this week</Text>
                </View>
                <View style={styles.premiumActionArrow}>
                  <Text style={styles.premiumActionArrowText}>›</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  },
  homeScrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  topSection: {
    paddingTop: 20,
    paddingBottom: 32,
  },
  profileRow: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  profileContainer: {
    borderRadius: 28,
    padding: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
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

  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  homeLogo: {
    width: 80,
    height: 80,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 12,
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

  actionContainer: {
    marginTop: 0,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  primaryButton: {
    borderRadius: 24,
    shadowColor: '#58CC67',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
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
    flexGrow: 1,
    paddingBottom: 32,
  },
  uploadBackButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 32,
  },
  uploadHeaderContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  uploadLogo: {
    width: 64,
    height: 64,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  uploadTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  uploadSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  uploadTextContainer: {
    marginBottom: 24,
  },
  uploadTextInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    fontSize: 16,
    minHeight: 140,
    maxHeight: 200,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  uploadTextInputFocused: {
    borderColor: '#58CC67',
    borderWidth: 2,
    backgroundColor: '#FFFFFF',
  },
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  uploadIconButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadIconButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  uploadImagePreview: {
    alignItems: 'center',
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  uploadPreviewImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  uploadPreviewText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  uploadGenerateButton: {
    borderRadius: 24,
    marginHorizontal: 20,
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
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
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
  
  // Daily Challenges Section Styles
  dailyChallengesContainer: {
    marginTop: 0,
    marginBottom: 20,
  },
  challengesScroll: {
    marginHorizontal: -20,
  },
  challengesScrollContainer: {
    paddingHorizontal: 20,
    paddingRight: 40,
  },
  challengeCard: {
    width: 260,
    marginRight: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  challengeCardContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    height: 180,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'space-between',
  },
  challengeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  challengeTypeContainer: {
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
  challengeTypeText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  challengeTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 6,
    lineHeight: 19,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  challengeSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 10,
    fontStyle: 'italic',
    lineHeight: 17,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  challengeDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengePoints: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7C3AED',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  challengeTime: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  challengeDifficulty: {
    fontSize: 10,
    color: '#9CA3AF',
    fontStyle: 'italic',
    marginTop: 2,
  },

  // Recent Lessons Section Styles
  recentLessonsContainer: {
    marginTop: 0,
    marginBottom: 40,
  },
  sectionHeader: {
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  lessonsScroll: {
    marginHorizontal: -20, // Offset container padding for full-width scroll
  },
  lessonsScrollContainer: {
    paddingHorizontal: 20,
    paddingRight: 40, // Extra padding at end
  },
  lessonCard: {
    width: 260,
    marginRight: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  lessonCardContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    height: 180,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
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
    marginBottom: 6,
    lineHeight: 19,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lessonSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
    fontStyle: 'italic',
    lineHeight: 17,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lessonDate: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 12,
    fontWeight: '500',
  },
  lessonProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    marginTop: 0,
  },

  // Carousel Styles
  carouselContainer: {
    marginTop: 0,
  },
  carouselScrollView: {
    marginHorizontal: 0,
  },
  carouselContent: {
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  carouselCardContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  carouselCard: {
    width: width - 40, // Full width minus padding
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
    position: 'relative',
  },
  cardPaginationOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    paddingHorizontal: 20,
  },
  cardPaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#374151',
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  inactiveDot: {
    backgroundColor: '#D1D5DB',
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  // Progress Screen Styles
  progressScrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  progressHeader: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBackText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  progressTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginRight: 60, // Offset for back button
  },
  progressTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },

  // Hero Achievement Section
  heroAchievementSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  greetingContainer: {
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  greetingSubtext: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  todayAchievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  achievementDescription: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  achievementBadge: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  achievementBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#166534',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Profile Stats Section
  profileStatsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  progressProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  profileStreakBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  profileStreakText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  profileTitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  profileStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  profileStatItem: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  profileStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  profileStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Detailed Stats Section
  detailedStatsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionHeaderContainer: {
    marginBottom: 20,
  },
  sectionHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  sectionHeaderSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  detailedStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  detailedStatCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  statCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statCardValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  statCardLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  statCardDetail: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Action Sections
  actionSectionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  actionArrow: {
    fontSize: 18,
    color: '#9CA3AF',
    fontWeight: '600',
  },

  // Back to Home Button
  backToHomeButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  backToHomeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  backToHomeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Premium Pill Button Styles
  premiumPillButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  premiumPillGradient: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  premiumButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumPillText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Gradient Progress Screen Styles
  gradientGreetingSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
    alignItems: 'center',
  },
  gradientGreetingText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    textAlign: 'center',
  },
  gradientGreetingSubtext: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    textAlign: 'center',
  },
  centeredAvatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  centeredAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  gradientStatsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  gradientStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gradientStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  gradientStatIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  gradientStatValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  gradientStatLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  gradientActionLinks: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  gradientActionLink: {
    marginBottom: 16,
  },
  gradientActionLinkText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Premium Action Cards
  premiumActionCardsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  premiumActionCard: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'hidden',
  },
  premiumActionCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  premiumActionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  premiumActionContent: {
    flex: 1,
  },
  premiumActionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  premiumActionSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  premiumActionArrow: {
    marginLeft: 12,
  },
  premiumActionArrowText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#FFFFFF',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
