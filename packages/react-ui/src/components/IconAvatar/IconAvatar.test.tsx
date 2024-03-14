import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { IconAvatar } from './IconAvatar';
import { defaultIconColorIconNames } from '../Icon/icons';

test.each(defaultIconColorIconNames)('renders icon `%s` with background', async (name) => {
    render(<IconAvatar data-testid="test-icon" name={name} />);

    const element = await screen.findByTestId('test-icon');
    expect(element).toBeVisible();
});

test('render with name to default background', async () => {
    render(<IconAvatar data-testid="test" name="Favorite" />);

    const element = await screen.findByTestId('test');
    expect(element).toBeVisible();
});
