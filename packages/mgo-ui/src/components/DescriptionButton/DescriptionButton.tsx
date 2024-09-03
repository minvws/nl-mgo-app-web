import { useComposition } from '../../hooks';
import { type CompositionPropsWithoutChildren } from '../../hooks/useComposition/useComposition';
import { cn, focusStyle } from '../../utils';
import { Card } from '../Card/Card';
import { DescriptionItem, type DescriptionItemProps } from '../DescriptionItem/DescriptionItem';
import { Icon, type IconProps } from '../Icon/Icon';

export type DescriptionButtonProps = DescriptionItemProps &
    CompositionPropsWithoutChildren &
    IconProps;

export const DescriptionButton = ({
    term,
    details,
    icon,
    className,
    asChild,
    children,
    ...rest
}: DescriptionButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Card className="rounded-none border-0 p-0 shadow-none first:rounded-t-lg last:rounded-b-lg hover:bg-gray-100 md:gap-2 dark:hover:bg-[#444444]">
            <Comp
                className={cn(
                    'flex w-full items-center justify-between gap-1 p-4 text-left',
                    focusStyle,
                    className
                )}
                {...rest}
            >
                <Slottable>{children}</Slottable>
                <DescriptionItem term={term} details={details} />
                <Icon icon={icon} className={cn('h-8 w-8 text-gray-400')} />
            </Comp>
        </Card>
    );
};
