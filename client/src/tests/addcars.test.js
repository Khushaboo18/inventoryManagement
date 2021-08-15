import React from 'react';
import { render, screen } from '@testing-library/react';
import AddCars from '../components/addCars';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<AddCars />, div);
});