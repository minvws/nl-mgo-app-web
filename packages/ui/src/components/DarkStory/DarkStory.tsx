/* c8 ignore start - This component is only used for documentation purposes */

import { type HTMLAttributes } from 'react';
import { cn } from '../../utils';
import { Stack } from '../Stack/Stack';

export type DarkStoryProps = HTMLAttributes<HTMLElement> & {
    readonly orientation?: 'horizontal' | 'vertical';
};

/**
 * A component that renders a story in both light and dark mode.
 * Only used for storybook documentation.
 */
export const DarkStory = ({ className, orientation, children, ...rest }: DarkStoryProps) => {
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
                    'flex-grow bg-white p-6 text-black',
                    orientation === 'horizontal' && 'w-1/2'
                )}
            >
                {children}
            </div>
            <div
                className={cn(
                    'dark flex-grow bg-[#050505] p-6 text-white',
                    orientation === 'horizontal' && 'w-1/2'
                )}
            >
                {children}
            </div>
        </Stack>
    );
};
