import React from 'react';
import { render } from '@testing-library/react-native';
import {
  BookIcon,
  RocketIcon,
  ChartIcon,
  FireIcon,
  DocumentIcon,
} from '../index';

describe('Icon Components Suite - First Batch', () => {
  const icons = [
    { Component: BookIcon, name: 'BookIcon' },
    { Component: RocketIcon, name: 'RocketIcon' },
    { Component: ChartIcon, name: 'ChartIcon' },
    { Component: FireIcon, name: 'FireIcon' },
    { Component: DocumentIcon, name: 'DocumentIcon' },
  ];

  describe('Rendering Tests', () => {
    icons.forEach(({ Component, name }) => {
      it(`${name} renders without crashing`, () => {
        const { getByTestId } = render(<Component testID={`${name.toLowerCase()}-test`} />);
        expect(getByTestId(`${name.toLowerCase()}-test`)).toBeTruthy();
      });
    });
  });

  describe('Props Tests', () => {
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

  describe('TypeScript Interface Compliance', () => {
    it('all icons implement IconProps interface correctly', () => {
      // This test will fail at compile time if interfaces don't match
      icons.forEach(({ Component }) => {
        const props = { size: 24, color: "#fff" };
        expect(() => React.createElement(Component, props)).not.toThrow();
      });
    });
  });

  describe('Performance Tests', () => {
    it('icons render quickly (performance baseline)', () => {
      const startTime = performance.now();
      
      icons.forEach(({ Component }, index) => {
        render(<Component testID={`perf-test-${index}`} />);
      });
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render all 5 icons in under 100ms
      expect(renderTime).toBeLessThan(100);
    });
  });
}); 