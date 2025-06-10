import { range } from 'lodash';
import { twMerge } from 'tailwind-merge';
import { useComposition } from '../../hooks/useComposition/useComposition';
import { Skeleton, type SkeletonProps } from './Skeleton';

export interface SkeletonTextProps extends SkeletonProps {
    readonly numberOfLines: number;
    readonly height?: string;
}

export const SkeletonText = ({
    isLoading,
    numberOfLines = 3,
    height = 'h-2',
    asChild,
    className,
    children,
    ...rest
}: SkeletonTextProps) => {
    const { Comp } = useComposition({ asChild, tag: 'div' });
    const numbers = range(1, isLoading ? numberOfLines + 1 : 2);

    return (
        <Comp className={className} {...rest}>
            {numbers.map((number, index) => (
                <Skeleton
                    className={twMerge(
                        isLoading && height,
                        isLoading &&
                            (numberOfLines > 1 && number === numbers.length ? 'w-4/5' : 'w-full')
                    )}
                    isLoading={isLoading}
                    key={numbers.length.toString() + number}
                >
                    {index === 0 && children}
                </Skeleton>
            ))}
        </Comp>
    );
};
