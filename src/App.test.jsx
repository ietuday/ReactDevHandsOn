import Board, { calculateWinner } from './App';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

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
});

describe('Board component interactions', () => {
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

  test('does not overwrite a square once clicked', () => {
    const { getAllByRole } = render(<Board />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[0]); // should do nothing
    expect(squares[0]).toHaveTextContent('X');
  });

  test('displays the winner when game is won', () => {
    const { getAllByRole, getByText } = render(<Board />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins

    expect(getByText(/Winner: X/)).toBeInTheDocument();
  });

  test('does not allow further moves after game is won', () => {
    const { getAllByRole } = render(<Board />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins

    fireEvent.click(squares[5]); // Should be ignored
    expect(squares[5]).toHaveTextContent(''); // remains empty
  });

  test('renders 9 squares', () => {
    const { getAllByRole } = render(<Board />);
    const squares = getAllByRole('button');
    expect(squares.length).toBe(9);
  });
});
