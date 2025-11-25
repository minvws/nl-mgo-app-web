import { type HTMLAttributes } from 'react';
import { type CompositionProps, useComposition } from '../../hooks/useComposition/useComposition';
import { cn } from '../../utils';

export interface StackProps extends HTMLAttributes<HTMLElement>, CompositionProps {}

/**
 * A small utility component to stack elements with even spacing.
 * It also provides a dynamic element option (see `DynamicElement`) .
 */
export const Stack = ({ asChild, className, ...rest }: StackProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });
    return <Comp className={cn('flex flex-col gap-4', className)} {...rest} />;
};
