import { render, screen } from '@testing-library/react';
import Gameboard from './Gameboard';

test('renders empty gameboard correctly', () => {
  const { getAllByTestId } = render(<Gameboard currentGuess={[]} pastGuesses={[]} solution='WORST' cantSubmit={false} />);
  const letterboxes = getAllByTestId('letterbox');
  expect(letterboxes.length).toBe(30);
});