import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines the functionality of `clsx` and `twMerge`
 * Construct className strings conditionally and merge any tailwind classes
 */
export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}
