import { useMemo, type HTMLAttributes, type ReactElement } from 'react';
import { cn } from '../../utils';
import { DetailListButton } from './DetailListButton';
import { type Gap } from './gap';
import { DetailListContext, type DetailListContextState } from './DetailListContext';

export type DetailListProps = HTMLAttributes<HTMLElement> & {
    readonly gap?: Gap;
    readonly children?: ReactElement | ReactElement[];
};

export const DetailList = ({ gap = 'normal', className, children, ...rest }: DetailListProps) => {
    const contextValue = useMemo<DetailListContextState>(
        () => ({
            gap,
        }),
        [gap]
    );

    const gapMap: Record<Gap, string> = {
        normal: 'gap-2 gap-md-3',
        line: 'gap-[1px]',
    };

    return (
        <div className={cn('flex flex-col', gapMap[gap], className)} {...rest}>
            <DetailListContext.Provider value={contextValue}>{children}</DetailListContext.Provider>
        </div>
    );
};

DetailList.Button = DetailListButton;
