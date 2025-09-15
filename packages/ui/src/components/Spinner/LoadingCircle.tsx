import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { type Variant } from './variants';

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
    white: {
        circle: 'stroke-white/50',
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
            d="M48 27c-.27 11.88-10.117 21.506-22 21.506-12.072 0-22.006-9.934-22.006-22.006 0-.167.002-.333.006-.5.27-11.88 10.117-21.506 22-21.506 12.072 0 22.006 9.934 22.006 22.006 0 .167-.002.333-.006.5Z"
        />
        <path
            className={cn('fill-none', variantStyles[variant].fill)}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="7"
            transform="translate(.005681 -.505681)"
            d="M26 5c12.069 0 22 9.931 22 22"
        />
    </svg>
);
