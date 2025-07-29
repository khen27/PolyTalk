import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const RocketIcon: React.FC<IconProps> = ({ size = 24, color = "#fff", testID }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" testID={testID}>
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