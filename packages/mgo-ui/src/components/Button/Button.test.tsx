import { expect, test } from 'vitest';
import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { Button, type ButtonProps } from './Button';
import { variants } from './variants';

test('renders a button with a label', async () => {
    const props: ButtonProps = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children as string);
});

test('renders with a left icon component', async () => {
    const props: ButtonProps = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        leftIcon: 'encrypted',
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children as string);
    expect(screen.getByRole('button')).toContainHTML('<svg');
});

test('renders with a left icon element if specified', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        leftIcon: <span data-testid="left-icon" />,
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children);
    expect(await screen.findByTestId('left-icon')).toBeVisible();
});

test('renders with a right icon component', async () => {
    const props: ButtonProps = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        rightIcon: 'encrypted',
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children as string);
    expect(screen.getByRole('button')).toContainHTML('<svg');
});

test('renders with a right icon element if specified', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        rightIcon: <span data-testid="right-icon" />,
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children);
    expect(await screen.findByTestId('right-icon')).toBeVisible();
});
