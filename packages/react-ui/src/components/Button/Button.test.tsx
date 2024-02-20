import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { variants } from './variants';

test('renders a button with a label', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children);
    expect(screen.getByRole('button')).not.toBeDisabled();
});

test('renders with a left icon if specified', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        leftIcon: <span data-testid="left-icon" />,
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children);
    expect(await screen.findByTestId('left-icon')).toBeVisible();
});

test('renders with a left icon component', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        leftIcon: 'Encrypted',
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children);
    expect(screen.getByRole('button')).toContainHTML('<svg');
});

test('renders with a right icon if specified', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        rightIcon: <span data-testid="right-icon" />,
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children);
    expect(await screen.findByTestId('right-icon')).toBeVisible();
});

test('renders with a right icon component', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        rightIcon: 'Encrypted',
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children);
    expect(screen.getByRole('button')).toContainHTML('<svg');
});
