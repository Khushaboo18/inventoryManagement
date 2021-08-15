import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/dashboard';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Dashboard />, div);
});