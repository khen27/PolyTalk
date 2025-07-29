import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const BackArrowIcon: React.FC<IconProps> = ({ size = 24, color = "#fff", testID }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" testID={testID}>
    <Path d="M13.98 5.31975L10.77 8.52975L8.79999 10.4897C7.96999 11.3197 7.96999 12.6697 8.79999 13.4997L13.98 18.6797C14.66 19.3597 15.82 18.8697 15.82 17.9197V12.3097V6.07975C15.82 5.11975 14.66 4.63975 13.98 5.31975Z" fill={color} />
  </Svg>
); 