import { type HTMLAttributes } from 'react';
import { useComposition } from '../../hooks/useComposition/useComposition';
import { cn } from '../../utils';

export type StackProps = HTMLAttributes<HTMLElement> &
    (
        | {
              asChild: boolean;
              as?: never;
          }
        | {
              asChild?: never;
              as?: 'span' | 'div' | 'nav' | 'ol' | 'ul';
          }
    );

/**
 * A small utility component to stack elements with even spacing.
 * It also provides a dynamic element option (see `DynamicElement`) .
 */
export const Stack = ({ asChild, as, className, ...rest }: StackProps) => {
    const { Comp } = useComposition({ asChild, tag: as ?? 'div' });
    return <Comp className={cn('flex flex-col gap-4', className)} {...rest} />;
};
