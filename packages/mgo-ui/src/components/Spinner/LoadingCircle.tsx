import { type HTMLAttributes } from 'react';

export interface LoadingCircleProps extends HTMLAttributes<SVGElement> {}

export const LoadingCircle = (props: LoadingCircleProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="53" fill="none" {...props}>
        <path
            className="fill-none stroke-gray-50 dark:stroke-gray-700"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M48 27a22 22 0 1 1-44-1 22 22 0 0 1 44 1h0Z"
        />
        <path
            className="stroke-sky-blue-600 fill-none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M26 5a22 22 0 0 1 22 22"
        />
    </svg>
);
