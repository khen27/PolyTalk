// Note: @testing-library/jest-native is deprecated
// Using built-in matchers from @testing-library/react-native instead

// Mock react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');

  const MockComponent = React.forwardRef((props, ref) => {
    const { testID, children, ...rest } = props;
    return React.createElement(View, { testID, ref, ...rest }, children);
  });

  return {
    Svg: MockComponent,
    Circle: MockComponent,
    Rect: MockComponent,
    Path: MockComponent,
    G: MockComponent,
    Defs: MockComponent,
    ClipPath: MockComponent,
    Use: MockComponent,
    Symbol: MockComponent,
    LinearGradient: MockComponent,
    RadialGradient: MockComponent,
    Stop: MockComponent,
    Line: MockComponent,
    Polyline: MockComponent,
    Polygon: MockComponent,
    Text: MockComponent,
    TSpan: MockComponent,
    TextPath: MockComponent,
    Image: MockComponent,
    Ellipse: MockComponent
  };
});

// Mock expo modules
jest.mock('expo-image-picker', () => ({}));
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient'
})); 