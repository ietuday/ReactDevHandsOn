import Board, { calculateWinner } from './App';
import { render, fireEvent } from '@testing-library/react';

describe('calculateWinner', () => {
  test('detects a winner in the first row', () => {
    const board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(calculateWinner(board)).toBe('X');
  });

  test('detects a diagonal win for O', () => {
    const board = ['O', null, null, null, 'O', null, null, null, 'O'];
    expect(calculateWinner(board)).toBe('O');
  });

  test('returns null if no winner', () => {
    const board = ['X', 'O', 'X', 'O', 'O', 'X', 'X', 'X', 'O'];
    expect(calculateWinner(board)).toBe(null);
  });
  test('clicking on a square shows X or O and toggles turns', () => {
    const { getAllByRole, getByText } = render(<Board />);
    const squares = getAllByRole('button');
  
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(getByText(/Next player: O/)).toBeInTheDocument();
  
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    expect(getByText(/Next player: X/)).toBeInTheDocument();
  });
  
});




