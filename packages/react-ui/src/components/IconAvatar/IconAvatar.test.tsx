import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { type IconName, iconColours, iconNames } from '../Icon/icons';
import { IconAvatar } from './IconAvatar';

const iconsWithColour = Object.keys(iconColours) as IconName[];
const iconsWithoutColour = iconNames.filter((x) => !iconsWithColour.includes(x));

test('renders icon with coloured background', () => {
    const icon = faker.helpers.arrayElement(iconsWithColour);
    render(<IconAvatar data-testid="test" icon={icon} />);
    expect(screen.getByTestId('test')).toBeVisible();
});

test('render with name to default background', async () => {
    const icon = faker.helpers.arrayElement(iconsWithoutColour);
    render(<IconAvatar data-testid="test" icon={icon} />);
    expect(screen.getByTestId('test')).toBeVisible();
});
