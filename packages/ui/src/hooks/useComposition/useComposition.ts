import { Slot, Slottable } from '@radix-ui/react-slot';
import { type ReactNode } from 'react';

export interface CompositionProps {
    asChild?: boolean;
}

export type CompositionPropsWithoutChildren =
    | { asChild: true; children: ReactNode }
    | { asChild?: false; children?: never };

interface CompositionConfig<T extends keyof HTMLElementTagNameMap> extends CompositionProps {
    tag: T;
}

/**
 * A small utility hook to implement a Slot/Slottable composition pattern.
 * @see https://www.radix-ui.com/primitives/docs/utilities/slot
 */
export function useComposition<T extends keyof HTMLElementTagNameMap>({
    asChild,
    tag,
}: CompositionConfig<T>): { Comp: typeof Slot | T; Slottable: typeof Slottable } {
    return { Comp: asChild ? Slot : tag, Slottable };
}
