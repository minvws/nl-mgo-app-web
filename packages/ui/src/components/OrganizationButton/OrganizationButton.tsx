import { Slottable } from '@radix-ui/react-slot';
import { type HTMLAttributes } from 'react';
import {
    useComposition,
    type CompositionPropsWithoutChildren,
} from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Card } from '../Card/Card';
import { Icon } from '../Icon/Icon';
import { Stack } from '../Stack/Stack';
import { Text } from '../Text/Text';

type Details = {
    readonly title: string;
    readonly subTitle?: string;
    readonly infoMessage?: string;
    readonly successMessage?: string;
    readonly disabled?: boolean;
};

export type OrganizationButtonProps = Omit<
    HTMLAttributes<HTMLElement>,
    'disabled' | 'aria-disabled'
> &
    CompositionPropsWithoutChildren &
    Details;

export const OrganizationButton = ({
    title,
    subTitle,
    infoMessage,
    successMessage,
    className,
    disabled = false,
    onClick,
    asChild,
    children,
    ...rest
}: OrganizationButtonProps) => {
    const { Comp } = useComposition({ asChild, tag: 'button' });

    return (
        <Card
            asChild
            className={cn(
                'group p-4 text-left break-all md:p-6',
                'flex flex-col items-start justify-between md:flex-row',
                'cursor-pointer transition-colors duration-200',
                'not-aria-disabled:hover:bg-t-bg-tertiary aria-disabled:cursor-not-allowed',
                focusStyle,
                className
            )}
            aria-disabled={disabled}
            onClick={disabled ? undefined : onClick}
            {...rest}
        >
            <Comp>
                <Slottable>{children}</Slottable>

                <div className="flex w-full flex-row justify-between">
                    <Stack className="grow gap-0">
                        <Text
                            size="lg"
                            className="group-aria-disabled:text-t-label-secondary font-bold"
                        >
                            {title}
                        </Text>
                        {subTitle && <Text className="text-t-label-secondary">{subTitle}</Text>}
                    </Stack>

                    {!disabled && (
                        <Icon
                            icon="chevron_right"
                            className="fill-t-symbol-secondary relative -right-[6px] h-8 w-8 shrink-0 md:hidden"
                        />
                    )}
                </div>

                <Stack className="mt-2 shrink-0 items-end gap-0 md:mt-0">
                    {!disabled && (
                        <Icon
                            icon="chevron_right"
                            className="fill-t-symbol-secondary relative -right-[6px] hidden h-8 w-8 shrink-0 md:block"
                        />
                    )}

                    {infoMessage && (
                        <Text className="text-t-state-informative flex flex-row items-center gap-2 font-bold md:flex-row-reverse">
                            <Icon icon="link_off" className="text-xl" />
                            <span>{infoMessage}</span>
                        </Text>
                    )}
                    {successMessage && (
                        <Text className="text-t-state-confirmation flex flex-row items-center gap-2 font-bold md:flex-row-reverse">
                            <Icon icon="check-fill" className="text-xl" />
                            <span>{successMessage}</span>
                        </Text>
                    )}
                </Stack>
            </Comp>
        </Card>
    );
};
