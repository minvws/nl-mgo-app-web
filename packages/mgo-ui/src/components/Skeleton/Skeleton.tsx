import { type HTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { twMerge } from 'tailwind-merge';
import { tw } from '../../utils/tw/tw';

export interface SkeletonProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    readonly isLoading?: boolean;
}

export const Skeleton = ({
    isLoading = true,
    className,
    asChild,
    children,
    ...rest
}: SkeletonProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });
    const loadingStyles = tw`h-full animate-pulse rounded bg-gray-100 *:invisible dark:bg-gray-700`;

    return (
        <Comp className={twMerge(isLoading && loadingStyles, className)} {...rest}>
            {children}
        </Comp>
    );
};
