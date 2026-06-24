import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const logos = screen.getAllByAltText(/AE3 Partners/i);
  expect(logos.length).toBeGreaterThan(0);
});
