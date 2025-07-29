import React from 'react';
import { render } from '@testing-library/react-native';
import {
  CameraIcon,
  ClockIcon,
  AwardIcon,
  MicrophoneIcon,
  BackArrowIcon,
} from '../index';

describe('Icon Components Suite - Second Batch (Phase 2.2)', () => {
  const icons = [
    { Component: CameraIcon, name: 'CameraIcon' },
    { Component: ClockIcon, name: 'ClockIcon' },
    { Component: AwardIcon, name: 'AwardIcon' },
    { Component: MicrophoneIcon, name: 'MicrophoneIcon' },
    { Component: BackArrowIcon, name: 'BackArrowIcon' },
  ];

  describe('🧪 Rendering Tests', () => {
    icons.forEach(({ Component, name }) => {
      it(`${name} renders without crashing`, () => {
        const { getByTestId } = render(<Component testID={`${name.toLowerCase()}-test`} />);
        expect(getByTestId(`${name.toLowerCase()}-test`)).toBeTruthy();
      });
    });
  });

  describe('⚙️ Props Tests', () => {
    icons.forEach(({ Component, name }) => {
      it(`${name} accepts size prop`, () => {
        const { getByTestId } = render(
          <Component testID={`${name.toLowerCase()}-size-test`} size={64} />
        );
        expect(getByTestId(`${name.toLowerCase()}-size-test`)).toBeTruthy();
      });

      it(`${name} accepts color prop`, () => {
        const { getByTestId } = render(
          <Component testID={`${name.toLowerCase()}-color-test`} color="#123456" />
        );
        expect(getByTestId(`${name.toLowerCase()}-color-test`)).toBeTruthy();
      });
    });
  });

  describe('🔍 TypeScript Interface Tests', () => {
    it('batch 2 icons implement IconProps correctly', () => {
      icons.forEach(({ Component }) => {
        const props = { size: 32, color: "#FF5722" };
        expect(() => React.createElement(Component, props)).not.toThrow();
      });
    });
  });

  describe('⚡ Performance Tests', () => {
    it('batch 2 icons render quickly', () => {
      const startTime = performance.now();
      
      icons.forEach(({ Component }, index) => {
        render(<Component testID={`batch2-perf-${index}`} />);
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render all 5 icons in under 100ms
      expect(renderTime).toBeLessThan(100);
    });
  });
}); 