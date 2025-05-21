import { type HTMLAttributes, type ReactElement } from 'react';
import { type CompositionProps, useComposition } from '../../hooks';
import { cn } from '../../utils';
import { type Gap } from './gap';

export type ListWrapperProps = HTMLAttributes<HTMLElement> &
    CompositionProps & {
        readonly gap?: Gap;
        readonly children?: ReactElement | ReactElement[];
    };

export const ListWrapper = ({
    gap = 'normal',
    className,
    asChild,
    children,
    ...rest
}: ListWrapperProps) => {
    const { Comp } = useComposition({ asChild, tag: 'ul' });

    const gapMap: Record<Gap, string> = {
        normal: 'gap-2 gap-md-3',
        line: 'gap-none [&>*]:border-b [&>*]:border-gray-200 last:[&>*]:border-b-0 dark:[&>*]:border-[#4D4D4D] [&>*]:rounded-none first:[&>*]:rounded-t-lg last:[&>*]:rounded-b-lg',
    };

    return (
        <Comp className={cn('flex flex-col', gapMap[gap], className)} {...rest}>
            {children}
        </Comp>
    );
};
