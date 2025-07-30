import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import extracted icon components
import { RocketIcon } from '@/components/icons/RocketIcon';
import { AwardIcon } from '@/components/icons/AwardIcon';
import { BookIcon } from '@/components/icons/BookIcon';

// TODO: Import carousel components when they are extracted
// import { DailyProgressSummary } from '../components/carousels/DailyProgressSummary';
// import { DailyQuestGrid } from '../components/carousels/DailyQuestGrid';
// import { LessonsCarousel } from '../components/carousels/LessonsCarousel';
// import { WordBankCarousel } from '../components/carousels/WordBankCarousel';

// Temporary placeholder components for carousel functionality
const DailyProgressSummary = ({ userProgress, quests }: any) => <View />;
const DailyQuestGrid = ({ quests, onQuestAction, userProgress }: any) => <View />;
const LessonsCarousel = ({ lessons, onLessonSelect, getBadgeConfig }: any) => <View />;
const WordBankCarousel = ({ words, getCategoryConfig }: any) => <View />;

// TypeScript interfaces
interface UserProgress {
  totalXP: number;
  totalGems: number;
  dailyXP: number;
  questsCompleted: number;
  currentStreak: number;
}

interface Quest {
  id: number;
  title: string;
  description: string;
  status: 'available' | 'in_progress' | 'completed' | 'claimed';
  type: string;
  xpReward: number;
  gemReward: number;
  progress: number;
  maxProgress: number;
}

interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  type: string;
  progress: number;
  badge: string;
  lastStudied: string;
  difficulty: string;
}

interface WordBankEntry {
  id: number;
  word: string;
  translation: string;
  category: string;
  difficulty: string;
  dateAdded: string;
  reviewCount: number;
}

interface HomeScreenProps {
  userProgress: UserProgress;
  dailyQuests: Quest[];
  recentLessons: Lesson[];
  wordBank: WordBankEntry[];
  onNavigate: (screen: string, type?: string) => void;
  onQuestAction: (quest: Quest) => void;
  onLessonSelect: (lesson: Lesson) => void;
  getBadgeConfig: (badgeType: string) => any;
  getCategoryConfig: (category: string) => any;
  styles: any; // TODO: Replace with proper StyleSheet type
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProgress,
  dailyQuests,
  recentLessons,
  wordBank,
  onNavigate,
  onQuestAction,
  onLessonSelect,
  getBadgeConfig,
  getCategoryConfig,
  styles
}) => {
  return (
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
                  onPress={() => onNavigate('progress', 'profile')}
                  activeOpacity={0.8}
                >
                  <Image source={require('../../assets/zander.jpg')} style={styles.profileImage} />
                </TouchableOpacity>
              </View>
              <View style={styles.headerContainer}>
                <Image 
                  source={require('../../assets/polytalk-logo.png')} 
                  style={styles.homeLogo}
                  resizeMode="contain"
                />
                <Text style={styles.appTitle}>PolyTalk</Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <TouchableOpacity 
                style={styles.premiumPillButton} 
                onPress={() => onNavigate('upload')}
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
                onQuestAction={onQuestAction}
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
                onLessonSelect={onLessonSelect}
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
}; 