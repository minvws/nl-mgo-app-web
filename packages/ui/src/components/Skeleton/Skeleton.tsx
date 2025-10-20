import { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
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
    const loadingStyles = tw`rounded-smbg-gray-100 h-full animate-pulse *:invisible dark:bg-gray-700`;

    return (
        <Comp className={twMerge(isLoading && loadingStyles, className)} {...rest}>
            {children}
        </Comp>
    );
};
