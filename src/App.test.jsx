import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { FilterableProductTable } from './App';

beforeEach(() => {
  render(<App />);
});

test('renders product table with all products initially', () => {
  expect(screen.getByText('Apple')).toBeInTheDocument();
  expect(screen.getByText('Pumpkin')).toBeInTheDocument();
});

test('filters products by text input', () => {
  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: 'pea' }
  });
  expect(screen.getByText('Peas')).toBeInTheDocument();
  expect(screen.queryByText('Apple')).not.toBeInTheDocument();
});

test('filters only in-stock products when checkbox is checked', () => {
  fireEvent.click(screen.getByLabelText(/only show products in stock/i));
  expect(screen.queryByText('Pumpkin')).not.toBeInTheDocument(); // out of stock
  expect(screen.getByText('Peas')).toBeInTheDocument(); // in stock
});

test('filters by text + stock together', () => {
  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: { value: 'a' } // matches 'Apple' and 'Dragonfruit'
  });
  fireEvent.click(screen.getByLabelText(/only show products in stock/i));

  expect(screen.getByText('Apple')).toBeInTheDocument(); // in-stock
  expect(screen.getByText('Dragonfruit')).toBeInTheDocument(); // in-stock
  expect(screen.queryByText('Passionfruit')).not.toBeInTheDocument(); // out-of-stock
});


test('renders category headers correctly', () => {
  expect(screen.getByText('Fruits')).toBeInTheDocument();
  expect(screen.getByText('Vegetables')).toBeInTheDocument();
});

test('renders out-of-stock product names in red', () => {
  const passionfruit = screen.getByText('Passionfruit');
  expect(passionfruit).toHaveStyle({ color: 'rgb(255, 0, 0)' }); // the actual computed style
});
