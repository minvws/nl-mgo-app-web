/* c8 ignore start - This component is only used for documentation purposes */

import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Stack } from '../Stack/Stack';

export type DarkStoryProps = HTMLAttributes<HTMLElement> & {
    readonly orientation?: 'horizontal' | 'vertical';
    readonly lightClassName?: string;
    readonly darkClassName?: string;
};

/**
 * A component that renders a story in both light and dark mode.
 * Only used for storybook documentation.
 */
export const DarkStory = ({
    className,
    orientation,
    children,
    lightClassName,
    darkClassName,
    ...rest
}: DarkStoryProps) => {
    return (
        <Stack
            className={cn(
                'w-full flex-row gap-0',
                orientation === 'vertical' && 'flex-col',
                className
            )}
            {...rest}
        >
            <div
                className={cn(
                    'grow bg-gray-50 p-6',
                    orientation === 'horizontal' && 'w-1/2',
                    lightClassName
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    'dark grow bg-gray-950 p-6',
                    orientation === 'horizontal' && 'w-1/2',
                    darkClassName
                )}
            >
                {children}
            </div>
        </Stack>
    );
};
