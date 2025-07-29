import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const ClockIcon: React.FC<IconProps> = ({ size = 24, color = "#fff", testID }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" testID={testID}>
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