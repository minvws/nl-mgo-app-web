import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Fixes the accidental removal of `leading-*` classes.
 * @see: https://github.com/dcastil/tailwind-merge/issues/573
 */
const twMerge = extendTailwindMerge({
    override: {
        conflictingClassGroups: {
            'font-size': [],
        },
    },
});

/**
 * Combines the functionality of `clsx` and `twMerge`
 * Construct className strings conditionally and merge any tailwind classes
 */
export function cn(...args: ClassValue[]) {
    return twMerge(clsx(args));
}
