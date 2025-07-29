import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const AwardIcon: React.FC<IconProps> = ({ size = 24, color = "#fff", testID }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" testID={testID}>
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