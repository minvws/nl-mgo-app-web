import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { RouterLink } from './RouterLink';

test('renders as span', async () => {
    render(<RouterLink to="/" aria-disabled data-testid="link" />);

    expect(screen.getByTestId('link').tagName).toEqual('SPAN');
});
