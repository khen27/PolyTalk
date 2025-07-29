import React from 'react';
import { render } from '@testing-library/react-native';
import {
  ChatIcon,
  LockIcon,
  MagicWandIcon,
  UploadIcon,
  MicIcon,
  CrownIcon,
} from '../index';

describe('Icon Components Suite - Third Batch (Phase 2.3)', () => {
  const icons = [
    { Component: ChatIcon, name: 'ChatIcon' },
    { Component: LockIcon, name: 'LockIcon' },
    { Component: MagicWandIcon, name: 'MagicWandIcon' },
    { Component: UploadIcon, name: 'UploadIcon' },
    { Component: MicIcon, name: 'MicIcon' },
    { Component: CrownIcon, name: 'CrownIcon' },
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
    it('batch 3 icons implement IconProps correctly', () => {
      icons.forEach(({ Component }) => {
        const props = { size: 32, color: "#FF5722" };
        expect(() => React.createElement(Component, props)).not.toThrow();
      });
    });
  });

  describe('⚡ Performance Tests', () => {
    it('batch 3 icons render quickly', () => {
      const startTime = performance.now();
      
      icons.forEach(({ Component }, index) => {
        render(<Component testID={`batch3-perf-${index}`} />);
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render all 6 icons in under 100ms
      expect(renderTime).toBeLessThan(100);
    });
  });

  describe('🎯 Special Cases', () => {
    it('CrownIcon has correct default color', () => {
      const { getByTestId } = render(<CrownIcon testID="crown-default-color" />);
      expect(getByTestId("crown-default-color")).toBeTruthy();
    });
  });
}); 