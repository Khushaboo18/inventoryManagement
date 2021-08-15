import { render, screen } from '@testing-library/react';
import App from '../components/app';
import React from 'react';

test('renders learn react link', () => {
  const div = document.createElement('div');
  render(<App />, div);
  //const linkElement = screen.getByText(/learn react/i);
  //expect(linkElement).toBeInTheDocument();
});
