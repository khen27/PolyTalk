import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [screen, setScreen] = useState('home');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [review, setReview] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

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
          <Text style={styles.splashTitle}>PolyTalk</Text>
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
      colors={['#4f46e5', '#7c3aed', '#a855f7']}
      locations={[0, 0.6, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.homeContainer}>
        <View style={styles.profileContainer}>
          <Image source={require('./assets/zander.jpg')} style={styles.profileImage} />
          <View style={styles.onlineIndicator} />
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.appTitle}>PolyTalk</Text>
          <Text style={styles.tagline}>Your AI-Powered Language Companion</Text>
          <Text style={styles.creator}>Creator: Zander</Text>
        </View>
        
        <View style={styles.streakContainer}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>3 Day Streak!</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => setScreen('upload')}
          >
            <LinearGradient
              colors={['#4CAF50', '#45a049']}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>🚀 Start Today's Lesson</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => setScreen('progress')}
          >
            <Text style={styles.secondaryButtonText}>📊 View Progress</Text>
          </TouchableOpacity>
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
    </SafeAreaView>
    </LinearGradient>
  );

  const UploadScreen = () => (
    <LinearGradient
      colors={['#4f46e5', '#7c3aed', '#a855f7']}
      locations={[0, 0.6, 1]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.uploadContainer}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => setScreen('home')}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.screenTitle}>📚 Upload Study Material</Text>
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
              colors={['#FF6B6B', '#FF8E8E']}
              style={styles.buttonGradient}
            >
              <Text style={styles.imageButtonText}>📸 Take Photo</Text>
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
              colors={(!notes.trim() && !image) ? ['#ccc', '#999'] : ['#4CAF50', '#45a049']}
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
      colors={['#4f46e5', '#7c3aed', '#a855f7']}
      locations={[0, 0.6, 1]}
      style={styles.gradientContainer}
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
            colors={['#FF6B6B', '#FF8E8E']}
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
      colors={['#4f46e5', '#7c3aed', '#a855f7']}
      locations={[0, 0.6, 1]}
      style={styles.gradientContainer}
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
            colors={['#4CAF50', '#45a049']}
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
      colors={['#4f46e5', '#7c3aed', '#a855f7']}
      locations={[0, 0.6, 1]}
      style={styles.gradientContainer}
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
            colors={['#4CAF50', '#45a049']}
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
  safeArea: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
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
  appTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  streakEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  streakText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionContainer: {
    marginTop: 40,
  },
  primaryButton: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
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
  screenTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
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
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
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
    borderRadius: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
  splashTitle: {
    fontSize: 48,
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
});
