import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Game, { calculateWinner } from './App';

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

describe('Game component interactions', () => {
  test('clicking on a square shows X or O and toggles turns', () => {
    const { getAllByRole, getByText } = render(<Game />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    expect(getByText(/Next player: O/)).toBeInTheDocument();

    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    expect(getByText(/Next player: X/)).toBeInTheDocument();
  });

  test('does not overwrite a square once clicked', () => {
    const { getAllByRole } = render(<Game />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]);
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
  });

  test('displays the winner when game is won', () => {
    const { getAllByRole, getByText } = render(<Game />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins

    expect(getByText(/Winner: X/)).toBeInTheDocument();
  });

  test('does not allow further moves after game is won', () => {
    const { getAllByRole } = render(<Game />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins

    fireEvent.click(squares[5]); // should be ignored
    expect(squares[5]).toHaveTextContent('');
  });

  test('renders 10 squares', () => {
    const { getAllByRole } = render(<Game />);
    const squares = getAllByRole('button');
    expect(squares.length).toBe(10);
  });

  test('renders 9 squares', () => {
    const { getAllByRole } = render(<Game />);
    const squareButtons = getAllByRole('button').filter(btn =>
      btn.classList.contains('square')
    );
    expect(squareButtons.length).toBe(9);
  });
  

  test('allows jumping back to previous moves', () => {
    const { getAllByRole, getByText } = render(<Game />);
    const squares = getAllByRole('button');

    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O

    const jumpButton = getByText('Go to move #1');
    fireEvent.click(jumpButton);

    // Should show "Next player: O" again
    expect(getByText(/Next player: O/)).toBeInTheDocument();
  });
});
