import { type AllOrNone } from '@minvws/mgo-utils';
import {
    cloneElement,
    forwardRef,
    isValidElement,
    ReactNode,
    type ButtonHTMLAttributes,
    type ReactElement,
} from 'react';
import { useComposition, type CompositionProps } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { type IconName } from '../Icon/icons';
import { Spinner } from '../Spinner/Spinner';
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
    solid: cn('bg-sky-blue-600 hover:bg-dark-blue-700 text-white'),
    light: cn(
        'text-sky-blue-700 bg-sky-blue-700/10  hover:bg-sky-blue-700/5',
        'dark:text-sky-blue-300 dark:bg-sky-blue-300/10  dark:hover:bg-sky-blue-300/5'
    ),
    outline: cn(
        'border border-gray-200 bg-white text-black hover:bg-gray-50',
        'dark:border-gray-500 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-700'
    ),
    ghost: cn(
        'text-dark-blue-700 hover:text-dark-blue-400',
        'dark:text-light-blue-300 hover:dark:text-light-blue-200'
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
    const { Comp, Slottable } = useComposition({ asChild, tag: 'button' });
    const showSpinnerOnly = loading && loadingSpinnerOnly;

    const ButtonSpinner = (
        <Spinner className="absolute size-6" variant={variant === 'solid' ? 'white' : 'gray'} />
    );

    const LabelWrapper = ({ children }: { readonly children: ReactNode }) => (
        <span
            aria-hidden={showSpinnerOnly}
            className={cn({
                invisible: showSpinnerOnly,
                'flex flex-grow justify-start': fullWidth && rightIcon,
            })}
        >
            {children}
        </span>
    );

    const Label =
        // Slottable does not work when wrapped, this solves that issue.
        // For more details see: https://github.com/radix-ui/primitives/issues/1825#issuecomment-2123042290
        asChild && isValidElement(children) ? (
            <Slottable>
                {cloneElement(
                    children,
                    children.props,
                    <LabelWrapper>{children.props.children}</LabelWrapper>
                )}
            </Slottable>
        ) : (
            <LabelWrapper>
                <Slottable>{children}</Slottable>
            </LabelWrapper>
        );

    return (
        <>
            {loading !== undefined && (
                <output className="sr-only" aria-live="polite">
                    {loading && loadingTextScreenReader}
                </output>
            )}

            <Comp
                ref={ref}
                onClick={loading ? undefined : onClick}
                aria-disabled={loading}
                className={cn(
                    `relative inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold leading-normal outline-none md:py-4`,
                    focusStyle,
                    typeColors[variant],
                    className,
                    {
                        'w-full': fullWidth,
                        'pl-4': leftIcon,
                        'pr-4': rightIcon,
                    }
                )}
                {...rest}
            >
                {(leftIcon || (loading && !rightIcon && !loadingSpinnerOnly)) && (
                    <span
                        aria-hidden
                        className="relative me-2 inline-flex min-h-[1em] min-w-[1em] shrink-0 self-center text-[1.5em]"
                    >
                        {loading && !loadingSpinnerOnly && !rightIcon && ButtonSpinner}

                        <ButtonIcon
                            icon={leftIcon}
                            className={cn({ invisible: loading && !rightIcon })}
                        />
                    </span>
                )}

                {Label}

                {showSpinnerOnly && ButtonSpinner}

                {rightIcon && (
                    <span
                        aria-hidden
                        className="relative ms-2 inline-flex min-h-[1em] min-w-[1em] shrink-0 self-center text-[1.5em]"
                    >
                        {loading && !loadingSpinnerOnly && ButtonSpinner}

                        <ButtonIcon icon={rightIcon} className={cn({ invisible: loading })} />
                    </span>
                )}
            </Comp>
        </>
    );
});
