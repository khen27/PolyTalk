import React from 'react';
import { render } from '@testing-library/react-native';
import { RocketIcon } from '../RocketIcon';

describe('RocketIcon', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<RocketIcon testID="rocket-icon" />);
    expect(getByTestId('rocket-icon')).toBeTruthy();
  });

  it('renders with custom size and color', () => {
    const { getByTestId } = render(
      <RocketIcon testID="rocket-icon" size={48} color="#FF0000" />
    );
    expect(getByTestId('rocket-icon')).toBeTruthy();
  });

  it('uses default props when not specified', () => {
    const { getByTestId } = render(<RocketIcon testID="rocket-icon" />);
    const icon = getByTestId('rocket-icon');
    expect(icon).toBeTruthy();
  });
}); 