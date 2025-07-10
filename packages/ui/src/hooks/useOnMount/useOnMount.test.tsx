import { render } from '@testing-library/react';
import { type HTMLAttributes } from 'react';
import { afterEach, expect, test, vi } from 'vitest';
import { useOnMount } from './useOnMount';

const onMountFunc = vi.fn();

const TestComponent = ({ ...rest }: HTMLAttributes<HTMLElement>) => {
    useOnMount(onMountFunc);
    return <div {...rest} />;
};

afterEach(() => {
    onMountFunc.mockReset();
});

test('useOnMount calls function when component is rendered the first time', async () => {
    render(<TestComponent />);
    expect(onMountFunc).toHaveBeenCalledTimes(1);
});

test('useOnMount does NOT call the function again when the component is rerendered', async () => {
    const { rerender } = render(<TestComponent />);
    rerender(<TestComponent />);
    expect(onMountFunc).toHaveBeenCalledTimes(1);
});
