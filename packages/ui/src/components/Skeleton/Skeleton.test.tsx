import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { Skeleton } from './Skeleton';
import { SkeletonCircle } from './SkeletonCircle';
import { SkeletonText } from './SkeletonText';

test('renders a default Skeleton', async () => {
    render(<Skeleton data-testid="test" />);

    const element = await screen.findByTestId('test');
    expect(element).toBeVisible();
});

test('renders children if loaded', async () => {
    const props = {
        isLoading: false,
        children: <span data-testid="child">child</span>,
    };

    render(<Skeleton data-testid="test" {...props} />);

    const child = await screen.findByTestId('child');
    expect(child).toBeVisible();
});

test('renders SkeletonText with multiple lines when loading', async () => {
    const props = {
        numberOfLines: 2,
    };

    render(<SkeletonText data-testid="test" isLoading {...props} />);

    const element = await screen.findByTestId('test');
    expect(element.children.length).toEqual(props.numberOfLines);
});

test('renders children if loaded', async () => {
    const props = {
        isLoading: false,
        numberOfLines: 2,
        children: <span data-testid="child">child</span>,
    };

    render(<SkeletonText data-testid="test" {...props} />);

    const child = await screen.findByTestId('child');
    expect(child).toBeVisible();
});

test('renders SkeletonCircle children if loading', async () => {
    const props = {
        isLoading: true,
        children: <span data-testid="child">child</span>,
    };

    render(<SkeletonCircle data-testid="test" {...props} />);

    const child = await screen.findByTestId('child');
    expect(child).toBeVisible();
});
