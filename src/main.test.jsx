/**
 * @vitest-environment jsdom
 */
import { describe, test, vi, beforeEach, expect } from 'vitest';
import React from 'react';
import { act } from 'react-dom/test-utils'; // 🔥 CRUCIAL

// Mock App.jsx
vi.mock('./App', () => ({
  default: vi.fn(() => <div data-testid="mock-app">Mocked App</div>),
}));

beforeEach(() => {
  // Setup root element
  document.body.innerHTML = '<div id="root"></div>';
});

describe('main.jsx', () => {
  test('renders App into the root element without crashing', async () => {
    await act(async () => {
      await import('./main.jsx');
    });

    const rootDiv = document.getElementById('root');
    expect(rootDiv.innerHTML).toContain('Mocked App');
  });
});
