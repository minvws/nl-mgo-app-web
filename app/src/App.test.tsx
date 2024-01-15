import 'vitest-dom/extend-expect';
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders Hello World heading', () => {
  render(<App />);

  expect(screen.getByRole('heading')).toHaveTextContent('Hello World');
});
