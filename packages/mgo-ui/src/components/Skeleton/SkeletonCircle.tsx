import { twMerge } from 'tailwind-merge';
import { Skeleton, type SkeletonProps } from './Skeleton';

export interface SkeletonCircleProps extends SkeletonProps {}

export const SkeletonCircle = ({ isLoading, className, ...rest }: SkeletonCircleProps) => {
    return (
        <Skeleton
            className={twMerge(isLoading && 'rounded-full', className)}
            isLoading={isLoading}
            {...rest}
        />
    );
};
