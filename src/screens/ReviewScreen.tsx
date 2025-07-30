import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import extracted icon components
import { BackArrowIcon } from '@/components/icons/BackArrowIcon';

// TypeScript interfaces
interface LessonActivity {
  id: number;
  type: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  duration: string;
  completed: boolean;
}

interface ReviewScreenProps {
  selectedTextbook: string;
  selectedPage: string;
  onNavigate: (screen: string) => void;
  styles: any;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  selectedTextbook,
  selectedPage,
  onNavigate,
  styles
}) => {
  const lessonActivities: LessonActivity[] = [
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
              onPress={() => onNavigate('upload')}
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
                      onNavigate('quiz');
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