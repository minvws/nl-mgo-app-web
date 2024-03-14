import { type HTMLAttributes } from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { twMerge } from 'tailwind-merge';
import { tw } from '../../utils/tw/tw';

export interface SkeletonProps extends HTMLAttributes<HTMLElement>, CompositionProps {
    isLoading?: boolean;
}

export const Skeleton = ({
    isLoading = true,
    className,
    asChild,
    children,
    ...rest
}: SkeletonProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });
    const loadingStyles = tw`bg-grey-100 dark:bg-grey-700 h-full animate-pulse rounded *:invisible`;

    return (
        <Comp className={twMerge(isLoading && loadingStyles, className)} {...rest}>
            {children}
        </Comp>
    );
};
