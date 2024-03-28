import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { IconButton } from './IconButton';

test('render', async () => {
    render(<IconButton data-testid="test" name="Close" />);

    const element = await screen.findByTestId('test');
    expect(element).toBeVisible();
});
