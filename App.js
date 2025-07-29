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
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BookIcon,
  RocketIcon, 
  ChartIcon,
  FireIcon,
  DocumentIcon,
  CameraIcon,
  ClockIcon,
  AwardIcon,
  MicrophoneIcon,
  BackArrowIcon,
  ChatIcon,
  LockIcon,
  MagicWandIcon,
  UploadIcon,
  MicIcon,
  CrownIcon
} from './src/components/icons';

const { width, height } = Dimensions.get('window');





// Daily Quest Component
const DailyQuestCard = ({ quest, onQuestAction, userProgress }) => {
  const progressPercentage = quest.maxProgress > 0 ? (quest.progress / quest.maxProgress) * 100 : 0;
  const isCompleted = quest.status === 'completed';
  const isClaimed = quest.status === 'claimed';
  const isInProgress = quest.status === 'in_progress';

  const getStatusColor = () => {
    switch (quest.status) {
      case 'completed': return '#58CC67';
      case 'claimed': return '#9CA3AF';
      case 'in_progress': return quest.color;
      default: return quest.color;
    }
  };

  const getActionText = () => {
    switch (quest.status) {
      case 'completed': return 'Claim Reward';
      case 'claimed': return 'Completed ✓';
      case 'in_progress': return 'Continue';
      default: return 'Start Quest';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.questCard, isClaimed && styles.questCardCompleted]}
      onPress={() => !isClaimed && onQuestAction(quest)}
      activeOpacity={isClaimed ? 1 : 0.8}
    >
      <LinearGradient
        colors={
          isClaimed 
            ? ['rgba(156, 163, 175, 0.1)', 'rgba(156, 163, 175, 0.05)']
            : [`${quest.color}15`, `${quest.color}08`]
        }
        style={styles.questCardGradient}
      >
        {/* Quest Header */}
        <View style={styles.questHeader}>
          <View style={[styles.questIconContainer, { backgroundColor: getStatusColor() }]}>
            <Text style={styles.questIcon}>{quest.icon}</Text>
          </View>
          <View style={styles.questInfo}>
            <Text style={[styles.questTitle, isClaimed && styles.questTitleCompleted]}>
              {quest.title}
            </Text>
            <Text style={[styles.questDescription, isClaimed && styles.questDescriptionCompleted]}>
              {quest.description}
            </Text>
          </View>
          {isClaimed && (
            <View style={styles.questCompletedBadge}>
              <Text style={styles.questCompletedBadgeText}>✓</Text>
            </View>
          )}
        </View>

        {/* Progress Bar */}
        <View style={styles.questProgressContainer}>
          <View style={styles.questProgressBar}>
            <View 
              style={[
                styles.questProgressFill, 
                { 
                  width: `${progressPercentage}%`,
                  backgroundColor: getStatusColor()
                }
              ]} 
            />
          </View>
          <Text style={[styles.questProgressText, isClaimed && styles.questProgressTextCompleted]}>
            {quest.progress}/{quest.maxProgress}
          </Text>
        </View>

        {/* Rewards & Action */}
        <View style={styles.questFooter}>
          <View style={styles.questRewards}>
            <View style={styles.questRewardItem}>
              <Text style={styles.questRewardIcon}>⭐</Text>
              <Text style={[styles.questRewardText, isClaimed && styles.questRewardTextCompleted]}>
                +{quest.xpReward} XP
              </Text>
            </View>
            <View style={styles.questRewardItem}>
              <Text style={styles.questRewardIcon}>💎</Text>
              <Text style={[styles.questRewardText, isClaimed && styles.questRewardTextCompleted]}>
                +{quest.gemReward}
              </Text>
            </View>
          </View>
          <View style={[
            styles.questActionButton,
            { backgroundColor: getStatusColor() },
            isClaimed && styles.questActionButtonCompleted
          ]}>
            <Text style={[
              styles.questActionText,
              isClaimed && styles.questActionTextCompleted
            ]}>
              {getActionText()}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Daily Quest Grid Component
const DailyQuestGrid = ({ quests, onQuestAction, userProgress }) => {
  return (
    <View style={styles.questGrid}>
      {quests.map((quest) => (
        <DailyQuestCard
          key={quest.id}
          quest={quest}
          onQuestAction={onQuestAction}
          userProgress={userProgress}
        />
      ))}
    </View>
  );
};

// Daily Progress Summary Component
const DailyProgressSummary = ({ userProgress, quests }) => {
  const completedQuests = quests.filter(q => q.status === 'completed' || q.status === 'claimed').length;
  const totalQuests = quests.length;
  const progressPercentage = (completedQuests / totalQuests) * 100;

  return (
    <View style={styles.progressSummaryContainer}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']}
        style={styles.progressSummaryGradient}
      >
        <View style={styles.progressSummaryHeader}>
          <Text style={styles.progressSummaryTitle}>Today's Progress</Text>
          <Text style={styles.progressSummarySubtitle}>
            {completedQuests}/{totalQuests} quests completed
          </Text>
        </View>
        
        <View style={styles.progressSummaryStats}>
          <View style={styles.progressStat}>
            <Text style={styles.progressStatIcon}>⭐</Text>
            <Text style={styles.progressStatValue}>+{userProgress.dailyXP}</Text>
            <Text style={styles.progressStatLabel}>XP Today</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressStatIcon}>🔥</Text>
            <Text style={styles.progressStatValue}>{userProgress.currentStreak}</Text>
            <Text style={styles.progressStatLabel}>Day Streak</Text>
          </View>
          <View style={styles.progressStat}>
            <Text style={styles.progressStatIcon}>💎</Text>
            <Text style={styles.progressStatValue}>{userProgress.totalGems}</Text>
            <Text style={styles.progressStatLabel}>Total Gems</Text>
          </View>
        </View>

        <View style={styles.progressSummaryBar}>
          <View style={styles.progressSummaryTrack}>
            <View style={[styles.progressSummaryFill, { width: `${progressPercentage}%` }]} />
          </View>
          <Text style={styles.progressSummaryPercentage}>{Math.round(progressPercentage)}%</Text>
        </View>
      </LinearGradient>
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
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']}
                style={[styles.lessonCardContent, { borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }]}
              >
                {/* Header with dynamic badge */}
                <View style={styles.lessonCardHeader}>
                  <View style={styles.lessonTypeContainer}>
                    {lesson.type === 'notes' ? (
                      <DocumentIcon size={14} color="#FFFFFF" />
                    ) : (
                      <CameraIcon size={14} color="#FFFFFF" />
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
              </LinearGradient>
            </TouchableOpacity>
            
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
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Game Mode Carousel Component
const GameModeCarousel = ({ gameModes, onGameModeSelect, uploadCount }) => {
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width - 80));
    setCurrentIndex(index);
  };

  return (
    <View style={styles.gameModeCarouselContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.gameModeCarouselContent}
        snapToInterval={width - 80}
        decelerationRate="fast"
        bounces={false}
      >
        {gameModes.map((mode, index) => {
          const isLocked = mode.requiresUploads && uploadCount < mode.requiresUploads;
          const progress = mode.requiresUploads ? Math.min(uploadCount / mode.requiresUploads, 1) : 1;
          
          return (
            <TouchableOpacity
              key={mode.id}
              style={styles.gameModeCard}
              onPress={() => !isLocked && onGameModeSelect(mode)}
              activeOpacity={isLocked ? 1 : 0.85}
            >
              <View style={[styles.gameModeCardInner, isLocked && styles.gameModeCardLocked]}>
                {/* Lock Overlay */}
                {isLocked && (
                  <View style={styles.gameModeCardLockOverlay}>
                    <View style={styles.gameModeCardLockIcon}>
                      <LockIcon size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.gameModeCardLockText}>
                      {uploadCount}/{mode.requiresUploads} uploads
                    </Text>
                    <View style={styles.gameModeCardProgressBar}>
                      <View style={[styles.gameModeCardProgressFill, { width: `${progress * 100}%` }]} />
                    </View>
                  </View>
                )}
                
                {/* Icon */}
                <View style={[styles.gameModeCardIconContainer, { backgroundColor: mode.color }]}>
                  {mode.icon || null}
                </View>
                
                {/* Title */}
                <Text style={styles.gameModeCardTitle}>{mode.title}</Text>
                
                {/* Description */}
                <Text style={styles.gameModeCardDescription}>{mode.description}</Text>
                
                {/* Badge */}
                {mode.badge && (
                  <View style={[styles.gameModeCardBadge, { backgroundColor: mode.badgeColor }]}>
                    <Text style={styles.gameModeCardBadgeText}>{mode.badge}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      
      {/* Pagination Dots */}
      <View style={styles.gameModeCarouselPagination}>
        {gameModes.map((_, index) => (
          <View
            key={index}
            style={[
              styles.gameModeCarouselDot,
              index === currentIndex && styles.gameModeCarouselDotActive
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Word Bank Carousel Component
const WordBankCarousel = ({ words, getCategoryConfig }) => {
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
      >
        {words.map((word, index) => (
          <View key={word.id} style={styles.carouselCardContainer}>
            <TouchableOpacity
              style={styles.carouselCard}
              activeOpacity={0.9}
            >
              <View style={styles.wordBankCardContent}>
                {/* Header with category */}
                <View style={styles.wordBankCardHeader}>
                  <View style={styles.wordBankCategoryContainer}>
                    <BookIcon size={14} color="rgba(255, 255, 255, 0.7)" />
                    <Text style={styles.wordBankCategoryText}>
                      {word.category}
                    </Text>
                  </View>
                  <View style={[
                    styles.dynamicBadge, 
                    { backgroundColor: getCategoryConfig(word.category).backgroundColor }
                  ]}>
                    <Text style={[
                      styles.dynamicBadgeText,
                      { color: getCategoryConfig(word.category).textColor }
                    ]}>
                      {getCategoryConfig(word.category).text}
                    </Text>
                  </View>
                </View>
                
                {/* Word and Translation */}
                <Text style={styles.wordBankWord} numberOfLines={1}>
                  {word.word}
                </Text>
                <Text style={styles.wordBankTranslation} numberOfLines={1}>
                  {word.translation}
                </Text>
                
                {/* Example */}
                <View style={styles.wordBankExampleContainer}>
                  <Text style={styles.wordBankExample} numberOfLines={2}>
                    "{word.example}"
                  </Text>
                  <Text style={styles.wordBankExampleTranslation} numberOfLines={2}>
                    "{word.exampleTranslation}"
                  </Text>
                </View>
                
                {/* Footer */}
                <View style={styles.wordBankFooter}>
                  <Text style={styles.wordBankDate}>{word.dateAdded}</Text>
                  <View style={styles.wordBankDifficultyContainer}>
                    <View style={[
                      styles.wordBankDifficultyDot,
                      { backgroundColor: word.difficulty === 'beginner' ? '#58CC67' : 
                                        word.difficulty === 'intermediate' ? '#3AB1FF' : '#7C3AED' }
                    ]} />
                    <Text style={styles.wordBankDifficultyText}>{word.difficulty}</Text>
                  </View>
                </View>
              </View>
              
              {/* Pagination Dots Overlay */}
              <View style={styles.cardPaginationOverlay}>
                {words.map((_, dotIndex) => (
                  <View
                    key={dotIndex}
                    style={[
                      styles.cardPaginationDot,
                      dotIndex === currentIndex ? styles.wordBankActiveDot : styles.wordBankInactiveDot
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

// Leaderboard Ranking Modal Component
const LeaderboardModal = ({ visible, onClose, leaderboardData }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const getRankColor = (rank) => {
    return '#FFFFFF'; // All ranks are white
  };

  const getRankIcon = (rank) => {
    return `#${rank}`;
  };

  return (
    <Animated.View style={[styles.friendsModalOverlay, { opacity: opacityAnim }]}>
      <TouchableOpacity 
        style={styles.friendsModalBackdrop} 
        onPress={onClose}
        activeOpacity={1}
      />
      <Animated.View 
        style={[
          styles.friendsModalContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#58CC67', '#3AB1FF', '#7C3AED']}
          locations={[0, 0.5, 1]}
          style={styles.friendsModalGradient}
        >
          {/* Modal Header */}
          <View style={styles.friendsModalHeader}>
            <View style={styles.friendsModalHeaderContent}>
                              <Text style={styles.friendsModalTitle}>Leaderboard</Text>
                <Text style={styles.friendsModalSubtitle}>See how you stack up against your peers</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.friendsModalCloseButton}>
              <Text style={styles.friendsModalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

                      {/* Leaderboard List */}
            <ScrollView 
              style={styles.friendsModalList}
              showsVerticalScrollIndicator={false}
            >
              {leaderboardData.map((player) => (
              <View 
                key={player.id} 
                style={[
                  styles.friendsModalItem,
                  player.isCurrentUser && styles.friendsModalItemCurrent
                ]}
              >
                <View style={styles.friendsModalRankContainer}>
                  <Text style={[
                    styles.friendsModalRankText,
                    player.rank === 1 && { color: '#FFD700' },
                    player.rank === 2 && { color: '#C0C0C0' },
                    player.rank === 3 && { color: '#CD7F32' }
                  ]}>
                    #{player.rank}
                  </Text>
                </View>
                
                <Image 
                  source={player.profilePic} 
                  style={[
                    styles.friendsModalAvatar,
                    player.isCurrentUser && styles.friendsModalAvatarCurrent
                  ]} 
                />
                
                <View style={styles.friendsModalInfo}>
                  <Text style={[
                    styles.friendsModalName,
                    player.isCurrentUser && styles.friendsModalNameCurrent
                  ]}>
                    {player.name} {player.isCurrentUser && '(You)'}
                  </Text>
                                      <View style={styles.friendsModalStats}>
                      <View style={styles.friendsModalStatItem}>
                        <Text style={styles.friendsModalStatValue}>{player.weeklyXP} XP</Text>
                      </View>
                    </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

// Achievements Modal Component
const AchievementsModal = ({ visible, onClose, achievementsData }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const getCategoryColor = (category) => {
    const colors = {
      learning: '#58CC67',
      consistency: '#FF6B6B',
      vocabulary: '#3AB1FF',
      social: '#FFD700',
      grammar: '#7C3AED',
      content: '#40E0D0',
      performance: '#FF8C00',
      review: '#32CD32',
      speed: '#FF1493',
      accuracy: '#00CED1',
      conversation: '#9370DB',
      endurance: '#DC143C'
    };
    return colors[category] || '#FFFFFF';
  };

  const earnedAchievements = achievementsData.filter(achievement => achievement.earned);
  const inProgressAchievements = achievementsData.filter(achievement => !achievement.earned);

  return (
    <Animated.View style={[styles.achievementsModalOverlay, { opacity: opacityAnim }]}>
      <TouchableOpacity 
        style={styles.achievementsModalBackdrop} 
        onPress={onClose}
        activeOpacity={1}
      />
      <Animated.View 
        style={[
          styles.achievementsModalContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#58CC67', '#3AB1FF', '#7C3AED']}
          locations={[0, 0.5, 1]}
          style={styles.achievementsModalGradient}
        >
          {/* Modal Header */}
          <View style={styles.achievementsModalHeader}>
            <View style={styles.achievementsModalHeaderContent}>
              <Text style={styles.achievementsModalTitle}>Achievements</Text>
              <Text style={styles.achievementsModalSubtitle}>
                {earnedAchievements.length} earned • {inProgressAchievements.length} in progress
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.achievementsModalCloseButton}>
              <Text style={styles.achievementsModalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Achievements Grid */}
          <ScrollView 
            style={styles.achievementsModalList}
            showsVerticalScrollIndicator={false}
          >
            {/* Earned Achievements */}
            <Text style={styles.achievementsModalSectionTitle}>Earned Badges</Text>
            <View style={styles.achievementsModalGrid}>
              {earnedAchievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementsModalCard}>
                  <View style={[
                    styles.achievementsModalIconContainer,
                    { backgroundColor: getCategoryColor(achievement.category) }
                  ]}>
                    <Text style={styles.achievementsModalIcon}>{achievement.icon}</Text>
                  </View>
                  <Text style={styles.achievementsModalCardTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementsModalCardDescription}>{achievement.description}</Text>
                  <Text style={styles.achievementsModalCardDate}>Earned {achievement.earnedDate}</Text>
                </View>
              ))}
            </View>

            {/* In Progress Achievements */}
            {inProgressAchievements.length > 0 && (
              <>
                <Text style={styles.achievementsModalSectionTitle}>In Progress</Text>
                <View style={styles.achievementsModalGrid}>
                  {inProgressAchievements.map((achievement) => (
                    <View key={achievement.id} style={[
                      styles.achievementsModalCard,
                      styles.achievementsModalCardInProgress
                    ]}>
                      <View style={[
                        styles.achievementsModalIconContainer,
                        styles.achievementsModalIconContainerInProgress
                      ]}>
                        <Text style={styles.achievementsModalIconInProgress}>{achievement.icon}</Text>
                      </View>
                      <Text style={styles.achievementsModalCardTitleInProgress}>{achievement.title}</Text>
                      <Text style={styles.achievementsModalCardDescriptionInProgress}>{achievement.description}</Text>
                      <View style={styles.achievementsModalProgressContainer}>
                        <View style={styles.achievementsModalProgressBar}>
                          <View style={[
                            styles.achievementsModalProgressFill,
                            { width: `${achievement.progress}%` }
                          ]} />
                        </View>
                        <Text style={styles.achievementsModalProgressText}>{achievement.progress}%</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </>
            )}
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

// Learning Path Modal Component
const LearningPathModal = ({ visible, onClose, learningPathData }) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#58CC67';
      case 'current': return '#3AB1FF';
      case 'locked': return 'rgba(255, 255, 255, 0.3)';
      default: return '#FFFFFF';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✓';
      case 'current': return '▶';
      case 'locked': return '🔒';
      default: return '●';
    }
  };

  return (
    <Animated.View style={[styles.learningPathModalOverlay, { opacity: opacityAnim }]}>
      <TouchableOpacity 
        style={styles.learningPathModalBackdrop} 
        onPress={onClose}
        activeOpacity={1}
      />
      <Animated.View 
        style={[
          styles.learningPathModalContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#58CC67', '#3AB1FF', '#7C3AED']}
          locations={[0, 0.5, 1]}
          style={styles.learningPathModalGradient}
        >
          {/* Modal Header */}
          <View style={styles.learningPathModalHeader}>
            <View style={styles.learningPathModalHeaderContent}>
              <Text style={styles.learningPathModalTitle}>Learning Journey</Text>
              <Text style={styles.learningPathModalSubtitle}>Your Spanish course roadmap</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.learningPathModalCloseButton}>
              <Text style={styles.learningPathModalCloseText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Learning Path */}
          <ScrollView 
            style={styles.learningPathModalList}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.learningPathContainer}>
              {learningPathData.map((unit, unitIndex) => (
                <View key={unit.id} style={styles.learningPathUnit}>
                  {/* Unit Header */}
                  <View style={styles.learningPathUnitHeader}>
                    <View style={[
                      styles.learningPathUnitIcon,
                      { backgroundColor: getStatusColor(unit.status) }
                    ]}>
                      <Text style={styles.learningPathUnitIconText}>
                        {getStatusIcon(unit.status)}
                      </Text>
                    </View>
                    <View style={styles.learningPathUnitInfo}>
                      <Text style={[
                        styles.learningPathUnitTitle,
                        unit.status === 'locked' && styles.learningPathUnitTitleLocked
                      ]}>
                        {unit.title}
                      </Text>
                      <Text style={styles.learningPathUnitProgress}>
                        {unit.progress}% Complete
                      </Text>
                    </View>
                  </View>

                  {/* Unit Progress Bar */}
                  <View style={styles.learningPathUnitProgressBar}>
                    <View style={[
                      styles.learningPathUnitProgressFill,
                      { 
                        width: `${unit.progress}%`,
                        backgroundColor: getStatusColor(unit.status)
                      }
                    ]} />
                  </View>

                  {/* Lessons */}
                  <View style={styles.learningPathLessons}>
                    {unit.lessons.map((lesson, lessonIndex) => (
                      <View key={lesson.id} style={styles.learningPathLesson}>
                        <View style={[
                          styles.learningPathLessonIcon,
                          { backgroundColor: getStatusColor(lesson.status) }
                        ]}>
                          <Text style={styles.learningPathLessonIconText}>
                            {getStatusIcon(lesson.status)}
                          </Text>
                        </View>
                        <View style={styles.learningPathLessonInfo}>
                          <Text style={[
                            styles.learningPathLessonTitle,
                            lesson.status === 'locked' && styles.learningPathLessonTitleLocked
                          ]}>
                            {lesson.title}
                          </Text>
                          {lesson.status === 'completed' && (
                            <Text style={styles.learningPathLessonXP}>+{lesson.xp} XP</Text>
                          )}
                        </View>
                        {lesson.status === 'current' && (
                          <View style={styles.learningPathCurrentIndicator}>
                            <Text style={styles.learningPathCurrentText}>Current</Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>

                  {/* Connecting Line */}
                  {unitIndex < learningPathData.length - 1 && (
                    <View style={styles.learningPathConnector} />
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </LinearGradient>
      </Animated.View>
    </Animated.View>
  );
};

const TextbookModal = ({ visible, onClose, selectedTextbook, setSelectedTextbook, selectedPage, setSelectedPage, textbooks }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.textbookModalOverlay}>
      <Animated.View 
        style={[
          styles.textbookModalBackdrop,
          { opacity: backdropOpacity }
        ]}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.textbookModalBackdrop} />
        </TouchableWithoutFeedback>
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.textbookModalContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.textbookModalGradient}
        >
          {/* Modal Handle */}
          <View style={styles.modalHandle} />
          
          {/* Header */}
          <View style={styles.textbookModalHeader}>
            <View style={styles.textbookModalTitleContainer}>
              <View style={styles.headerIconContainer}>
                <Text style={styles.textbookModalIcon}>📚</Text>
              </View>
              <View>
                <Text style={styles.textbookModalTitle}>Textbook Settings</Text>
                <Text style={styles.textbookModalSubtitle}>Connect your learning materials</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.textbookModalCloseButton}>
              <Text style={styles.textbookModalCloseText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Current Selection Card */}
          <View style={styles.currentSelectionCard}>
            <View style={styles.currentSelectionHeader}>
              <Text style={styles.currentSelectionTitle}>Current Textbook</Text>
            </View>
            <Text style={styles.currentSelectionBook}>{selectedTextbook}</Text>
            <View style={styles.pageIndicator}>
              <Text style={styles.pageIndicatorText}>Page 100</Text>
            </View>
          </View>

          {/* Quick Select */}
          <View style={styles.quickSelectContainer}>
            <Text style={styles.sectionTitle}>Quick Select</Text>
            <View style={styles.textbookGrid}>
              {textbooks.map((textbook, index) => {
                const isSelected = selectedTextbook === textbook;
                return (
                  <TouchableOpacity
                    key={`textbook-${index}`}
                    style={styles.textbookGridItem}
                    onPress={() => setSelectedTextbook(textbook)}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={isSelected 
                        ? ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.15)']
                        : ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']
                      }
                      style={[
                        styles.textbookGridGradient,
                        isSelected && styles.textbookGridGradientSelected
                      ]}
                    >
                      <Text style={[
                        styles.textbookGridNumber,
                        isSelected && styles.textbookGridNumberSelected
                      ]}>
                        Spanish {index + 1}
                      </Text>
                      <Text style={[
                        styles.textbookGridSubtitle,
                        isSelected && styles.textbookGridSubtitleSelected
                      ]}>
                        ¡Avancemos!
                      </Text>
                      <View style={[
                        styles.selectedIndicator,
                        { opacity: isSelected ? 1 : 0 }
                      ]}>
                        <Text style={styles.selectedIndicatorText}>✓</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionButtonsContainer}>
            <Text style={styles.sectionTitle}>Add Your Content</Text>
            <View style={styles.actionButtonsGrid}>
              <TouchableOpacity style={styles.compactActionButton} activeOpacity={0.8}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.08)']}
                  style={styles.compactActionGradient}
                >
                  <View style={styles.compactIconWrapper}>
                    <Text style={styles.compactActionIcon}>📄</Text>
                  </View>
                  <View style={styles.compactActionTextContainer}>
                    <Text style={styles.compactActionText}>Upload PDF</Text>
                    <Text style={styles.compactActionSubtext}>Import your textbook</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.compactActionButton} activeOpacity={0.8}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.08)']}
                  style={styles.compactActionGradient}
                >
                  <View style={styles.compactIconWrapper}>
                    <Text style={styles.compactActionIcon}>🔍</Text>
                  </View>
                  <View style={styles.compactActionTextContainer}>
                    <Text style={styles.compactActionText}>Search Library</Text>
                    <Text style={styles.compactActionSubtext}>Find textbooks online</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Close Button */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Done</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const StreakModal = ({ visible, onClose, streakData }) => {
  const slideAnim = useRef(new Animated.Value(300)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 300,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'review': return '📚';
      case 'practice': return '🎯';
      case 'challenge': return '⚡';
      case 'lesson': return '📖';
      default: return '✨';
    }
  };

  const getRecommendationColor = (type) => {
    switch (type) {
      case 'review': return '#4ECDC4';
      case 'practice': return '#45B7D1';
      case 'challenge': return '#96CEB4';
      case 'lesson': return '#FFEAA7';
      default: return '#DDA0DD';
    }
  };

  if (!visible) return null;

  return (
    <View style={styles.streakModalOverlay}>
      <Animated.View 
        style={[
          styles.streakModalBackdrop,
          { opacity: backdropOpacity }
        ]}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.streakModalBackdrop} />
        </TouchableWithoutFeedback>
      </Animated.View>
      
      <Animated.View 
        style={[
          styles.streakModalContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <LinearGradient
          colors={['rgba(78, 205, 196, 0.95)', 'rgba(69, 183, 209, 0.95)', 'rgba(150, 206, 180, 0.95)']}
          style={styles.streakModalGradient}
        >
          {/* Header */}
          <View style={styles.streakModalHeader}>
            <View style={styles.streakModalTitleContainer}>
              <Text style={styles.streakModalIcon}>🔥</Text>
              <Text style={styles.streakModalTitle}>Your Learning Journey</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.streakModalCloseButton}>
              <Text style={styles.streakModalCloseText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Streak Stats */}
          <View style={styles.streakStatsContainer}>
            <View style={styles.streakStatCard}>
              <Text style={styles.streakStatNumber}>{streakData.currentStreak}</Text>
              <Text style={styles.streakStatLabel}>Day Streak</Text>
            </View>
            <View style={styles.streakStatCard}>
              <Text style={styles.streakStatNumber}>{streakData.longestStreak}</Text>
              <Text style={styles.streakStatLabel}>Longest Streak</Text>
            </View>
            <View style={styles.streakStatCard}>
              <Text style={styles.streakStatNumber}>{streakData.weeklyGoal}</Text>
              <Text style={styles.streakStatLabel}>Weekly Goal</Text>
            </View>
          </View>

          {/* Personalized Recommendations */}
          <View style={styles.recommendationsSection}>
            <Text style={styles.recommendationsTitle}>Recommended for You</Text>
            
            <ScrollView 
              style={styles.recommendationsList}
              showsVerticalScrollIndicator={false}
            >
              {streakData.recommendations.map((rec, index) => (
                <TouchableOpacity 
                  key={index}
                  style={[
                    styles.recommendationCard,
                    { borderLeftColor: getRecommendationColor(rec.type) }
                  ]}
                  onPress={() => console.log('Recommendation pressed:', rec.title)}
                >
                  <View style={styles.recommendationContent}>
                    <View style={styles.recommendationHeader}>
                      <Text style={styles.recommendationIcon}>
                        {getRecommendationIcon(rec.type)}
                      </Text>
                      <View style={styles.recommendationInfo}>
                        <Text style={styles.recommendationTitle}>{rec.title}</Text>
                        <Text style={styles.recommendationSubtitle}>{rec.subtitle}</Text>
                      </View>
                      <View style={styles.recommendationMeta}>
                        <Text style={styles.recommendationTime}>{rec.estimatedTime}</Text>
                        <Text style={styles.recommendationXP}>+{rec.xpReward} XP</Text>
                      </View>
                    </View>
                    {rec.description && (
                      <Text style={styles.recommendationDescription}>{rec.description}</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Review Reminders */}
          <View style={styles.reviewRemindersSection}>
            <Text style={styles.reviewRemindersTitle}>Quick Review</Text>
            <Text style={styles.reviewRemindersSubtitle}>
              {streakData.reviewItems.length} items need review
            </Text>
            
            <View style={styles.reviewItemsContainer}>
              {streakData.reviewItems.slice(0, 3).map((item, index) => (
                <TouchableOpacity 
                  key={index}
                  style={styles.reviewItemCard}
                  onPress={() => console.log('Review item pressed:', item.word)}
                >
                  <Text style={styles.reviewItemWord}>{item.word}</Text>
                  <Text style={styles.reviewItemTranslation}>{item.translation}</Text>
                  <Text style={styles.reviewItemDue}>Due {item.dueDate}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {streakData.reviewItems.length > 3 && (
              <TouchableOpacity style={styles.viewAllReviewButton}>
                <Text style={styles.viewAllReviewText}>
                  View All {streakData.reviewItems.length} Items
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [screen, setScreen] = useState('home');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [review, setReview] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [uploadCount, setUploadCount] = useState(0); // Track uploads for unlocking features
  const [wordBank, setWordBank] = useState([]); // Store collected vocabulary
  const [textbookLinked, setTextbookLinked] = useState(true); // Textbook integration toggle
  const [showTextbookModal, setShowTextbookModal] = useState(false);
  const [selectedTextbook, setSelectedTextbook] = useState('Spanish 1: ¡Avancemos!');
  const [selectedPage, setSelectedPage] = useState('156');
  const [textbooks] = useState(['Spanish 1: ¡Avancemos!', 'Spanish 2: ¡Avancemos!', 'Spanish 3: ¡Avancemos!']);
  
  // Onboarding states
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [userName, setUserName] = useState('Zander');
  
  console.log('App component rendered - Current screen:', screen);
  console.log('App component rendered - Notes state:', notes);
  
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

  // Daily quest system state
  const [dailyQuests, setDailyQuests] = useState([
    {
      id: 1,
      title: "Practice Session",
      description: "Complete 1 practice session",
      type: "practice",
      icon: "🎯",
      xpReward: 25,
      gemReward: 5,
      progress: 0,
      maxProgress: 1,
      status: "available", // available, in_progress, completed, claimed
      color: "#58CC67",
      category: "daily"
    },
    {
      id: 2,
      title: "Vocabulary Review",
      description: "Review 5 words from yesterday",
      type: "review",
      icon: "📚",
      xpReward: 35,
      gemReward: 8,
      progress: 3,
      maxProgress: 5,
      status: "in_progress",
      color: "#3AB1FF",
      category: "daily"
    },
    {
      id: 3,
      title: "Upload Content",
      description: "Add 1 new lesson material",
      type: "upload",
      icon: "📤",
      xpReward: 50,
      gemReward: 10,
      progress: 0,
      maxProgress: 1,
      status: "available",
      color: "#7C3AED",
      category: "daily"
    },
    {
      id: 4,
      title: "Quiz Challenge",
      description: "Score 80%+ on any quiz",
      type: "quiz",
      icon: "🏆",
      xpReward: 40,
      gemReward: 12,
      progress: 0,
      maxProgress: 1,
      status: "available",
      color: "#FF6B6B",
      category: "daily"
    }
  ]);

  // User progress state
  const [userProgress, setUserProgress] = useState({
    totalXP: 1250,
    totalGems: 68,
    dailyXP: 95,
    questsCompleted: 2,
    currentStreak: 5
  });

  // User profile information
  const [userProfile] = useState({
    languages: [
      {
        id: 1,
        name: 'Spanish',
        flag: '🇪🇸',
        proficiency: 'Intermediate',
        progress: 65,
        region: 'Latin American'
      }
    ],
    books: [
      {
        id: 1,
        title: 'Spanish for Beginners',
        author: 'Maria Rodriguez',
        progress: 85,
        cover: '📖',
        status: 'active'
      },
      {
        id: 2,
        title: 'Advanced Grammar',
        author: 'Carlos Mendez',
        progress: 30,
        cover: '📚',
        status: 'active'
      },
      {
        id: 3,
        title: 'Conversation Practice',
        author: 'Ana Silva',
        progress: 45,
        cover: '💬',
        status: 'active'
      }
    ],
    region: {
      origin: 'United States',
      flag: '🇺🇸',
      timezone: 'PST',
      learningRegion: 'Latin America'
    }
  });

  // Game modes data
  const [gameModes] = useState([
    {
      id: 1,
      title: "Upload & Learn",
      description: "Add notes, photos, or voice recordings to get AI-powered reviews",
      // icon: <DocumentIcon size={32} color="#FFFFFF" />, // Commented out to fix Text component error
      color: "rgba(88, 204, 103, 0.9)",
      badge: "START HERE",
      badgeColor: "#10B981",
      requiresUploads: 0,
      route: "upload"
    },
    {
      id: 2,
      title: "Quiz Challenge",
      description: "Test your knowledge with personalized quizzes",
      // icon: <AwardIcon size={32} color="#FFFFFF" />, // Commented out to fix Text component error
      color: "rgba(124, 58, 237, 0.9)",
      badge: "UNLOCK SOON",
      badgeColor: "#7C3AED",
      requiresUploads: 3,
      route: "quiz"
    },
    {
      id: 3,
      title: "AI Chat Practice",
      description: "Practice conversations with AI in real scenarios",
      // icon: <ChatIcon size={32} color="#FFFFFF" />, // Commented out to fix Text component error
      color: "rgba(58, 177, 255, 0.9)",
      badge: "COMING SOON",
      badgeColor: "#3B82F6",
      requiresUploads: 0,
      route: "chat"
    }
  ]);

  // Word Bank initial data - Spanish vocabulary
  const [initialWordBank] = useState([
    {
      id: 1,
      word: "estudiar",
      translation: "to study",
      category: "verbs",
      difficulty: "beginner",
      dateAdded: "Today",
      source: "upload",
      example: "Me gusta estudiar español",
      exampleTranslation: "I like to study Spanish"
    },
    {
      id: 2,
      word: "biblioteca",
      translation: "library",
      category: "places",
      difficulty: "beginner",
      dateAdded: "Yesterday",
      source: "ai_review",
      example: "La biblioteca está cerrada",
      exampleTranslation: "The library is closed"
    },
    {
      id: 3,
      word: "subjuntivo",
      translation: "subjunctive",
      category: "grammar",
      difficulty: "advanced",
      dateAdded: "Dec 28",
      source: "upload",
      example: "Espero que estudies el subjuntivo",
      exampleTranslation: "I hope you study the subjunctive"
    },
    {
      id: 4,
      word: "aeropuerto",
      translation: "airport",
      category: "travel",
      difficulty: "intermediate",
      dateAdded: "Dec 27",
      source: "ai_review",
      example: "El aeropuerto está muy lejos",
      exampleTranslation: "The airport is very far"
    },
    {
      id: 5,
      word: "restaurante",
      translation: "restaurant",
      category: "places",
      difficulty: "beginner",
      dateAdded: "Dec 26",
      source: "upload",
      example: "Este restaurante es muy bueno",
      exampleTranslation: "This restaurant is very good"
    },
    {
      id: 6,
      word: "imperfecto",
      translation: "imperfect tense",
      category: "grammar",
      difficulty: "intermediate",
      dateAdded: "Dec 25",
      source: "ai_review",
      example: "Cuando era niño, jugaba mucho",
      exampleTranslation: "When I was a child, I used to play a lot"
    }
  ]);

  // Leaderboard data for ranking modal - sorted by rank
  const [leaderboardData] = useState([
    {
      id: 1,
      name: "Maria",
      profilePic: require('./assets/one.png'),
      weeklyXP: 2450,
      rank: 1,
      isCurrentUser: false
    },
    {
      id: 2,
      name: "Carlos",
      profilePic: require('./assets/two.png'),
      weeklyXP: 2180,
      rank: 2,
      isCurrentUser: false
    },
    {
      id: 3,
      name: "Zander",
      profilePic: require('./assets/zander.jpg'),
      weeklyXP: 1950,
      rank: 3,
      isCurrentUser: true
    },
    {
      id: 4,
      name: "Sophie",
      profilePic: require('./assets/three.png'),
      weeklyXP: 1780,
      rank: 4,
      isCurrentUser: false
    },
    {
      id: 5,
      name: "Diego",
      profilePic: require('./assets/four.png'),
      weeklyXP: 1650,
      rank: 5,
      isCurrentUser: false
    },
    {
      id: 6,
      name: "Emma",
      profilePic: require('./assets/five.png'),
      weeklyXP: 1520,
      rank: 6,
      isCurrentUser: false
    },
    {
      id: 7,
      name: "Alex",
      profilePic: require('./assets/six.png'),
      weeklyXP: 1380,
      rank: 7,
      isCurrentUser: false
    },
    {
      id: 8,
      name: "Luna",
      profilePic: require('./assets/seven.png'),
      weeklyXP: 1180,
      rank: 8,
      isCurrentUser: false
    }
  ]);

  // Achievements data for badges modal
  const [achievementsData] = useState([
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: "🎯",
      category: "learning",
      earned: true,
      earnedDate: "Dec 28, 2024",
      progress: 100
    },
    {
      id: 2,
      title: "Streak Master",
      description: "Maintain a 5-day learning streak",
      icon: "🔥",
      category: "consistency",
      earned: true,
      earnedDate: "Dec 27, 2024",
      progress: 100
    },
    {
      id: 3,
      title: "Word Collector",
      description: "Add 10 words to your Word Bank",
      icon: "📚",
      category: "vocabulary",
      earned: true,
      earnedDate: "Dec 26, 2024",
      progress: 100
    },
    {
      id: 4,
      title: "Social Butterfly",
      description: "Add 5 friends to your network",
      icon: "👥",
      category: "social",
      earned: true,
      earnedDate: "Dec 25, 2024",
      progress: 100
    },
    {
      id: 5,
      title: "Grammar Guru",
      description: "Master 3 grammar concepts",
      icon: "✍️",
      category: "grammar",
      earned: true,
      earnedDate: "Dec 24, 2024",
      progress: 100
    },
    {
      id: 6,
      title: "Upload Expert",
      description: "Upload 5 lesson materials",
      icon: "📤",
      category: "content",
      earned: true,
      earnedDate: "Dec 23, 2024",
      progress: 100
    },
    {
      id: 7,
      title: "Quiz Champion",
      description: "Score 100% on 3 quizzes",
      icon: "🏆",
      category: "performance",
      earned: true,
      earnedDate: "Dec 22, 2024",
      progress: 100
    },
    {
      id: 8,
      title: "Review Master",
      description: "Complete 10 lesson reviews",
      icon: "🔍",
      category: "review",
      earned: true,
      earnedDate: "Dec 21, 2024",
      progress: 100
    },
    {
      id: 9,
      title: "Speed Learner",
      description: "Complete 5 lessons in one day",
      icon: "⚡",
      category: "speed",
      earned: true,
      earnedDate: "Dec 20, 2024",
      progress: 100
    },
    {
      id: 10,
      title: "Perfectionist",
      description: "Get 10 perfect scores",
      icon: "💯",
      category: "accuracy",
      earned: true,
      earnedDate: "Dec 19, 2024",
      progress: 100
    },
    {
      id: 11,
      title: "Conversation Starter",
      description: "Complete 5 AI chat sessions",
      icon: "💬",
      category: "conversation",
      earned: false,
      earnedDate: null,
      progress: 60
    },
    {
      id: 12,
      title: "Marathon Learner",
      description: "Study for 30 days straight",
      icon: "🏃",
      category: "endurance",
      earned: false,
      earnedDate: null,
      progress: 17
    }
  ]);

  // Learning Path data for roadmap visualization
  const [learningPathData] = useState([
    {
      id: 1,
      title: "Spanish Basics",
      type: "unit",
      status: "completed",
      progress: 100,
      lessons: [
        { id: 1, title: "Greetings", status: "completed", xp: 25 },
        { id: 2, title: "Numbers", status: "completed", xp: 25 },
        { id: 3, title: "Colors", status: "completed", xp: 25 },
        { id: 4, title: "Family", status: "completed", xp: 25 }
      ]
    },
    {
      id: 2,
      title: "Present Tense",
      type: "unit",
      status: "completed",
      progress: 100,
      lessons: [
        { id: 5, title: "Ser vs Estar", status: "completed", xp: 30 },
        { id: 6, title: "Regular Verbs", status: "completed", xp: 30 },
        { id: 7, title: "Irregular Verbs", status: "completed", xp: 30 }
      ]
    },
    {
      id: 3,
      title: "Daily Activities",
      type: "unit",
      status: "current",
      progress: 75,
      lessons: [
        { id: 8, title: "Morning Routine", status: "completed", xp: 35 },
        { id: 9, title: "Work & Study", status: "completed", xp: 35 },
        { id: 10, title: "Evening Activities", status: "current", xp: 0 },
        { id: 11, title: "Weekend Plans", status: "locked", xp: 0 }
      ]
    },
    {
      id: 4,
      title: "Past Tense",
      type: "unit",
      status: "locked",
      progress: 0,
      lessons: [
        { id: 12, title: "Preterite Tense", status: "locked", xp: 0 },
        { id: 13, title: "Imperfect Tense", status: "locked", xp: 0 },
        { id: 14, title: "Past vs Present", status: "locked", xp: 0 }
      ]
    },
    {
      id: 5,
      title: "Travel & Places",
      type: "unit",
      status: "locked",
      progress: 0,
      lessons: [
        { id: 15, title: "Directions", status: "locked", xp: 0 },
        { id: 16, title: "Transportation", status: "locked", xp: 0 },
        { id: 17, title: "Hotels & Restaurants", status: "locked", xp: 0 },
        { id: 18, title: "Asking for Help", status: "locked", xp: 0 }
      ]
    },
    {
      id: 6,
      title: "Advanced Grammar",
      type: "unit",
      status: "locked",
      progress: 0,
      lessons: [
        { id: 19, title: "Subjunctive Mood", status: "locked", xp: 0 },
        { id: 20, title: "Conditional Tense", status: "locked", xp: 0 },
        { id: 21, title: "Complex Sentences", status: "locked", xp: 0 }
      ]
    }
  ]);

  // Streak data for customized learning modal
  const [streakData] = useState({
    currentStreak: 5,
    longestStreak: 12,
    weeklyGoal: 7,
    recommendations: [
      {
        type: "review",
        title: "Quick Review Session",
        subtitle: "Past Tense Verbs",
        description: "Review 8 verbs you learned last week to strengthen retention",
        estimatedTime: "5 min",
        xpReward: 15
      },
      {
        type: "practice",
        title: "Grammar Practice",
        subtitle: "Ser vs Estar",
        description: "Practice distinguishing between ser and estar in context",
        estimatedTime: "10 min",
        xpReward: 25
      },
      {
        type: "challenge",
        title: "Speed Challenge",
        subtitle: "Family Vocabulary",
        description: "Test your family vocabulary with a timed challenge",
        estimatedTime: "3 min",
        xpReward: 20
      },
      {
        type: "lesson",
        title: "New Lesson",
        subtitle: "Evening Activities",
        description: "Continue your Daily Activities unit with evening vocabulary",
        estimatedTime: "15 min",
        xpReward: 35
      },
      {
        type: "review",
        title: "Spaced Repetition",
        subtitle: "Colors & Numbers",
        description: "Review basic vocabulary using spaced repetition method",
        estimatedTime: "7 min",
        xpReward: 18
      }
    ],
    reviewItems: [
      {
        word: "hermana",
        translation: "sister",
        dueDate: "today"
      },
      {
        word: "cocinar",
        translation: "to cook",
        dueDate: "today"
      },
      {
        word: "azul",
        translation: "blue",
        dueDate: "tomorrow"
      },
      {
        word: "trabajar",
        translation: "to work",
        dueDate: "today"
      },
      {
        word: "madre",
        translation: "mother",
        dueDate: "2 days"
      },
      {
        word: "estudiar",
        translation: "to study",
        dueDate: "today"
      },
      {
        word: "verde",
        translation: "green",
        dueDate: "tomorrow"
      }
    ]
  });

  // Initialize word bank with sample data
  useEffect(() => {
    if (wordBank.length === 0) {
      setWordBank(initialWordBank);
    }
  }, []);

  // Splash screen animations - Tinder-like kinetic design
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const gradientShift = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(10)).current;
  const screenFadeOut = useRef(new Animated.Value(1)).current;
  const mainScreenSlideUp = useRef(new Animated.Value(height)).current;

  // Screen transition animations
  const screenTransitionX = useRef(new Animated.Value(0)).current;
  const screenOpacity = useRef(new Animated.Value(1)).current;
  const screenScale = useRef(new Animated.Value(1)).current;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextScreen, setNextScreen] = useState(null);
  
  // Progress screen interactive states
  const [pressedStat, setPressedStat] = useState(null);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);

  useEffect(() => {
    if (showSplash) {
      // Tinder-like logo pulse animation: 80% → 110% → 80% → 110% → 100%
      Animated.sequence([
        // First pulse: 80% → 110%
        Animated.spring(logoScale, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
          tension: 200,
          friction: 8,
        }),
        // Return to 80%
        Animated.spring(logoScale, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
          tension: 200,
          friction: 8,
        }),
        // Second pulse: 80% → 110%
        Animated.spring(logoScale, {
          toValue: 1.1,
          duration: 300,
          useNativeDriver: true,
          tension: 200,
          friction: 8,
        }),
        // Final settle at 100%
        Animated.spring(logoScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          tension: 200,
          friction: 8,
        }),
      ]).start(() => {
        // After logo animation: gradient shift + tagline fade in
        Animated.parallel([
          // Subtle gradient hue shift
          Animated.timing(gradientShift, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
          // Tagline fade in with upward shift
          Animated.parallel([
            Animated.timing(taglineOpacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            Animated.timing(taglineTranslateY, {
              toValue: 0,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        ]).start(() => {
          // Hold for 0.6 seconds then transition
          setTimeout(() => {
            Animated.parallel([
              // Fade out splash content
              Animated.timing(screenFadeOut, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
              }),
              // Slide up main screen
              Animated.timing(mainScreenSlideUp, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
              }),
            ]).start(() => {
              setShowSplash(false);
            });
          }, 600);
        });
      });
    }
  }, [showSplash]);

  // Enhanced screen transition functions with gradient-preserving animations
  const animateToScreen = (targetScreen, transitionType = 'default') => {
    setIsTransitioning(true);
    setNextScreen(targetScreen);
    
    if (transitionType === 'profile') {
      // Premium zoom and fade transition for profile - maintains gradient
      Animated.parallel([
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(screenScale, {
          toValue: 0.95,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setScreen(targetScreen);
        screenOpacity.setValue(0);
        screenScale.setValue(1.05);
        
        // Zoom in new screen with premium spring effect
        Animated.parallel([
          Animated.spring(screenOpacity, {
            toValue: 1,
            tension: 120,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(screenScale, {
            toValue: 1,
            tension: 120,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setIsTransitioning(false);
          setNextScreen(null);
        });
      });
    } else if (transitionType === 'lesson') {
      // Premium slide and scale transition for lesson button
      Animated.parallel([
        Animated.timing(screenOpacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(screenTransitionX, {
          toValue: 40,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(screenScale, {
          toValue: 0.98,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setScreen(targetScreen);
        screenOpacity.setValue(0);
        screenTransitionX.setValue(-40);
        screenScale.setValue(1.02);
        
        // Slide up and fade in new screen with premium spring
        Animated.parallel([
          Animated.spring(screenOpacity, {
            toValue: 1,
            tension: 110,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(screenTransitionX, {
            toValue: 0,
            tension: 110,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.spring(screenScale, {
            toValue: 1,
            tension: 110,
            friction: 8,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setIsTransitioning(false);
          setNextScreen(null);
        });
      });
    } else {
      // Default fade transition - maintains gradient
      Animated.timing(screenOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setScreen(targetScreen);
        screenOpacity.setValue(0);
        // Reset other transform values for clean default transition
        screenTransitionX.setValue(0);
        screenScale.setValue(1);
        
        // Fade in new screen
        Animated.timing(screenOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start(() => {
          setIsTransitioning(false);
          setNextScreen(null);
        });
      });
    }
  };

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
      animateToScreen('review');
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
    animateToScreen('review');
  };

  const handleTextSubmit = () => {
    console.log('handleTextSubmit called - using demo content');
    
    // Simulate adding new words to Word Bank from AI review
    const newWords = [
      {
        id: Date.now() + 1,
        word: "conjugar",
        translation: "to conjugate",
        category: "verbs",
        difficulty: "intermediate",
        dateAdded: "Just now",
        source: "ai_review",
        example: "Es importante conjugar los verbos correctamente",
        exampleTranslation: "It's important to conjugate verbs correctly"
      },
      {
        id: Date.now() + 2,
        word: "estudiar",
        translation: "to study",
        category: "verbs",
        difficulty: "beginner",
        dateAdded: "Just now",
        source: "ai_review",
        example: "Me gusta estudiar español todos los días",
        exampleTranslation: "I like to study Spanish every day"
      }
    ];
    
    // Add new words to word bank
    setWordBank(prevWords => [...newWords, ...prevWords]);
    
    setReview(
      `🧠 AI Review Based on Your Notes:\n\n` +
      `📘 Key Vocabulary from AR Verbs:\n- hablar (to speak)\n- estudiar (to study)\n- caminar (to walk)\n- cocinar (to cook)\n\n` +
      `💬 Practice Sentences:\n"Yo hablo español con mis amigos."\n"Nosotros estudiamos en la biblioteca."\n"Ellos caminan al parque todos los días."\n\n` +
      `${textbookLinked ? `📚 Textbook Alignment:\nThis lesson aligns with ${selectedTextbook} Chapter 3: Present Tense Conjugations from page ${selectedPage}.\n\n` : ''}` +
      `✨ New Words Added to Your Word Bank:\n` +
      `• conjugar (to conjugate)\n` +
      `• estudiar (to study)\n\n` +
      `📝 Interactive Quiz:\nLet's practice what you've learned!`
    );
    animateToScreen('review');
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
    animateToScreen('review');
  };

  // Quest action handlers
  const handleQuestAction = (quest) => {
    console.log('Quest action:', quest.title, quest.status);
    
    if (quest.status === 'completed') {
      // Claim reward
      handleClaimReward(quest);
    } else {
      // Start or continue quest
      handleStartQuest(quest);
    }
  };

  const handleStartQuest = (quest) => {
    // Navigate to appropriate screen based on quest type
    switch (quest.type) {
      case 'practice':
        animateToScreen('upload');
        break;
      case 'review':
        // Navigate to word bank or review screen
        console.log('Starting vocabulary review quest');
        break;
      case 'upload':
        animateToScreen('upload');
        break;
      case 'quiz':
        animateToScreen('quiz');
        break;
      default:
        console.log(`Starting ${quest.type} quest`);
    }
    
    // Update quest status to in_progress
    setDailyQuests(prevQuests => 
      prevQuests.map(q => 
        q.id === quest.id 
          ? { ...q, status: 'in_progress' }
          : q
      )
    );
  };

  const handleClaimReward = (quest) => {
    // Add XP and gems to user progress
    setUserProgress(prevProgress => ({
      ...prevProgress,
      totalXP: prevProgress.totalXP + quest.xpReward,
      totalGems: prevProgress.totalGems + quest.gemReward,
      dailyXP: prevProgress.dailyXP + quest.xpReward,
      questsCompleted: prevProgress.questsCompleted + 1
    }));

    // Mark quest as claimed
    setDailyQuests(prevQuests => 
      prevQuests.map(q => 
        q.id === quest.id 
          ? { ...q, status: 'claimed' }
          : q
      )
    );

    // Show reward notification (could add animation here)
    console.log(`Claimed: +${quest.xpReward} XP, +${quest.gemReward} gems`);
  };

  const updateQuestProgress = (questType, progressAmount = 1) => {
    setDailyQuests(prevQuests => 
      prevQuests.map(quest => {
        if (quest.type === questType && quest.status !== 'claimed') {
          const newProgress = Math.min(quest.progress + progressAmount, quest.maxProgress);
          const newStatus = newProgress >= quest.maxProgress ? 'completed' : 'in_progress';
          return { ...quest, progress: newProgress, status: newStatus };
        }
        return quest;
      })
    );
  };

  const handleGameModeSelect = (gameMode) => {
    console.log('Game mode selected:', gameMode);
    if (gameMode.route === 'upload') {
      animateToScreen('upload');
    } else if (gameMode.route === 'quiz') {
      // Update quiz quest progress when quiz is started
      updateQuestProgress('quiz');
      animateToScreen('quiz');
    } else if (gameMode.route === 'chat') {
      // For now, just show a placeholder
      console.log('AI Chat coming soon!');
    }
    
    // Update practice quest progress when any game mode is selected
    updateQuestProgress('practice');
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

  // Category configuration function for Word Bank
  const getCategoryConfig = (category) => {
    const categoryConfigs = {
      verbs: {
        text: "Verbs",
        backgroundColor: "#58CC67", // Green from our gradient
        textColor: "#FFFFFF"
      },
      places: {
        text: "Places", 
        backgroundColor: "#3AB1FF", // Blue from our gradient
        textColor: "#FFFFFF"
      },
      grammar: {
        text: "Grammar",
        backgroundColor: "#7C3AED", // Purple from our gradient
        textColor: "#FFFFFF"
      },
      travel: {
        text: "Travel",
        backgroundColor: "#40E0D0", // Turquoise from our gradient
        textColor: "#FFFFFF"
      },
      food: {
        text: "Food",
        backgroundColor: "#FF6B6B", // Coral accent
        textColor: "#FFFFFF"
      },
      general: {
        text: "General",
        backgroundColor: "rgba(255, 255, 255, 0.25)", // Glass effect
        textColor: "#FFFFFF"
      }
    };
    return categoryConfigs[category] || categoryConfigs.general;
  };

  // Progress screen stat handlers
  const handleStatPress = (statType) => {
    setPressedStat(statType);
    // Add haptic feedback for premium feel
    if (Platform.OS === 'ios') {
      // Note: Would need expo-haptics for real implementation
      console.log(`Haptic feedback for ${statType}`);
    }
    
    // Handle specific stat actions
    if (statType === 'friends') {
      setTimeout(() => {
        setShowLeaderboardModal(true);
      }, 150); // Small delay for press animation
    } else if (statType === 'badges') {
      setTimeout(() => {
        setShowAchievementsModal(true);
      }, 150); // Small delay for press animation
    } else if (statType === 'courses') {
      setTimeout(() => {
        setShowLearningPath(true);
      }, 150); // Small delay for press animation
    } else if (statType === 'streak') {
      setTimeout(() => {
        setShowStreakModal(true);
      }, 150); // Small delay for press animation
    } else {
      console.log(`${statType} stat pressed - ready for future phases`);
    }
  };

  const handleStatPressOut = () => {
    setPressedStat(null);
  };

  const SplashScreen = () => {
    // Dynamic gradient colors that shift subtly
    const gradientColors = gradientShift.interpolate({
      inputRange: [0, 1],
      outputRange: [
        ['#7C3AED', '#3AB1FF', '#58CC67'], // Original colors
        ['#9333EA', '#60A5FA', '#6EE7B7'], // Slightly lighter versions
      ],
    });

    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        
        {/* Full-screen gradient background */}
        <Animated.View style={[styles.splashGradientContainer, { opacity: screenFadeOut }]}>
          <LinearGradient
            colors={['#7C3AED', '#3AB1FF', '#58CC67']}
            locations={[0, 0.5, 1]}
            style={styles.splashGradient}
          />
        </Animated.View>

        {/* Main content */}
        <Animated.View 
          style={[
            styles.splashContent,
            {
              opacity: screenFadeOut,
            },
          ]}
        >
          {/* Centered pulsing logo */}
          <View style={styles.splashLogoContainer}>
            <Animated.Image
              source={require('./assets/polytalk-logo.png')}
              style={[
                styles.splashMainLogo,
                {
                  transform: [{ scale: logoScale }],
                },
              ]}
              resizeMode="contain"
            />
          </View>

          {/* Tagline with fade-in animation */}
          <Animated.View
            style={[
              styles.splashTaglineContainer,
              {
                opacity: taglineOpacity,
                transform: [{ translateY: taglineTranslateY }],
              },
            ]}
          >
            <Text style={styles.splashTaglineText}>Speak Any Language, Anywhere</Text>
          </Animated.View>
        </Animated.View>
      </View>
    );
  };

  const HomeScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.gradientContainer}
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
              onPress={() => animateToScreen('progress', 'profile')}
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
            onPress={() => animateToScreen('upload')}
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

        {/* Daily Progress Summary */}
        <DailyProgressSummary 
          userProgress={userProgress}
          quests={dailyQuests}
        />

        {/* Daily Quests Section */}
        <View style={styles.dailyQuestsContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <AwardIcon size={22} color="#FFFFFF" />
              <Text style={styles.sectionTitle}>Daily Quests</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Complete quests to earn XP and gems</Text>
          </View>
          
          <DailyQuestGrid 
            quests={dailyQuests}
            onQuestAction={handleQuestAction}
            userProgress={userProgress}
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

        {/* Word Bank Section */}
        <View style={styles.wordBankContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <BookIcon size={22} color="#FFFFFF" />
              <Text style={styles.sectionTitle}>Word Bank</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Your vocabulary collection</Text>
          </View>
          
          <WordBankCarousel 
            words={wordBank}
            getCategoryConfig={getCategoryConfig}
          />
        </View>
      </View>
              </ScrollView>
            </SafeAreaView>
    </LinearGradient>
  );

  const GameModeScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Static Back Button */}
        <View style={styles.screenshotUploadHeaderFixed}>
          <TouchableOpacity 
            onPress={() => animateToScreen('home')}
            style={styles.screenshotBackButtonLarge}
            hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
          >
            <BackArrowIcon size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* League Status */}
        <View style={styles.leagueStatusContainer}>
          <View style={styles.leagueStatusPill}>
            <CrownIcon size={18} color="#FFD700" />
            <Text style={styles.leagueStatusText}>Gold Status</Text>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={styles.gameModeScreenContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Title Section */}
          <View style={styles.gameModeScreenTitleSection}>
            <Text style={styles.gameModeScreenTitle}>Choose Your Learning Mode</Text>
            <Text style={styles.gameModeScreenSubtitle}>Select how you'd like to learn today</Text>
          </View>
          
          {/* Game Mode Carousel */}
          <GameModeCarousel 
            gameModes={gameModes}
            onGameModeSelect={handleGameModeSelect}
            uploadCount={uploadCount}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );

  const UploadScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Static Back Button */}
        <View style={styles.screenshotUploadHeaderFixed}>
          <TouchableOpacity 
            onPress={() => animateToScreen('home')}
            style={styles.screenshotBackButtonLarge}
            hitSlop={{top: 16, bottom: 16, left: 16, right: 16}}
          >
            <BackArrowIcon size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <ScrollView 
          contentContainerStyle={styles.screenshotUploadContainerImproved}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
                     {/* Title Section */}
           <View style={styles.screenshotUploadTitleSectionImproved}>
             <Text style={styles.screenshotUploadTitle}>Today's Lesson</Text>
             <Text style={styles.screenshotUploadSubtitle}>Upload your lesson for today by adding notes, snapping a photo, or recording your voice to start.</Text>
           </View>
          
          {/* Main Content Card */}
          <View style={styles.screenshotUploadMainCardImproved}>
            <View style={styles.screenshotUploadMainCardContentImproved}>
              {/* Text Input Section */}
              <View style={styles.screenshotUploadTextSectionImproved}>
                <View style={styles.screenshotUploadSectionTitleRow}>
                  <DocumentIcon size={22} color="#fff" />
                  <Text style={styles.screenshotUploadSectionTitle}>Write Your Notes</Text>
                </View>
                <View style={styles.screenshotUploadTextDisplayContainer}>
                  <Text style={styles.screenshotUploadDemoText}>
                    Today we learned about Spanish verb conjugations. The present tense endings for -AR verbs are:
                    {'\n\n'}
                    • yo: -o (hablo)
                    {'\n'}
                    • tú: -as (hablas)  
                    {'\n'}
                    • él/ella: -a (habla)
                    {'\n'}
                    • nosotros: -amos (hablamos)
                    {'\n'}
                    • vosotros: -áis (habláis)
                    {'\n'}
                    • ellos/ellas: -an (hablan)
                    {'\n\n'}
                    We practiced with verbs like "estudiar" (to study), "caminar" (to walk), and "cocinar" (to cook).
                  </Text>
                </View>
              </View>
              
              {/* Divider */}
              <View style={styles.screenshotUploadDividerImproved}>
                <View style={styles.screenshotUploadDividerLine} />
                <Text style={styles.screenshotUploadDividerText}>OR</Text>
                <View style={styles.screenshotUploadDividerLine} />
              </View>
              
              {/* Media Options Section */}
              <View style={styles.screenshotUploadMediaSectionImproved}>
                <View style={styles.screenshotUploadSectionTitleRow}>
                  {/* Use a target icon for Quick Capture if available, else AwardIcon */}
                  <AwardIcon size={22} color="#fff" />
                  <Text style={styles.screenshotUploadSectionTitle}>Quick Capture</Text>
                </View>
                <View style={styles.screenshotUploadMediaButtonsImproved}>
                  <TouchableOpacity 
                    style={styles.screenshotUploadMediaButtonImproved} 
                    onPress={handlePickImage}
                    activeOpacity={0.8}
                  >
                    <View style={styles.screenshotUploadMediaIconContainerWhite}>
                      <CameraIcon size={32} color="#58CC67" />
                    </View>
                    <Text style={styles.screenshotUploadMediaButtonText}>Photo</Text>
                    <Text style={styles.screenshotUploadMediaButtonSubtext}>Take a picture</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.screenshotUploadMediaButtonImproved} 
                    onPress={handlePickImage}
                    activeOpacity={0.8}
                  >
                    <View style={styles.screenshotUploadMediaIconContainerWhite}>
                      <UploadIcon size={32} color="#3AB1FF" />
                    </View>
                    <Text style={styles.screenshotUploadMediaButtonText}>Upload</Text>
                    <Text style={styles.screenshotUploadMediaButtonSubtext}>Choose photo</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.screenshotUploadMediaButtonImproved} 
                    onPress={handleVoiceRecord}
                    activeOpacity={0.8}
                  >
                    <View style={styles.screenshotUploadMediaIconContainerWhite}>
                      <MicIcon size={32} color="#7C3AED" />
                    </View>
                    <Text style={styles.screenshotUploadMediaButtonText}>Voice</Text>
                    <Text style={styles.screenshotUploadMediaButtonSubtext}>Record audio</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Image Preview */}
              {image && (
                <View style={styles.screenshotUploadImagePreview}>
                  <View style={styles.screenshotUploadPreviewHeader}>
                    <View style={styles.screenshotUploadPreviewIconContainer}>
                      <CameraIcon size={20} color="#58CC67" />
                    </View>
                    <Text style={styles.screenshotUploadPreviewTitle}>Image Ready</Text>
                  </View>
                  <Image source={{ uri: image }} style={styles.screenshotUploadPreviewImage} />
                  <Text style={styles.screenshotUploadPreviewText}>✅ Image uploaded successfully!</Text>
                </View>
              )}
            </View>
          </View>
          
          {/* Generate Button - always enabled with demo content */}
          <TouchableOpacity 
            style={styles.generateReviewPillButton}
            onPress={handleTextSubmit}
            activeOpacity={0.92}
          >
            <LinearGradient
              colors={['#815BFF', '#BD8CFF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.generateReviewPillGradient}
            >
              <View style={styles.generateReviewPillContent}>
                <MagicWandIcon size={18} color="#fff" />
                <Text style={styles.generateReviewPillText}>GENERATE AI REVIEW</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );

  // Onboarding data
  const languages = [
    { id: 'spanish', name: 'Spanish', flag: '🇪🇸', description: 'Most popular choice' },
    { id: 'french', name: 'French', flag: '🇫🇷', description: 'Romance language' },
    { id: 'german', name: 'German', flag: '🇩🇪', description: 'Logical structure' },
    { id: 'italian', name: 'Italian', flag: '🇮🇹', description: 'Beautiful sounds' }
  ];

  const learningStyles = [
    {
      id: 'games',
      title: 'Interactive Games',
      description: 'Learn through fun challenges and quizzes',
      icon: '🎮',
      color: '#FF6B6B'
    },
    {
      id: 'ai_chat',
      title: 'AI Conversations',
      description: 'Practice with our AI language partner',
      icon: '🤖',
      color: '#4ECDC4'
    },
    {
      id: 'flashcards',
      title: 'Flashcards & Drills',
      description: 'Traditional study with smart repetition',
      icon: '📚',
      color: '#45B7D1'
    },
    {
      id: 'mixed',
      title: 'Mixed Approach',
      description: 'A bit of everything for maximum learning',
      icon: '🎯',
      color: '#96CEB4'
    }
  ];

  // Onboarding Screen 1: Welcome & Language Selection
  const OnboardingWelcome = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.onboardingContainer}>
          {/* Header */}
          <View style={styles.onboardingHeader}>
            <Image 
              source={require('./assets/polytalk-logo.png')} 
              style={styles.onboardingLogo}
              resizeMode="contain"
            />
            <Text style={styles.onboardingTitle}>Welcome to PolyTalk</Text>
            <Text style={styles.onboardingSubtitle}>AI-powered language learning for university students</Text>
          </View>

          {/* Language Selection */}
          <View style={styles.onboardingContent}>
            <Text style={styles.onboardingSectionTitle}>Choose your language</Text>
            <View style={styles.languageGrid}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.id}
                  style={[
                    styles.languageCard,
                    selectedLanguage === language.id && styles.languageCardSelected
                  ]}
                  onPress={() => {
                    setSelectedLanguage(language.id);
                    setOnboardingStep(1);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={
                      selectedLanguage === language.id 
                        ? ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.1)']
                        : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']
                    }
                    style={styles.languageCardGradient}
                  >
                    <Text style={styles.languageFlag}>{language.flag}</Text>
                    <Text style={styles.languageName}>{language.name}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // Onboarding Screen 2: Learning Style Selection
  const OnboardingLearningStyle = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.onboardingContainer}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.onboardingBackButton}
            onPress={() => setOnboardingStep(0)}
          >
            <BackArrowIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.onboardingHeader}>
            <Text style={styles.onboardingTitle}>How do you learn best?</Text>
            <Text style={styles.onboardingSubtitle}>We'll personalize your experience based on your preference</Text>
          </View>

          {/* Learning Style Selection */}
          <View style={styles.onboardingContent}>
            <View style={styles.learningStyleGrid2x2}>
              {learningStyles.map((style) => (
                <TouchableOpacity
                  key={style.id}
                  style={[
                    styles.learningStyleCard2x2,
                    learningStyle === style.id && styles.learningStyleCardSelected
                  ]}
                  onPress={() => setLearningStyle(style.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={
                      learningStyle === style.id 
                        ? [`${style.color}30`, `${style.color}10`]
                        : ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']
                    }
                    style={styles.learningStyleCardGradient2x2}
                  >
                    <View style={[styles.learningStyleIcon2x2, { backgroundColor: style.color }]}>
                      <Text style={styles.learningStyleIconText}>{style.icon}</Text>
                    </View>
                    <Text style={styles.learningStyleTitle2x2}>{style.title}</Text>
                    <Text style={styles.learningStyleDescription2x2}>{style.description}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[styles.onboardingButton, !learningStyle && styles.onboardingButtonDisabled]}
            onPress={() => learningStyle && setOnboardingStep(2)}
            disabled={!learningStyle}
            activeOpacity={learningStyle ? 0.9 : 1}
          >
            <LinearGradient
              colors={learningStyle ? ['#58CC67', '#42B883'] : ['rgba(150,150,150,0.4)', 'rgba(120,120,120,0.3)']}
              style={styles.onboardingButtonGradient}
            >
              <Text style={[styles.onboardingButtonText, !learningStyle && styles.onboardingButtonTextDisabled]}>
                Set My Learning Style
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // Onboarding Screen 3: Quick Setup
  const OnboardingSetup = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.onboardingContainer}>
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.onboardingBackButton}
            onPress={() => setOnboardingStep(1)}
          >
            <BackArrowIcon size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.onboardingHeader}>
            <Text style={styles.onboardingTitle}>Almost ready!</Text>
            <Text style={styles.onboardingSubtitle}>Here's what you can do with PolyTalk</Text>
          </View>

          {/* Features */}
          <View style={styles.onboardingContent}>
            <View style={styles.featuresGrid}>
              <View style={styles.featureCard}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.featureCardGradient}
                >
                  <Text style={styles.featureTitle}>Upload & Review</Text>
                  <Text style={styles.featureDescription}>Get AI-powered reviews of your notes and materials</Text>
                </LinearGradient>
              </View>
              
              <View style={styles.featureCard}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.featureCardGradient}
                >
                  <Text style={styles.featureTitle}>Track Progress</Text>
                  <Text style={styles.featureDescription}>Monitor your learning with detailed analytics</Text>
                </LinearGradient>
              </View>
              
              <View style={styles.featureCard}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.featureCardGradient}
                >
                  <Text style={styles.featureTitle}>Textbook Aligned</Text>
                  <Text style={styles.featureDescription}>Connect with your course curriculum</Text>
                </LinearGradient>
              </View>
            </View>

            {/* Name Display */}
            <View style={styles.nameInputContainer}>
              <Text style={styles.nameInputLabel}>What should we call you?</Text>
              <View style={styles.nameDisplayWrapper}>
                <Text style={styles.nameDisplay}>Zander</Text>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={styles.onboardingButton}
            onPress={() => setOnboardingStep(3)}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#58CC67', '#42B883']}
              style={styles.onboardingButtonGradient}
            >
              <Text style={styles.onboardingButtonText}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // Onboarding Screen 4: Success
  const OnboardingSuccess = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.onboardingContainer}>
          {/* Success Animation */}
          <View style={styles.successHeader}>
            <View style={styles.successIcon}>
              <Text style={styles.successEmoji}>🎉</Text>
            </View>
            <Text style={styles.onboardingTitle}>You're all set!</Text>
            <Text style={styles.onboardingSubtitle}>
              {userName ? `Welcome ${userName}! ` : 'Welcome! '}
              Your personalized learning experience is ready.
            </Text>
          </View>

          {/* Learning Style Summary */}
          <View style={styles.onboardingContent}>
            <View style={styles.summaryCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                style={styles.summaryCardGradient}
              >
                <Text style={styles.summaryTitle}>Your Learning Style</Text>
                {(() => {
                  const selectedStyle = learningStyles.find(style => style.id === learningStyle);
                  return (
                    <View style={styles.summaryStyle}>
                      <View style={[styles.summaryStyleIcon, { backgroundColor: selectedStyle?.color }]}>
                        <Text style={styles.summaryStyleIconText}>{selectedStyle?.icon}</Text>
                      </View>
                      <View style={styles.summaryStyleContent}>
                        <Text style={styles.summaryStyleTitle}>{selectedStyle?.title}</Text>
                        <Text style={styles.summaryStyleDescription}>{selectedStyle?.description}</Text>
                      </View>
                    </View>
                  );
                })()}
              </LinearGradient>
            </View>
          </View>

          {/* Start Learning Button */}
          <TouchableOpacity
            style={styles.onboardingButton}
            onPress={() => {
              setShowOnboarding(false);
              setShowSplash(false);
            }}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#58CC67', '#42B883']}
              style={styles.onboardingButtonGradient}
            >
              <View style={styles.startLearningButtonContent}>
                <RocketIcon size={20} color="#FFFFFF" />
                <Text style={styles.onboardingButtonText}>Start Learning</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const ReviewScreen = () => {
    const lessonActivities = [
      {
        id: 1,
        type: 'listening',
        title: 'Listen & Repeat',
        description: 'Practice pronunciation',
        icon: '🎧',
        color: '#FF6B6B',
        duration: '3 min',
        completed: false
      },
      {
        id: 2,
        type: 'flashcards',
        title: 'Vocabulary Cards',
        description: 'Learn new words',
        icon: '📚',
        color: '#4ECDC4',
        duration: '5 min',
        completed: false
      },
      {
        id: 3,
        type: 'construction',
        title: 'Build Sentences',
        description: 'Drag words to form sentences',
        icon: '🔧',
        color: '#45B7D1',
        duration: '4 min',
        completed: false
      },
      {
        id: 4,
        type: 'matching',
        title: 'Match Game',
        description: 'Connect words with meanings',
        icon: '🎯',
        color: '#96CEB4',
        duration: '3 min',
        completed: false
      },
      {
        id: 5,
        type: 'speaking',
        title: 'Speaking Practice',
        description: 'Record and compare',
        icon: '🎤',
        color: '#FF9F43',
        duration: '6 min',
        completed: false
      },
      {
        id: 6,
        type: 'quiz',
        title: 'Practice Quiz',
        description: 'Test your knowledge',
        icon: '🏆',
        color: '#DDA0DD',
        duration: '8 min',
        completed: false
      }
    ];

    return (
      <LinearGradient
        colors={['#58CC67', '#3AB1FF', '#7C3AED']}
        locations={[0, 0.5, 1]}
        style={styles.gradientContainer}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.lessonScreenContainer} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.lessonHeader}>
              <TouchableOpacity 
                onPress={() => animateToScreen('upload')}
                style={styles.lessonBackButton}
              >
                <BackArrowIcon size={24} color="#FFFFFF" />
              </TouchableOpacity>
              
              <View style={styles.lessonHeaderContent}>
                <Text style={styles.lessonTitle}>AR Verbs Lesson</Text>
                <Text style={styles.lessonSubtitle}>Present Tense Conjugations</Text>
              </View>
              
              <View style={styles.lessonProgress}>
                <Text style={styles.lessonProgressText}>0/6</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: '0%' }]} />
              </View>
              <Text style={styles.progressBarLabel}>Complete all activities to master this lesson</Text>
            </View>
            
            {/* Activities Grid */}
            <View style={styles.activitiesContainer}>
              <Text style={styles.activitiesTitle}>Learning Activities</Text>
              <View style={styles.activitiesGrid}>
                {lessonActivities.map((activity, index) => (
                  <TouchableOpacity
                    key={activity.id}
                    style={styles.activityCard}
                    onPress={() => {
                      if (activity.type === 'quiz') {
                        animateToScreen('quiz');
                      } else {
                        console.log(`Starting ${activity.type} activity`);
                      }
                    }}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={[
                        `${activity.color}20`,
                        `${activity.color}10`,
                        `${activity.color}05`
                      ]}
                      style={styles.activityCardGradient}
                    >
                      {/* Activity Number */}
                      <View style={[styles.activityNumber, { backgroundColor: activity.color }]}>
                        <Text style={styles.activityNumberText}>{index + 1}</Text>
                      </View>
                      
                      {/* Activity Icon */}
                      <View style={styles.activityIconContainer}>
                        <Text style={styles.activityIcon}>{activity.icon}</Text>
                      </View>
                      
                      {/* Activity Content */}
                      <View style={styles.activityContent}>
                        <Text style={styles.activityTitle}>{activity.title}</Text>
                        <Text style={styles.activityDescription}>{activity.description}</Text>
                        <View style={styles.activityMeta}>
                          <Text style={styles.activityDuration}>{activity.duration}</Text>
                          {activity.completed && (
                            <View style={styles.completedBadge}>
                              <Text style={styles.completedBadgeText}>✓</Text>
                            </View>
                          )}
                        </View>
                      </View>
                      
                      {/* Activity Arrow */}
                      <View style={styles.activityArrow}>
                        <Text style={styles.activityArrowText}>›</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* AI Context Card */}
            <View style={styles.aiContextCard}>
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']}
                style={styles.aiContextGradient}
              >
                <View style={styles.aiContextHeader}>
                  <View style={styles.aiContextIconContainer}>
                    <Text style={styles.aiContextIcon}>🧠</Text>
                  </View>
                  <Text style={styles.aiContextTitle}>AI Learning Context</Text>
                </View>
                
                <Text style={styles.aiContextText}>
                  Based on your notes about AR verb conjugations, I've created this personalized lesson path. 
                  Each activity builds on the previous one to help you master present tense endings: 
                  -o, -as, -a, -amos, -áis, -an.
                </Text>
                
                <View style={styles.aiContextMeta}>
                  <Text style={styles.aiContextMetaText}>📚 Aligned with {selectedTextbook}</Text>
                  <Text style={styles.aiContextMetaText}>📄 Page {selectedPage}</Text>
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    );
  };

  const QuizScreen = () => (
    <LinearGradient
      colors={['#58CC67', '#3AB1FF', '#7C3AED']}
      locations={[0, 0.5, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.quizContainer}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => animateToScreen('review')}>
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
          onPress={() => animateToScreen('progress')}
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
      style={styles.gradientContainer}
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
              onPress={() => animateToScreen('home', 'profile')}
              style={styles.progressBackButton}
            >
              <BackArrowIcon size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          {/* League Status - Absolute positioned like GameModeScreen */}
          <View style={styles.progressLeagueStatusContainer}>
            <View style={styles.leagueStatusPill}>
              <CrownIcon size={20} color="#FFD700" />
              <Text style={styles.leagueStatusText}>Gold Status</Text>
            </View>
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

          {/* Stats Row - Under Profile */}
          <View style={styles.gradientStatsSection}>
            <View style={styles.gradientStatsRow}>
              <TouchableOpacity 
                style={[
                  styles.gradientStatItem,
                  pressedStat === 'courses' && styles.gradientStatItemPressed
                ]}
                onPressIn={() => handleStatPress('courses')}
                onPressOut={handleStatPressOut}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.gradientStatIconCircle,
                  pressedStat === 'courses' && styles.gradientStatIconCirclePressed
                ]}>
                  <BookIcon size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.gradientStatValue}>4</Text>
                <Text style={styles.gradientStatLabel}>Courses</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.gradientStatItem,
                  pressedStat === 'streak' && styles.gradientStatItemPressed
                ]}
                onPressIn={() => handleStatPress('streak')}
                onPressOut={handleStatPressOut}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.gradientStatIconCircle,
                  pressedStat === 'streak' && styles.gradientStatIconCirclePressed
                ]}>
                  <FireIcon size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.gradientStatValue}>23</Text>
                <Text style={styles.gradientStatLabel}>Streak</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[
                  styles.gradientStatItem,
                  pressedStat === 'friends' && styles.gradientStatItemPressed
                ]}
                onPressIn={() => handleStatPress('friends')}
                onPressOut={handleStatPressOut}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.gradientStatIconCircle,
                  pressedStat === 'friends' && styles.gradientStatIconCirclePressed
                ]}>
                  <AwardIcon size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.gradientStatValue}>8</Text>
                <Text style={styles.gradientStatLabel}>Rank</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.gradientStatItem,
                  pressedStat === 'badges' && styles.gradientStatItemPressed
                ]}
                onPressIn={() => handleStatPress('badges')}
                onPressOut={handleStatPressOut}
                activeOpacity={0.8}
              >
                <View style={[
                  styles.gradientStatIconCircle,
                  pressedStat === 'badges' && styles.gradientStatIconCirclePressed
                ]}>
                  <AwardIcon size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.gradientStatValue}>12</Text>
                <Text style={styles.gradientStatLabel}>Badges</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Learning Style Display */}
          {learningStyle && (
            <View style={styles.learningStyleSection}>
              <TouchableOpacity 
                style={styles.learningStyleDisplay}
                onPress={() => {
                  // Add modal to change learning style
                  console.log('Change learning style');
                }}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']}
                  style={styles.learningStyleDisplayGradient}
                >
                  {/* Header Section */}
                  <View style={styles.learningStyleHeader}>
                    <Text style={styles.learningStyleSectionTitle}>Your Learning Style</Text>
                    <Text style={styles.learningStyleDisplayArrow}>›</Text>
                  </View>
                  
                  {/* Content Section */}
                  {(() => {
                    const selectedStyle = learningStyles.find(style => style.id === learningStyle);
                    return (
                      <View style={styles.learningStyleContentRow}>
                        <View style={[styles.learningStyleDisplayIcon, { backgroundColor: selectedStyle?.color }]}>
                          <Text style={styles.learningStyleDisplayIconText}>{selectedStyle?.icon}</Text>
                        </View>
                        <View style={styles.learningStyleDisplayContent}>
                          <Text style={styles.learningStyleDisplayTitle}>{selectedStyle?.title}</Text>
                          <Text style={styles.learningStyleDisplayDescription}>{selectedStyle?.description}</Text>
                        </View>
                      </View>
                    );
                  })()}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {/* Languages Being Studied */}
          <View style={styles.profileSection}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']}
              style={styles.profileCardGradient}
            >
              {userProfile.languages.map((language) => (
                <View key={language.id} style={styles.languageItem}>
                  <View style={[styles.languageIconContainer, { backgroundColor: '#3AB1FF' }]}>
                    <Text style={styles.languageFlag}>{language.flag}</Text>
                  </View>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageProficiency}>{language.proficiency} • {language.region}</Text>
                    <View style={styles.languageProgressContainer}>
                      <View style={styles.languageProgressTrack}>
                        <View style={[
                          styles.languageProgressFill, 
                          { width: `${language.progress}%` }
                        ]} />
                      </View>
                      <Text style={styles.languageProgressText}>{language.progress}%</Text>
                    </View>
                  </View>
                </View>
              ))}
            </LinearGradient>
          </View>

          {/* Books Enrolled */}
          <View style={styles.profileSection}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']}
              style={styles.profileCardGradient}
            >
              {userProfile.books.map((book) => (
                <View key={book.id} style={styles.bookItem}>
                  <View style={styles.bookCoverContainer}>
                    <Text style={styles.bookCover}>{book.cover}</Text>
                  </View>
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle}>{book.title}</Text>
                    <Text style={styles.bookAuthor}>by {book.author}</Text>
                    <View style={styles.bookProgressContainer}>
                      <View style={styles.bookProgressTrack}>
                        <View style={[
                          styles.bookProgressFill, 
                          { width: `${book.progress}%` }
                        ]} />
                      </View>
                      <Text style={styles.bookProgressText}>{book.progress}%</Text>
                    </View>
                  </View>
                </View>
              ))}
            </LinearGradient>
          </View>

          {/* Today's Quest Progress */}
          <View style={styles.profileSection}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.08)']}
              style={styles.profileCardGradient}
            >
              <Text style={styles.profileSectionTitle}>Today's Quest Progress</Text>
                <View style={styles.profileQuestList}>
                  {dailyQuests.slice(0, 3).map((quest) => (
                    <View key={quest.id} style={styles.profileQuestItem}>
                      <View style={[styles.profileQuestIcon, { backgroundColor: quest.color }]}>
                        <Text style={styles.profileQuestIconText}>{quest.icon}</Text>
                      </View>
                      <View style={styles.profileQuestDetails}>
                        <Text style={styles.profileQuestName}>{quest.title}</Text>
                        <View style={styles.profileQuestProgressContainer}>
                          <View style={styles.profileQuestProgressTrack}>
                            <View style={[
                              styles.profileQuestProgressFill, 
                              { 
                                width: `${(quest.progress / quest.maxProgress) * 100}%`,
                                backgroundColor: quest.color
                              }
                            ]} />
                          </View>
                          <Text style={styles.profileQuestProgressText}>
                            {quest.progress}/{quest.maxProgress}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.profileQuestStatus}>
                        {quest.status === 'claimed' ? (
                          <Text style={styles.profileQuestStatusIcon}>✅</Text>
                        ) : quest.status === 'completed' ? (
                          <Text style={styles.profileQuestStatusIcon}>🏆</Text>
                        ) : null}
                      </View>
                    </View>
                  ))}
                </View>
              </LinearGradient>
          </View>

          {/* Textbook Settings Section */}
          <View style={styles.textbookSettingsSection}>
            <View style={styles.textbookSettingsCard}>
              <View style={styles.textbookHeader}>
                <View style={styles.textbookIconContainer}>
                  <Text style={styles.textbookIcon}>📚</Text>
                </View>
                <View style={styles.textbookHeaderContent}>
                  <Text style={styles.textbookHeaderTitle}>Textbook Integration</Text>
                  <Text style={styles.textbookHeaderSubtitle}>Link your class textbook for aligned lessons</Text>
                </View>
                <TouchableOpacity 
                  style={[styles.textbookToggle, textbookLinked && styles.textbookToggleActive]}
                  onPress={() => setTextbookLinked(!textbookLinked)}
                >
                  <Text style={[styles.textbookToggleText, textbookLinked && styles.textbookToggleTextActive]}>
                    {textbookLinked ? '✓' : '○'}
                  </Text>
                </TouchableOpacity>
              </View>
              
              {textbookLinked && (
                <View style={styles.textbookContent}>
                  <View style={styles.selectedTextbook}>
                    <Text style={styles.textbookTitle}>{selectedTextbook}</Text>
                    <Text style={styles.textbookPage}>Page {selectedPage}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.changeTextbookButton}
                    onPress={() => setShowTextbookModal(true)}
                  >
                    <Text style={styles.changeTextbookText}>Change Textbook</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
      
      {/* Leaderboard Modal */}
      <LeaderboardModal 
        visible={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        leaderboardData={leaderboardData}
      />
      
      {/* Achievements Modal */}
      <AchievementsModal 
        visible={showAchievementsModal}
        onClose={() => setShowAchievementsModal(false)}
        achievementsData={achievementsData}
      />
      
      {/* Learning Path Modal */}
      <LearningPathModal 
        visible={showLearningPath}
        onClose={() => setShowLearningPath(false)}
        learningPathData={learningPathData}
      />
      
      {/* Streak Modal */}
      <StreakModal 
        visible={showStreakModal}
        onClose={() => setShowStreakModal(false)}
        streakData={streakData}
      />
      
      {/* Textbook Selection Modal */}
      {/* Textbook Modal */}
      <TextbookModal 
        visible={showTextbookModal}
        onClose={() => setShowTextbookModal(false)}
        selectedTextbook={selectedTextbook}
        setSelectedTextbook={setSelectedTextbook}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        textbooks={textbooks}
      />
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      {showOnboarding ? (
        <>
          {onboardingStep === 0 && <OnboardingWelcome />}
          {onboardingStep === 1 && <OnboardingLearningStyle />}
          {onboardingStep === 2 && <OnboardingSetup />}
          {onboardingStep === 3 && <OnboardingSuccess />}
        </>
      ) : showSplash ? (
        <>
          <SplashScreen />
          {/* Pre-render main screen for slide-up animation */}
          <Animated.View 
            style={[
              styles.mainScreenContainer,
              {
                transform: [{ translateY: mainScreenSlideUp }],
              },
            ]}
          >
            {screen === 'home' && <HomeScreen />}
            {/* GameModeScreen removed - going directly to lesson */}
            {screen === 'upload' && <UploadScreen />}
            {screen === 'review' && <ReviewScreen />}
            {screen === 'quiz' && <QuizScreen />}
            {screen === 'progress' && <ProgressScreen />}
          </Animated.View>
        </>
      ) : (
        <>
          {/* Animated screen container */}
          <Animated.View 
            style={[
              styles.screenContainer,
              {
                transform: [
                  { translateX: screenTransitionX },
                  { scale: screenScale }
                ],
                opacity: screenOpacity,
              },
            ]}
          >
            {screen === 'home' && <HomeScreen />}
            {/* GameModeScreen removed - going directly to lesson */}
            {screen === 'upload' && <UploadScreen />}
            {screen === 'review' && <ReviewScreen />}
            {screen === 'quiz' && <QuizScreen />}
            {screen === 'progress' && <ProgressScreen />}
          </Animated.View>
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
  // Lesson Screen Styles - Duolingo-inspired Design
  lessonScreenContainer: {
    flexGrow: 1,
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  lessonBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  lessonHeaderContent: {
    flex: 1,
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  lessonSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lessonProgress: {
    width: 52,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lessonProgressText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    letterSpacing: 0.5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  progressBarContainer: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#58CC67',
    borderRadius: 4,
  },
  progressBarLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  activitiesContainer: {
    marginBottom: 24,
  },
  activitiesTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  activitiesGrid: {
    gap: 12,
  },
  activityCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  activityCardGradient: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  activityNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  activityIconContainer: {
    marginRight: 16,
  },
  activityIcon: {
    fontSize: 24,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  activityDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  completedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#58CC67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedBadgeText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  activityArrow: {
    marginLeft: 12,
  },
  activityArrowText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '300',
  },
  aiContextCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  aiContextGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  aiContextHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiContextIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  aiContextIcon: {
    fontSize: 20,
  },
  aiContextTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  aiContextText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  aiContextMeta: {
    gap: 4,
  },
  aiContextMetaText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Onboarding Styles
  onboardingContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  onboardingBackButton: {
    position: 'absolute',
    top: 40,
    left: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  onboardingHeader: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60,
  },
  onboardingLogo: {
    width: 80,
    height: 80,
    marginBottom: 24,
  },
  onboardingTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  onboardingSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  onboardingContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  onboardingSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },

  // Language Selection - 2x2 Grid
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
    paddingHorizontal: 4,
  },
  languageCard: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  languageCardSelected: {
    shadowOpacity: 0.2,
    elevation: 8,
  },
  languageCardGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    minHeight: 100,
  },
  languageFlag: {
    fontSize: 32,
    marginBottom: 8,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Learning Style Selection - 2x2 Grid
  learningStyleGrid2x2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
    marginBottom: 40,
  },
  learningStyleCard2x2: {
    width: '48%',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  learningStyleCardSelected: {
    shadowOpacity: 0.2,
    elevation: 8,
  },
  learningStyleCardGradient2x2: {
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    minHeight: 140,
    justifyContent: 'center',
  },
  learningStyleIcon2x2: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  learningStyleIconText: {
    fontSize: 20,
  },
  learningStyleTitle2x2: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  learningStyleDescription2x2: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 14,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Features Grid
  featuresGrid: {
    gap: 16,
    marginBottom: 32,
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureCardGradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    marginLeft: 16,
    flex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  featureDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 16,
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Name Input
  nameInputContainer: {
    marginBottom: 24,
  },
  nameInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  nameDisplayWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameDisplay: {
    padding: 16,
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Success Screen
  successHeader: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 60,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successEmoji: {
    fontSize: 48,
  },
  summaryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 32,
  },
  summaryCardGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  summaryStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryStyleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  summaryStyleIconText: {
    fontSize: 28,
  },
  summaryStyleContent: {
    flex: 1,
  },
  summaryStyleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  summaryStyleDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Onboarding Buttons
  onboardingButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  onboardingButtonDisabled: {
    shadowOpacity: 0.1,
    elevation: 2,
  },
  onboardingButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  onboardingButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  onboardingButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  startLearningButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },

  // Learning Style Display in Progress Screen
  learningStyleSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  learningStyleSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  learningStyleDisplay: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  learningStyleDisplayGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
  },
  learningStyleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  learningStyleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learningStyleHeaderIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  learningStyleHeaderEmoji: {
    fontSize: 16,
  },
  learningStyleContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  learningStyleDisplayIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  learningStyleDisplayIconText: {
    fontSize: 24,
  },
  learningStyleDisplayContent: {
    flex: 1,
  },
  learningStyleDisplayTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  learningStyleDisplayDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  learningStyleDisplayArrow: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '300',
    marginLeft: 12,
  },

  // Profile Section Styles
  profileSection: {
    marginHorizontal: 20,
    marginBottom: 32,
  },
  profileSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  profileSectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  profileSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  profileCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },

  // Language Profile Styles
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  languageProficiency: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  languageProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageProgressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginRight: 12,
  },
  languageProgressFill: {
    height: '100%',
    backgroundColor: '#3AB1FF',
    borderRadius: 3,
  },
  languageProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Book Profile Styles
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bookCoverContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  bookCover: {
    fontSize: 20,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  bookAuthor: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.7,
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  bookProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookProgressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginRight: 8,
  },
  bookProgressFill: {
    height: '100%',
    backgroundColor: '#58CC67',
    borderRadius: 2,
  },
  bookProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Region Profile Styles
  regionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  regionFlag: {
    fontSize: 24,
  },
  regionInfo: {
    flex: 1,
  },
  regionOrigin: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  regionLearning: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 3,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  regionTimezone: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.7,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  profileQuestHeader: {
    marginBottom: 16,
  },
  profileQuestTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  profileQuestSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  profileQuestList: {
    gap: 12,
  },
  profileQuestItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileQuestIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileQuestIconText: {
    fontSize: 16,
  },
  profileQuestDetails: {
    flex: 1,
    marginRight: 12,
  },
  profileQuestName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  profileQuestProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileQuestProgressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginRight: 8,
  },
  profileQuestProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  profileQuestProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  profileQuestStatus: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileQuestStatusIcon: {
    fontSize: 18,
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
  // Splash Screen Styles - Tinder-like Bold & Simple
  splashContainer: {
    flex: 1,
    position: 'relative',
  },
  splashGradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  splashGradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  splashContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  splashLogoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  splashMainLogo: {
    width: 120,
    height: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  splashTaglineContainer: {
    alignItems: 'center',
  },
  splashTaglineText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
    letterSpacing: 0.5,
  },
  mainScreenContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
  persistentGradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  screenContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  transparentScreenContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  
  // Daily Quest System Styles
  dailyQuestsContainer: {
    marginTop: 0,
    marginBottom: 20,
  },
  
  // Progress Summary Styles
  progressSummaryContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  progressSummaryGradient: {
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  progressSummaryHeader: {
    marginBottom: 16,
  },
  progressSummaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  progressSummarySubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  progressSummaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  progressStat: {
    alignItems: 'center',
    flex: 1,
  },
  progressStatIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  progressStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  progressStatLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  progressSummaryBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressSummaryTrack: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    marginRight: 12,
  },
  progressSummaryFill: {
    height: '100%',
    backgroundColor: '#58CC67',
    borderRadius: 4,
  },
  progressSummaryPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Quest Grid and Card Styles
  questGrid: {
    paddingHorizontal: 20,
    gap: 16,
  },
  questCard: {
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  questCardCompleted: {
    opacity: 0.7,
  },
  questCardGradient: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  questHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  questIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  questIcon: {
    fontSize: 24,
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  questTitleCompleted: {
    opacity: 0.6,
  },
  questDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  questDescriptionCompleted: {
    opacity: 0.5,
  },
  questCompletedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#58CC67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questCompletedBadgeText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  questProgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  questProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginRight: 12,
  },
  questProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  questProgressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  questProgressTextCompleted: {
    opacity: 0.5,
  },
  questFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questRewards: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questRewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  questRewardIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  questRewardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  questRewardTextCompleted: {
    opacity: 0.5,
  },
  questActionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  questActionButtonCompleted: {
    backgroundColor: '#9CA3AF',
  },
  questActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  questActionTextCompleted: {
    opacity: 0.8,
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
    marginLeft: 12,
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
    borderRadius: 20,
    padding: 18,
    height: 180,
    justifyContent: 'space-between',
  },
  lessonCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  lessonTypeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  lessonTypeText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
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
    color: '#FFFFFF',
    marginBottom: 6,
    lineHeight: 19,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lessonSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 8,
    fontStyle: 'italic',
    lineHeight: 17,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lessonDate: {
    fontSize: 11,
    color: '#FFFFFF',
    opacity: 0.7,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    marginRight: 8,
  },
  lessonProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
  },
  lessonProgressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.9,
    minWidth: 30,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  lastStudiedText: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.6,
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
  },
  progressBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressLeagueStatusContainer: {
    position: 'absolute',
    top: 56, // Same level as back button (32 + 24 = 56)
    right: 20,
    zIndex: 100,
  },
  leagueStatusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leagueStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  leagueStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
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
  // Interactive stat pressed states
  gradientStatItemPressed: {
    transform: [{ scale: 0.95 }],
  },
  gradientStatIconCirclePressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
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

  // Premium Upload Screen Styles
  premiumUploadContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  premiumUploadHeader: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  premiumBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumUploadTitleSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
    alignItems: 'center',
  },
  premiumUploadLogoContainer: {
    marginBottom: 16,
  },
  premiumUploadLogo: {
    width: 80,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  premiumUploadTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  premiumUploadSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  premiumUploadMainCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 16,
    overflow: 'hidden',
  },
  premiumUploadMainCardGradient: {
    padding: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  premiumUploadTextSection: {
    marginBottom: 24,
  },
  premiumUploadSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  premiumUploadTextInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 20,
    fontSize: 16,
    minHeight: 140,
    maxHeight: 200,
    textAlignVertical: 'top',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    color: '#1F2937',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  premiumUploadTextInputFocused: {
    borderColor: '#58CC67',
    backgroundColor: '#FFFFFF',
    shadowColor: '#58CC67',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  premiumUploadDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  premiumUploadDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  premiumUploadDividerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9CA3AF',
    marginHorizontal: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  premiumUploadMediaSection: {
    marginBottom: 0,
  },
  premiumUploadMediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  premiumUploadMediaButton: {
    flex: 1,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  premiumUploadMediaButtonGradient: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  premiumUploadMediaIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  premiumUploadMediaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  premiumUploadMediaButtonSubtext: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  premiumUploadImagePreview: {
    marginTop: 24,
    padding: 20,
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    alignItems: 'center',
  },
  premiumUploadPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumUploadPreviewIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(88, 204, 103, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  premiumUploadPreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#059669',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  premiumUploadPreviewImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumUploadPreviewText: {
    color: '#059669',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  premiumUploadGenerateButton: {
    marginHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  premiumUploadGenerateButtonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  premiumUploadGenerateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumUploadGenerateIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  premiumUploadGenerateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  premiumUploadDisabledButton: {
    shadowOpacity: 0.05,
    elevation: 2,
  },

  // Screenshot Upload Screen Styles
  screenshotUploadContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  screenshotUploadHeader: {
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  screenshotBackButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  screenshotUploadTitleSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  screenshotUploadTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  screenshotUploadSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  screenshotUploadMainCard: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  screenshotUploadMainCardContent: {
    padding: 24,
  },
  screenshotUploadTextSection: {
    marginBottom: 24,
  },
  screenshotUploadSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  screenshotUploadTextDisplayContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    minHeight: 120,
  },
  screenshotUploadDemoText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    opacity: 0.95,
  },
  // Textbook Integration Styles
  textbookSettingsSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  textbookSettingsCard: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
  },
  textbookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  textbookIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textbookIcon: {
    fontSize: 20,
  },
  textbookHeaderContent: {
    flex: 1,
  },
  textbookHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  textbookHeaderSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  textbookToggle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  textbookToggleActive: {
    backgroundColor: '#58CC67',
    borderColor: '#58CC67',
  },
  textbookToggleText: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.6,
  },
  textbookToggleTextActive: {
    opacity: 1,
    fontWeight: '600',
  },
  textbookContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
  },
  selectedTextbook: {
    marginBottom: 12,
  },
  textbookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  textbookChapter: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  textbookPage: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  changeTextbookButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  changeTextbookText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  screenshotUploadDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  screenshotUploadDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  screenshotUploadDividerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginHorizontal: 16,
    opacity: 0.8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  screenshotUploadMediaSection: {
    marginBottom: 0,
  },
  screenshotUploadMediaButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  screenshotUploadMediaButton: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 120,
  },
  screenshotUploadMediaIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  screenshotUploadMediaButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  screenshotUploadMediaButtonSubtext: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  screenshotUploadImagePreview: {
    marginTop: 24,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  screenshotUploadPreviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  screenshotUploadPreviewIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(88, 204, 103, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  screenshotUploadPreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  screenshotUploadPreviewImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  screenshotUploadPreviewText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  screenshotUploadGenerateButton: {
    marginHorizontal: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  screenshotUploadGenerateButtonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  screenshotUploadGenerateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenshotUploadGenerateButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  screenshotUploadDisabledButton: {
    shadowOpacity: 0.05,
    elevation: 2,
  },
  screenshotUploadLogoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  screenshotUploadLogo: {
    width: 56,
    height: 56,
    marginBottom: 0,
    opacity: 0.18,
  },
  screenshotUploadSectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  screenshotUploadHeaderFixed: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 0,
    backgroundColor: 'transparent',
  },
  screenshotBackButtonLarge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  screenshotUploadContainerImproved: {
    flexGrow: 1,
    paddingTop: 95,
    paddingBottom: 24,
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  screenshotUploadTitleSectionImproved: {
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 0,
  },
  screenshotUploadMainCardImproved: {
    marginHorizontal: 4,
    marginBottom: 14,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.13)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  screenshotUploadMainCardContentImproved: {
    padding: 22,
    paddingTop: 18,
    paddingBottom: 18,
  },
  screenshotUploadTextSectionImproved: {
    marginBottom: 14,
  },
  screenshotUploadDividerImproved: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
  },
  screenshotUploadMediaSectionImproved: {
    marginBottom: 0,
  },
  screenshotUploadMediaButtonsImproved: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 0,
    marginTop: 8,
    gap: 8,
  },
  screenshotUploadMediaButtonImproved: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 100,
    marginHorizontal: 2,
  },
  screenshotUploadMediaIconContainerFilled: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(88,204,103,0.13)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#58CC67',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  screenshotUploadMediaIconContainerFilledBlue: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(58,177,255,0.13)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#3AB1FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  screenshotUploadMediaIconContainerWhite: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  screenshotUploadGenerateButtonImproved: {
    marginHorizontal: 24,
    marginTop: 0,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  screenshotUploadGenerateButtonGradientImproved: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  generateReviewPillButton: {
    marginHorizontal: 16,
    marginTop: 0,
    borderRadius: 30,
    shadowColor: '#815BFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: 'visible',
  },
  generateReviewPillGradient: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  generateReviewPillContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  generateReviewPillText: {
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

  // Game Mode Screen Styles
  gameModeScreenContainer: {
    flexGrow: 1,
    paddingTop: 110,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  gameModeScreenTitleSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gameModeScreenTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  gameModeScreenSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Game Mode Carousel Styles
  gameModeCarouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  gameModeCarouselContent: {
    paddingHorizontal: 40,
  },
  gameModeCard: {
    width: width - 80,
    marginHorizontal: 0,
  },
  gameModeCardInner: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    minHeight: 320,
    justifyContent: 'center',
  },
  gameModeCardLocked: {
    opacity: 0.7,
  },
  gameModeCardLockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  gameModeCardLockIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  gameModeCardLockText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  gameModeCardProgressBar: {
    width: 120,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  gameModeCardProgressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  gameModeCardIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  gameModeCardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  gameModeCardDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  gameModeCardBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    position: 'absolute',
    top: 16,
    right: 16,
  },
  gameModeCardBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  gameModeCarouselPagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  gameModeCarouselDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  gameModeCarouselDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
    borderRadius: 4,
  },

  // League Status Styles (reused from existing implementation)
  leagueStatusContainer: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 100,
  },
  leagueStatusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  leagueStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 6,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Word Bank Section Styles
  wordBankContainer: {
    marginTop: 0,
    marginBottom: 40,
  },
  wordBankCardContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 24,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    justifyContent: 'space-between',
    minHeight: 200,
  },
  wordBankCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  wordBankCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wordBankCategoryText: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginLeft: 6,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  wordBankWord: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  wordBankTranslation: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.85,
    marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  wordBankExampleContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  wordBankExample: {
    fontSize: 15,
    color: '#FFFFFF',
    fontStyle: 'italic',
    marginBottom: 6,
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  wordBankExampleTranslation: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.75,
    fontStyle: 'italic',
    lineHeight: 20,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  wordBankFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  wordBankDate: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.6,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  wordBankDifficultyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  wordBankDifficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  wordBankDifficultyText: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '600',
    textTransform: 'capitalize',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Word Bank Pagination Dots
  wordBankActiveDot: {
    backgroundColor: '#FFFFFF',
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  wordBankInactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    opacity: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },

  // Friends Modal Styles
  friendsModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  friendsModalBackdrop: {
    flex: 1,
  },
  friendsModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  friendsModalGradient: {
    flex: 1,
    paddingTop: 24,
  },
  friendsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  friendsModalHeaderContent: {
    flex: 1,
  },
  friendsModalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  friendsModalSubtitle: {
    fontSize: 15,
    color: '#FFFFFF',
    opacity: 0.85,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  friendsModalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  friendsModalCloseText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  friendsModalList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  friendsModalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  friendsModalItemCurrent: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  friendsModalRankContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  friendsModalRankText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    textAlign: 'center',
  },
  friendsModalAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 16,
  },
  friendsModalAvatarCurrent: {
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  friendsModalInfo: {
    flex: 1,
  },
  friendsModalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  friendsModalNameCurrent: {
    color: '#FFD700',
    fontWeight: '700',
  },
  friendsModalStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendsModalStatItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  friendsModalStatLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  friendsModalStatValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Achievements Modal Styles
  achievementsModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  achievementsModalBackdrop: {
    flex: 1,
  },
  achievementsModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.8,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  achievementsModalGradient: {
    flex: 1,
    paddingTop: 24,
  },
  achievementsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  achievementsModalHeaderContent: {
    flex: 1,
  },
  achievementsModalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  achievementsModalSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  achievementsModalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  achievementsModalCloseText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  achievementsModalList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  achievementsModalSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  achievementsModalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  achievementsModalCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  achievementsModalCardInProgress: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  achievementsModalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementsModalIconContainerInProgress: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  achievementsModalIcon: {
    fontSize: 24,
  },
  achievementsModalIconInProgress: {
    fontSize: 24,
    opacity: 0.5,
  },
  achievementsModalCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  achievementsModalCardTitleInProgress: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.6,
    textAlign: 'center',
    marginBottom: 6,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  achievementsModalCardDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  achievementsModalCardDescriptionInProgress: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.5,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  achievementsModalCardDate: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.6,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  achievementsModalProgressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  achievementsModalProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    marginBottom: 6,
  },
  achievementsModalProgressFill: {
    height: '100%',
    backgroundColor: '#58CC67',
    borderRadius: 2,
  },
  achievementsModalProgressText: {
    fontSize: 10,
    color: '#FFFFFF',
    opacity: 0.8,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },

  // Learning Path Modal Styles
  learningPathModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  learningPathModalBackdrop: {
    flex: 1,
  },
  learningPathModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.85,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  learningPathModalGradient: {
    flex: 1,
    paddingTop: 24,
  },
  learningPathModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  learningPathModalHeaderContent: {
    flex: 1,
  },
  learningPathModalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  learningPathModalSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  learningPathModalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  learningPathModalCloseText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  learningPathModalList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  learningPathContainer: {
    paddingBottom: 24,
  },
  learningPathUnit: {
    marginBottom: 32,
  },
  learningPathUnitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  learningPathUnitIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  learningPathUnitIconText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  learningPathUnitInfo: {
    flex: 1,
  },
  learningPathUnitTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  learningPathUnitTitleLocked: {
    opacity: 0.5,
  },
  learningPathUnitProgress: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  learningPathUnitProgressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    marginBottom: 16,
  },
  learningPathUnitProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  learningPathLessons: {
    marginLeft: 24,
  },
  learningPathLesson: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  learningPathLessonIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  learningPathLessonIconText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  learningPathLessonInfo: {
    flex: 1,
  },
  learningPathLessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  learningPathLessonTitleLocked: {
    opacity: 0.5,
  },
  learningPathLessonXP: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
    opacity: 0.9,
  },
  learningPathCurrentIndicator: {
    backgroundColor: '#3AB1FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  learningPathCurrentText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  learningPathConnector: {
    width: 2,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginLeft: 23,
    marginTop: -16,
    marginBottom: 8,
  },
  
  // Streak Modal Styles
  streakModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  streakModalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  streakModalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '85%',
    backgroundColor: 'transparent',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  streakModalGradient: {
    flex: 1,
    paddingTop: 24,
  },
  streakModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  streakModalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  streakModalIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  streakModalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  streakModalCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
  streakModalCloseText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  streakStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  streakStatCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakStatNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  streakStatLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.8,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  recommendationsSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  recommendationsList: {
    maxHeight: 200,
  },
  recommendationCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  recommendationSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  recommendationMeta: {
    alignItems: 'flex-end',
  },
  recommendationTime: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  recommendationXP: {
    fontSize: 12,
    color: '#58CC67',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  recommendationDescription: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.7,
    lineHeight: 18,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  reviewRemindersSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  reviewRemindersTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  reviewRemindersSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  reviewItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  reviewItemCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewItemWord: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  reviewItemTranslation: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  reviewItemDue: {
    fontSize: 11,
    color: '#58CC67',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  viewAllReviewButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  viewAllReviewText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  
  // Textbook Modal Styles
  textbookModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  textbookModalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  textbookModalContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 16,
  },
  textbookModalGradient: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 32,
    minHeight: 500,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textbookModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  textbookModalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  textbookModalIcon: {
    fontSize: 24,
  },
  textbookModalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Display' : 'Roboto',
  },
  textbookModalSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'SF Pro Text' : 'Roboto',
  },
  textbookModalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textbookModalCloseText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -2,
  },
  currentSelectionCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  currentSelectionHeader: {
    marginBottom: 12,
  },
  currentSelectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  currentSelectionBook: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  pageIndicator: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pageIndicatorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  quickSelectContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  textbookGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  textbookGridItem: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
  },
  textbookGridGradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 16,
  },
  textbookGridGradientSelected: {
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  textbookGridNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  textbookGridNumberSelected: {
    fontWeight: '800',
  },
  textbookGridSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  textbookGridSubtitleSelected: {
    fontWeight: '600',
    color: 'rgba(255,255,255,0.95)',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  selectedIndicatorText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#667eea',
  },
  actionButtonsContainer: {
    marginBottom: 28,
  },
  actionButtonsGrid: {
    gap: 10,
  },
  compactActionButton: {
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  compactActionGradient: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  compactActionIcon: {
    fontSize: 18,
  },
  compactActionTextContainer: {
    flex: 1,
  },
  compactActionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  compactActionSubtext: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
