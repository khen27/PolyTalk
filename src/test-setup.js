// Note: @testing-library/jest-native is deprecated
// Using built-in matchers from @testing-library/react-native instead

// Mock react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  
  return {
    Svg: (props) => React.createElement(View, props),
    Path: (props) => React.createElement(View, props),
    G: (props) => React.createElement(View, props),
    ClipPath: (props) => React.createElement(View, props),
    Rect: (props) => React.createElement(View, props),
    Defs: (props) => React.createElement(View, props),
  };
});

// Mock expo modules
jest.mock('expo-linear-gradient', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    LinearGradient: (props) => React.createElement(View, props),
  };
});

jest.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: jest.fn(() => Promise.resolve({ canceled: true })),
  MediaTypeOptions: {
    Images: 'Images',
  },
})); 