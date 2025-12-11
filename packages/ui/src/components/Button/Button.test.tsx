import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
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

test('renders a button with a label and loading', async () => {
    const props: ButtonProps = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        loading: true,
        loadingTextScreenReader: 'Loading...',
    };

    render(<Button {...props} />);

    expect(screen.getByRole('button')).toHaveTextContent(props.children as string);
    expect(screen.getByTestId('spinner')).toBeVisible();
});

test('renders a button loading with a spinner only', async () => {
    const props: ButtonProps = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        loading: true,
        loadingTextScreenReader: 'Loading...',
        loadingSpinnerOnly: true,
    };

    render(<Button {...props} />);
    expect(screen.getByTestId('spinner')).toBeVisible();
});

test('renders a button loading with a right icon', async () => {
    const props: ButtonProps = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        loading: true,
        loadingTextScreenReader: 'Loading...',
        rightIcon: 'chevron_right',
    };

    render(<Button {...props} />);
    expect(screen.getByTestId('spinner')).toBeVisible();
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

test('can render with asChild', async () => {
    const props = {
        children: <a href="/">Hello</a>,
        variant: faker.helpers.arrayElement(variants),
        asChild: true,
    };

    render(<Button {...props} />);
    expect(screen.getByRole('link')).toHaveTextContent('Hello');
});

test('renders in full width with right icon', async () => {
    const props = {
        children: faker.lorem.sentence(),
        variant: faker.helpers.arrayElement(variants),
        rightIcon: <span data-testid="right-icon" />,
        fullWidth: true,
    };

    render(<Button {...props} />);
    expect(screen.getByRole('button')).toHaveTextContent(props.children);
    expect(await screen.findByTestId('right-icon')).toBeVisible();
});
