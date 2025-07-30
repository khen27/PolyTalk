import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  TextInput
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

// Import extracted icon components
import { BackArrowIcon } from '@/components/icons/BackArrowIcon';
import { DocumentIcon } from '@/components/icons/DocumentIcon';
import { AwardIcon } from '@/components/icons/AwardIcon';
import { CameraIcon } from '@/components/icons/CameraIcon';
import { UploadIcon } from '@/components/icons/UploadIcon';
import { MicIcon } from '@/components/icons/MicIcon';
import { MagicWandIcon } from '@/components/icons/MagicWandIcon';

// TypeScript interfaces
interface UploadScreenProps {
  image: string | null;
  notes: string;
  setNotes: (notes: string) => void;
  onNavigate: (screen: string) => void;
  onPickImage: () => Promise<void>;
  onVoiceRecord: () => void;
  onTextSubmit: () => void;
  styles: any;
}

export const UploadScreen: React.FC<UploadScreenProps> = ({
  image,
  notes,
  setNotes,
  onNavigate,
  onPickImage,
  onVoiceRecord,
  onTextSubmit,
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
        {/* Static Back Button */}
        <View style={styles.screenshotUploadHeaderFixed}>
          <TouchableOpacity 
            onPress={() => onNavigate('home')}
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
                  <TextInput
                    style={styles.screenshotUploadDemoText}
                    value={notes || "Today we learned about Spanish verb conjugations. The present tense endings for -AR verbs are:\n\n• yo: -o (hablo)\n• tú: -as (hablas)\n• él/ella: -a (habla)\n• nosotros: -amos (hablamos)\n• vosotros: -áis (habláis)\n• ellos/ellas: -an (hablan)\n\nWe practiced with verbs like \"estudiar\" (to study), \"caminar\" (to walk), and \"cocinar\" (to cook)."}
                    onChangeText={setNotes}
                    placeholder="Write your lesson notes here..."
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    multiline={true}
                    textAlignVertical="top"
                  />
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
                  <AwardIcon size={22} color="#fff" />
                  <Text style={styles.screenshotUploadSectionTitle}>Quick Capture</Text>
                </View>
                <View style={styles.screenshotUploadMediaButtonsImproved}>
                  <TouchableOpacity 
                    style={styles.screenshotUploadMediaButtonImproved} 
                    onPress={onPickImage}
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
                    onPress={onPickImage}
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
                    onPress={onVoiceRecord}
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
            onPress={onTextSubmit}
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
}; 