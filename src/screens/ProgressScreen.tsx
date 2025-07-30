import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  BackArrowIcon,
  BookIcon,
  FireIcon,
  AwardIcon,
  CrownIcon,
} from '../components/icons';
import { useModalState } from '../hooks/useModalState';
import { useDataState } from '../hooks/useDataState';
import { useQuestState } from '../hooks/useQuestState';

interface ProgressScreenProps {
  animateToScreen: (targetScreen: string, transitionType?: string) => void;
  handleStatPress: (statType: string) => void;
  handleStatPressOut: () => void;
  pressedStat: string | null;
  learningStyle: string | null;
  textbookLinked: boolean;
  setTextbookLinked: (linked: boolean) => void;
  selectedTextbook: string;
  selectedPage: number;
  setSelectedTextbook: (textbook: string) => void;
  setSelectedPage: (page: number) => void;
}

const ProgressScreen: React.FC<ProgressScreenProps> = ({
  animateToScreen,
  handleStatPress,
  handleStatPressOut,
  pressedStat,
  learningStyle,
  textbookLinked,
  setTextbookLinked,
  selectedTextbook,
  selectedPage,
  setSelectedTextbook,
  setSelectedPage,
}) => {
  const {
    showLeaderboardModal,
    showAchievementsModal,
    showLearningPath,
    showStreakModal,
    showTextbookModal,
    setShowLeaderboardModal,
    setShowAchievementsModal,
    setShowLearningPath,
    setShowStreakModal,
    setShowTextbookModal,
  } = useModalState();

  const {
    userProfile,
    learningStyles,
    leaderboardData,
    achievementsData,
    learningPathData,
    streakData,
    textbooks,
  } = useDataState();

  const { dailyQuestsState } = useQuestState();
  return (
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
            <Image source={require('../../assets/zander.jpg')} style={styles.centeredAvatar} />
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
                  {dailyQuestsState.slice(0, 3).map((quest) => (
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
      {/* Note: Modal components will be handled by the parent App component */}
    </LinearGradient>
  );
};

// Import styles from the main App.js file
// These styles will need to be extracted to a separate styles file
const styles = {
  // Add placeholder styles - these will be extracted from App.js
  gradientContainer: {},
  safeArea: {},
  progressScrollContainer: {},
  progressHeader: {},
  progressBackButton: {},
  progressLeagueStatusContainer: {},
  leagueStatusPill: {},
  leagueStatusText: {},
  gradientGreetingSection: {},
  gradientGreetingText: {},
  gradientGreetingSubtext: {},
  centeredAvatarSection: {},
  centeredAvatar: {},
  gradientStatsSection: {},
  gradientStatsRow: {},
  gradientStatItem: {},
  gradientStatItemPressed: {},
  gradientStatIconCircle: {},
  gradientStatIconCirclePressed: {},
  gradientStatValue: {},
  gradientStatLabel: {},
  learningStyleSection: {},
  learningStyleDisplay: {},
  learningStyleDisplayGradient: {},
  learningStyleHeader: {},
  learningStyleSectionTitle: {},
  learningStyleDisplayArrow: {},
  learningStyleContentRow: {},
  learningStyleDisplayIcon: {},
  learningStyleDisplayIconText: {},
  learningStyleDisplayContent: {},
  learningStyleDisplayTitle: {},
  learningStyleDisplayDescription: {},
  profileSection: {},
  profileCardGradient: {},
  languageItem: {},
  languageIconContainer: {},
  languageFlag: {},
  languageInfo: {},
  languageName: {},
  languageProficiency: {},
  languageProgressContainer: {},
  languageProgressTrack: {},
  languageProgressFill: {},
  languageProgressText: {},
  bookItem: {},
  bookCoverContainer: {},
  bookCover: {},
  bookInfo: {},
  bookTitle: {},
  bookAuthor: {},
  bookProgressContainer: {},
  bookProgressTrack: {},
  bookProgressFill: {},
  bookProgressText: {},
  profileSectionTitle: {},
  profileQuestList: {},
  profileQuestItem: {},
  profileQuestIcon: {},
  profileQuestIconText: {},
  profileQuestDetails: {},
  profileQuestName: {},
  profileQuestProgressContainer: {},
  profileQuestProgressTrack: {},
  profileQuestProgressFill: {},
  profileQuestProgressText: {},
  profileQuestStatus: {},
  profileQuestStatusIcon: {},
  textbookSettingsSection: {},
  textbookSettingsCard: {},
  textbookHeader: {},
  textbookIconContainer: {},
  textbookIcon: {},
  textbookHeaderContent: {},
  textbookHeaderTitle: {},
  textbookHeaderSubtitle: {},
  textbookToggle: {},
  textbookToggleActive: {},
  textbookToggleText: {},
  textbookToggleTextActive: {},
  textbookContent: {},
  selectedTextbook: {},
  textbookTitle: {},
  textbookPage: {},
  changeTextbookButton: {},
  changeTextbookText: {},
};

export default ProgressScreen; 