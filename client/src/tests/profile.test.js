import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../components/profile';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<Profile />, div);
});