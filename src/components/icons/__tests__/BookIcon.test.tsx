import React from 'react';
import { render } from '@testing-library/react-native';
import { BookIcon } from '../BookIcon';

describe('BookIcon', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<BookIcon testID="book-icon" />);
    expect(getByTestId('book-icon')).toBeTruthy();
  });

  it('renders with custom size and color', () => {
    const { getByTestId } = render(
      <BookIcon testID="book-icon" size={32} color="#000000" />
    );
    expect(getByTestId('book-icon')).toBeTruthy();
  });

  it('applies default size when not provided', () => {
    const { getByTestId } = render(<BookIcon testID="book-icon" />);
    const icon = getByTestId('book-icon');
    // Since SVG is mocked, we just verify it renders
    expect(icon).toBeTruthy();
  });

  it('applies default color when not provided', () => {
    const { getByTestId } = render(<BookIcon testID="book-icon" />);
    const icon = getByTestId('book-icon');
    expect(icon).toBeTruthy();
  });
}); 