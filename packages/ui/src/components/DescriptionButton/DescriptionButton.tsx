import { useComposition } from '../../hooks';
import { type CompositionPropsWithoutChildren } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn, tw } from '../../utils';
import { Card } from '../Card/Card';
import { DescriptionItem, type DescriptionItemProps } from '../DescriptionItem/DescriptionItem';
import { Icon, type IconProps } from '../Icon/Icon';
import { Text } from '../Text/Text';
import { type Variant } from './variants';

export type DescriptionButtonProps = DescriptionItemProps &
    CompositionPropsWithoutChildren &
    IconProps & {
        readonly variant?: Variant;
        readonly loadingText?: string;
        readonly isLoading?: boolean;
    };

const variantStyles: Record<Variant, string> = {
    default: 'md:gap-2',
    highlighted: tw`[&_*]:text-sky-blue-700 [&_*]:dark:text-sky-blue-300`,
};
const variantHoverStyles: Record<Variant, string> = {
    default: 'hover:bg-gray-100 dark:hover:bg-[#444444]',
    highlighted: tw`hover:bg-gray-100 dark:hover:bg-gray-800`,
};

export const DescriptionButton = ({
    term,
    details,
    icon,
    className,
    asChild,
    variant = 'default',
    loadingText,
    isLoading = false,
    onClick,
    children,
    ...rest
}: DescriptionButtonProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });

    return (
        <Card
            asChild
            className={cn(
                'rounded-none border-0 p-0 shadow-none first:rounded-t-lg last:rounded-b-lg',
                'flex w-full items-center justify-between gap-1 p-4 text-left',
                variantStyles[variant],
                variantHoverStyles[variant],
                isLoading && 'cursor-progress',
                focusStyle,
                className
            )}
            onClick={isLoading ? undefined : onClick}
        >
            <Comp {...rest}>
                <Slottable>{children}</Slottable>
                <DescriptionItem term={term} details={details} />

                {isLoading ? (
                    <div className="ml-auto flex items-center gap-2">
                        <Text className="text-nowrap">{loadingText}</Text>
                        <Icon
                            data-testid="spinner"
                            icon="progress-activity"
                            className="size-8 animate-spin p-0"
                        />
                    </div>
                ) : (
                    <Icon icon={icon} className={cn('size-8 text-gray-400')} />
                )}
            </Comp>
        </Card>
    );
};
