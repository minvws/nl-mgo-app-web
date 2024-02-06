import { DynamicElement } from '../DynamicElement/DynamicElement';
import type { OneOf } from '../../types/oneOf';

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLElement>, 'disabled'>;
type LinkProps = React.AnchorHTMLAttributes<HTMLElement>;
type CustomProps = {
    isDisabled?: boolean;
};

export type ButtonOrLinkProps = OneOf<[ButtonProps, LinkProps]> & CustomProps;

/**
 * A small utlitity component that makes it easy to render a button or a link tag based whether an href is given.
 */
export const ButtonOrLink = (props: ButtonOrLinkProps) => {
    const {
        href,
        isDisabled,
        'aria-disabled': ariaDisabled,
        onClick,
        type,
        ...rest
    } = props as LinkProps & CustomProps;
    const as: keyof HTMLElementTagNameMap = href !== undefined ? 'a' : 'button';

    /**
     * Use `aria-disabled` for disabling, but keep the ability to focus to
     * improve UX for those who use screenreaders
     * @see: https://css-tricks.com/making-disabled-buttons-more-inclusive/
     */
    const disabled = isDisabled || ariaDisabled ? true : undefined;

    return (
        <DynamicElement
            as={as}
            aria-disabled={disabled}
            href={disabled ? undefined : href}
            onClick={disabled ? undefined : onClick}
            type={as === 'a' ? type : type || 'button'}
            {...rest}
        />
    );
};
