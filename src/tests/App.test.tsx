/**
 * @jest-environment jsdom
 */
import * as React from 'react';

import { render, screen } from './utils/test-utils';

import App from '../components/App';

test('Should render search view on default route', () => {
  render(<App />);

  expect(
    screen.getByLabelText('Search By Revision ID or Author Email'),
  ).toBeInTheDocument();
});
