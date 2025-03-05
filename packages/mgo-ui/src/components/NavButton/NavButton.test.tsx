import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { type IconName } from '../Icon/icons';
import { NavButton } from './NavButton';
import { menuIconNames } from './icons';

vi.mock('../Icon/Icon', () => ({
    Icon: (props: { readonly icon: IconName }) => <svg data-testid={`${props.icon}`} {...props} />,
}));

test('renders a navItem with a label and icon', async () => {
    const props = {
        children: faker.lorem.sentence(),
        icon: faker.helpers.arrayElement(menuIconNames),
    };

    render(<NavButton data-testid="navItem" {...props} />);

    expect(screen.getByTestId('navItem')).toHaveTextContent(props.children);
    expect(screen.getByTestId('navItem')).toContainHTML('<svg');
});
