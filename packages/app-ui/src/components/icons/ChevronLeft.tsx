import { HTMLAttributes } from 'react';

export const ChevronLeft = (props: HTMLAttributes<SVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="21" fill="none" {...props}>
        <path
            fill="currentColor"
            d="m10.06 1.57-7.74 9.07 7.68 9.1-1.09.95-8.6-10.05L8.9.59l1.17.98Z"
        />
    </svg>
);
