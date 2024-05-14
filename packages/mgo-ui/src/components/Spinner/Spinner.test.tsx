import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Spinner } from './Spinner';

test('renders as a progressbar', async () => {
    render(<Spinner />);

    expect(screen.getByRole('progressbar')).toBeVisible();
});
