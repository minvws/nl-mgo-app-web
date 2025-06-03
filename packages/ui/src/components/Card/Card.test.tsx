import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Card } from './Card';

test('renders Card', async () => {
    render(<Card data-testid="card" />);

    const element = await screen.findByTestId('card');
    expect(element).toBeVisible();
});
