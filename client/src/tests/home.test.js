import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Home />, div);
});