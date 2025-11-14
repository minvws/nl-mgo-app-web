import { Slot, Slottable } from '@radix-ui/react-slot';
import { cloneElement, HTMLAttributes, isValidElement, type ReactNode } from 'react';

export interface CompositionProps {
    asChild?: boolean;
}

export type CompositionPropsWithoutChildren =
    | { asChild: true; children: ReactNode }
    | { asChild?: false; children?: never };

/**
 * Slottable does not work when wrapped, this aims to solve that issue.
 * For more details see: https://github.com/radix-ui/primitives/issues/1825#issuecomment-2123042290
 */
export function composeWrappedSlottable({
    asChild,
    children,
    wrapperProps,
}: {
    asChild?: boolean;
    children: ReactNode;
    wrapperProps: HTMLAttributes<HTMLElement>;
}) {
    if (asChild && isValidElement(children)) {
        return (
            <Slottable>
                {cloneElement(
                    children,
                    children.props,
                    <span {...wrapperProps}>{children.props.children}</span>
                )}
            </Slottable>
        );
    }

    return (
        <span {...wrapperProps}>
            <Slottable>{children}</Slottable>
        </span>
    );
}

interface CompositionConfig<T extends keyof HTMLElementTagNameMap> extends CompositionProps {
    tag: T;
}

interface CompositionReturn<T extends keyof HTMLElementTagNameMap> {
    Comp: typeof Slot | T;
    Slottable: typeof Slottable;
    composeWrappedSlottable: typeof composeWrappedSlottable;
}

/**
 * A small utility hook to implement a Slot/Slottable composition pattern.
 * @see https://www.radix-ui.com/primitives/docs/utilities/slot
 */
export function useComposition<T extends keyof HTMLElementTagNameMap>({
    asChild,
    tag,
}: CompositionConfig<T>): CompositionReturn<T> {
    return { Comp: asChild ? Slot : tag, Slottable, composeWrappedSlottable };
}
