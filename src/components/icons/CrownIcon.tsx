import React from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const CrownIcon: React.FC<IconProps> = ({ size = 24, color = "#FFD700", testID }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" testID={testID}>
    <G clipPath="url(#clip0_4418_8590)">
      <Path d="M17 22H7C6.59 22 6.25 21.66 6.25 21.25C6.25 20.84 6.59 20.5 7 20.5H17C17.41 20.5 17.75 20.84 17.75 21.25C17.75 21.66 17.41 22 17 22Z" fill={color} />
      <Path d="M20.35 5.51906L16.35 8.37906C15.82 8.75906 15.06 8.52906 14.83 7.91906L12.94 2.87906C12.62 2.00906 11.39 2.00906 11.07 2.87906L9.16998 7.90906C8.93998 8.52906 8.18997 8.75906 7.65998 8.36906L3.65998 5.50906C2.85998 4.94906 1.79998 5.73906 2.12998 6.66906L6.28998 18.3191C6.42998 18.7191 6.80998 18.9791 7.22998 18.9791H16.76C17.18 18.9791 17.56 18.7091 17.7 18.3191L21.86 6.66906C22.2 5.73906 21.14 4.94906 20.35 5.51906ZM14.5 14.7491H9.49998C9.08998 14.7491 8.74998 14.4091 8.74998 13.9991C8.74998 13.5891 9.08998 13.2491 9.49998 13.2491H14.5C14.91 13.2491 15.25 13.5891 15.25 13.9991C15.25 14.4091 14.91 14.7491 14.5 14.7491Z" fill={color} />
    </G>
    <Defs>
      <ClipPath id="clip0_4418_8590">
        <Rect width="24" height="24" fill="white"/>
      </ClipPath>
    </Defs>
  </Svg>
); 