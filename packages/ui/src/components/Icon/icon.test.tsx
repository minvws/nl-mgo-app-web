import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { Icon } from './Icon';
import { type IconName, iconNames } from './icons';

test('renders icon `%s` with attributes', async () => {
    const icon = faker.helpers.arrayElement(iconNames);
    render(<Icon data-testid="test-icon" icon={icon} />);
    expect(await screen.findByTestId('test-icon')).toBeVisible();
});

test('unknown icon will throw', async () => {
    vi.spyOn(console, 'error').mockImplementation(vi.fn());
    const icon = faker.lorem.word();
    expect(async () =>
        render(<Icon data-testid="test-icon" icon={icon as IconName} />)
    ).rejects.toThrow(`Could not find icon: "${icon}"`);
});
