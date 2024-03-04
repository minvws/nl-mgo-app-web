import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { NavButton } from './NavButton';
import { variants } from './variants';
import { icons } from '../Icon/icons';

test('renders a navItem with a label and icon', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        icon: faker.helpers.arrayElement(Object.keys(icons)),
    };

    render(<NavButton data-testid="navItem" {...props} />);

    expect(screen.getByTestId('navItem')).toHaveTextContent(props.children);
    expect(screen.getByTestId('navItem')).toContainHTML('<svg');
});

test('renders a navItem with a label and icon component', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        icon: <span data-testid="icon" />,
    };

    render(<NavButton data-testid="navItem" {...props} />);

    expect(screen.getByTestId('navItem')).toHaveTextContent(props.children);
    expect(await screen.findByTestId('icon')).toBeVisible();
});
