import { type AllOrNone } from '@minvws/mgo-utils';
import { forwardRef, type ButtonHTMLAttributes, type ReactElement } from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { type IconName } from '../Icon/icons';
import { Spinner } from '../Spinner/Spinner';
import { Text } from '../Text/Text';
import { ButtonIcon } from './ButtonIcon';
import { type Variant } from './variants';

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement>, CompositionProps {
    readonly fullWidth?: boolean;
    readonly variant?: Variant;
    readonly leftIcon?: IconName | ReactElement;
    readonly rightIcon?: IconName | ReactElement;
}

export interface ButtonLoadingProps {
    readonly loading: boolean;
    readonly loadingSpinnerOnly?: boolean;
    readonly loadingTextScreenReader: string;
}

export type ButtonProps = ButtonBaseProps & AllOrNone<ButtonLoadingProps>;

const typeColors: Record<Variant, string> = {
    solid: cn(
        'border border-t-action-solid-default-bg hover:border-t-action-solid-hover-bg active:border-t-action-solid-active-bg',
        'bg-t-action-solid-default-bg hover:bg-t-action-solid-hover-bg active:bg-t-action-solid-active-bg',
        'text-t-action-solid-default-text hover:text-t-action-solid-hover-text active:text-t-action-solid-active-text',
        'focus-visible:bg-t-action-solid-hover-bg'
    ),
    outline: cn(
        'border border-t-action-outline-default-border hover:border-t-action-outline-hover-border active:border-t-action-outline-active-border',
        'bg-transparent hover:bg-t-action-outline-hover-bg active:bg-t-action-outline-active-bg',
        'text-t-action-outline-default-text hover:text-t-action-outline-hover-text active:text-t-action-outline-active-text',
        'focus-visible:bg-t-action-outline-hover-bg'
    ),
    ghost: cn(
        'border border-transparent',
        'bg-transparent hover:bg-t-action-ghost-hover-bg active:bg-t-action-ghost-active-bg',
        'text-t-action-ghost-default-text hover:text-t-action-ghost-hover-text active:text-t-action-ghost-active-text',
        'focus-visible:bg-t-action-ghost-hover-bg'
    ),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
    const {
        asChild,
        onClick,
        variant = 'solid',
        fullWidth,
        children,
        className,
        leftIcon,
        rightIcon,
        loading,
        loadingTextScreenReader,
        loadingSpinnerOnly,
        ...rest
    } = props as ButtonBaseProps & ButtonLoadingProps;
    const { Comp, composeWrappedSlottable } = useComposition({ asChild, tag: 'button' });
    const showSpinnerOnly = loading && loadingSpinnerOnly;
    const showDefaultSpinner = loading && !leftIcon && !rightIcon && !showSpinnerOnly;

    const ButtonSpinner = (
        <Spinner className="absolute size-6" variant={variant === 'solid' ? 'white' : 'gray'} />
    );

    const Label = composeWrappedSlottable({
        asChild,
        children,
        wrapperProps: {
            'aria-hidden': showSpinnerOnly,
            className: cn({
                invisible: showSpinnerOnly,
                'flex grow justify-start text-left': fullWidth && rightIcon,
            }),
        },
    });

    return (
        <>
            {loading !== undefined && (
                <output className="sr-only" aria-live="polite">
                    {loading && loadingTextScreenReader}
                </output>
            )}

            <Text
                size="md"
                asChild
                className={cn(
                    'font-bold',
                    `relative inline-flex items-center justify-center`,
                    'px-4 py-2',
                    'rounded-sm outline-hidden',
                    'cursor-pointer transition-colors duration-200',
                    focusStyle,
                    typeColors[variant],
                    className,
                    {
                        'w-full': fullWidth,
                        'pl-4': leftIcon,
                        'pr-4': rightIcon,
                    }
                )}
            >
                <Comp
                    ref={ref}
                    onClick={loading ? undefined : onClick}
                    aria-disabled={loading}
                    {...rest}
                >
                    {leftIcon && !showSpinnerOnly && (
                        <ButtonIcon
                            className="me-2"
                            icon={leftIcon}
                            loading={loading}
                            spinner={ButtonSpinner}
                        />
                    )}

                    {Label}

                    {showSpinnerOnly && ButtonSpinner}

                    {((rightIcon && !showSpinnerOnly) || showDefaultSpinner) && (
                        <ButtonIcon
                            className="ms-2"
                            icon={rightIcon}
                            loading={loading}
                            spinner={ButtonSpinner}
                        />
                    )}
                </Comp>
            </Text>
        </>
    );
});
