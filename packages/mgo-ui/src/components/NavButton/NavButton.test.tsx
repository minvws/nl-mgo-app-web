import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { iconNames } from '../Icon/icons';
import { NavButton } from './NavButton';

test('renders a navItem with a label and icon', async () => {
    const props = {
        children: faker.lorem.sentence(),
        icon: faker.helpers.arrayElement(iconNames),
    };

    render(<NavButton data-testid="navItem" {...props} />);

    expect(screen.getByTestId('navItem')).toHaveTextContent(props.children);
    expect(screen.getByTestId('navItem')).toContainHTML('<svg');
});
