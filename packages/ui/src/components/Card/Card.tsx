import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { Text } from '../Text/Text';

export type CardProps = HTMLAttributes<HTMLElement> & CompositionProps;

export const Card = ({ className, asChild, children, ...rest }: CardProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });

    return (
        <Text asChild>
            <Comp
                className={twMerge('bg-t-bg-secondary w-full rounded-lg p-4', className)}
                {...rest}
            >
                {children}
            </Comp>
        </Text>
    );
};
