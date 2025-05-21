import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Skeleton } from './Skeleton';
import { SkeletonText } from './SkeletonText';
import { SkeletonCircle } from './SkeletonCircle';

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

test('renders SkeletonText with multiple lines', async () => {
    const props = {
        numberOfLines: 2,
    };

    render(<SkeletonText data-testid="test" isLoading {...props} />);

    const element = await screen.findByTestId('test');
    expect(element.children.length).toEqual(props.numberOfLines);
    expect(element.children[1].classList).toContain('w-4/5');
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
