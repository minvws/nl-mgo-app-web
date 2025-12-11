import { type AnchorHTMLAttributes } from 'react';
import { useComposition } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon';
import { IconName } from '../Icon/icons';
import { type Variant } from './variants';

type IconsWithFillVariants =
    Extract<IconName, `${string}-fill`> extends `${infer R}-fill`
        ? R extends IconName
            ? R
            : never
        : never;

type AnchorOrCompositionProps =
    | {
          href?: never; // Please don't combine Anchor attributes with `asChild`, pass the props to the child instead.
          asChild: true;
      }
    | {
          href: string;
          asChild?: never;
      };

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
    readonly onClick?: never; // Please use `asChild` instead
    readonly variant?: Variant;
    readonly iconRight?: IconsWithFillVariants;
} & AnchorOrCompositionProps;

const linkStyle: Record<Variant, string> = {
    default: cn(
        'text-t-action-link-default-text hover:text-t-action-link-hover-text visited:text-t-action-link-visited-text underline hover:no-underline'
    ),
    dotted: cn(
        'text-t-action-link-default-text underline decoration-dotted hover:decoration-solid'
    ),
    inverted: cn('text-t-label-invert no-underline hover:underline'),
};

export const Link = ({
    variant = 'default',
    asChild,
    children,
    className,
    iconRight,
    ...rest
}: LinkProps) => {
    const { Comp, Slottable } = useComposition({ asChild, tag: 'a' });

    return (
        <Comp
            className={cn('group cursor-pointer', linkStyle[variant], focusStyle, className)}
            {...rest}
        >
            <Slottable>{children}</Slottable>
            {iconRight && (
                <>
                    <Icon
                        icon={iconRight}
                        className="relative -top-[1px] ml-1.5 inline-block group-hover:hidden"
                    />
                    <Icon
                        icon={`${iconRight}-fill`}
                        className="relative -top-[1px] ml-1.5 hidden group-hover:inline-block"
                    />
                </>
            )}
        </Comp>
    );
};
