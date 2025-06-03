import { type HTMLAttributes } from 'react';
import { type Variant } from './variants';
import { cn } from '../../utils';

export interface LoadingCircleProps extends HTMLAttributes<SVGElement> {
    readonly variant?: Variant;
}
interface Styles {
    circle: string;
    fill: string;
}

const variantStyles: Record<Variant, Styles> = {
    default: {
        circle: 'stroke-gray-50 dark:stroke-gray-700',
        fill: 'stroke-sky-blue-600',
    },
    'sky-blue': {
        circle: 'stroke-sky-blue-500 dark:stroke-gray-700',
        fill: 'stroke-white',
    },
    gray: {
        circle: 'stroke-gray-100 dark:stroke-[#444444]',
        fill: 'stroke-[#999999] dark:stroke-gray-400',
    },
};

export const LoadingCircle = ({ variant = 'default', ...rest }: LoadingCircleProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 53" fill="none" {...rest}>
        <path
            className={cn('fill-none', variantStyles[variant].circle)}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="7"
            d="M48 27a22 22 0 1 1-44-1 22 22 0 0 1 44 1h0Z"
        />
        <path
            className={cn('fill-none', variantStyles[variant].fill)}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="7"
            d="M26 5a22 22 0 0 1 22 22"
        />
    </svg>
);
