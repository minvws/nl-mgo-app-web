import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import { type HTMLAttributes } from 'react';
import { expect, test } from 'vitest';
import { useComposition, type CompositionProps } from './useComposition';

const TestComponent = ({
    asChild,
    children,
    ...rest
}: CompositionProps & HTMLAttributes<HTMLElement>) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'span' });
    return (
        <Comp {...rest}>
            [before]
            <Slottable>{children}</Slottable>
            [after]
        </Comp>
    );
};

test('composition renders using the default tag when asChild is undefined', async () => {
    const content = faker.lorem.sentence();
    render(<TestComponent data-testid="test">{content}</TestComponent>);

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(`[before]${content}[after]`);
    expect(element.tagName).toBe('SPAN');
});

test('composition renders using the default tag when asChild is false', async () => {
    const content = faker.lorem.sentence();
    render(
        <TestComponent data-testid="test" asChild={false}>
            {content}
        </TestComponent>
    );

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(`[before]${content}[after]`);
    expect(element.tagName).toBe('SPAN');
});

test('composition renders with child as main element when asChild is true', async () => {
    const content = faker.lorem.sentence();
    render(
        <TestComponent data-testid="test" asChild>
            <strong>{content}</strong>
        </TestComponent>
    );

    const element = await screen.findByTestId('test');
    expect(element).toHaveTextContent(`[before]${content}[after]`);
    expect(element.tagName).toBe('STRONG');
});
