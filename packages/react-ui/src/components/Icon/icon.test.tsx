import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { iconNames } from './icons';
import { Icon } from './Icon';

test.each(iconNames)('renders icon `%s` with attributes', async (name) => {
    render(<Icon data-testid="test-icon" name={name} />);
    expect(await screen.findByTestId('test-icon')).toBeVisible();
});
