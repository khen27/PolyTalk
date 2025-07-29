import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const FireIcon: React.FC<IconProps> = ({ size = 24, color = "#fff", testID }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" testID={testID}>
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