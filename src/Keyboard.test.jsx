import { render, screen } from '@testing-library/react';
import Keyboard, { letters } from './Keyboard';

test('renders full virtual keyboard', () => {
  const { getByRole } = render(<Keyboard letterStatuses={new Map()} />);
  letters.flat().forEach(letter => {
    const key = getByRole('button', { name: letter });
    expect(key).toBeTruthy();
  })
});