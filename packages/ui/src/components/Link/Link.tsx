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
    default: cn('text-dark-blue-700 visited:text-dark-blue-900 underline hover:no-underline'),
    dotted: cn(
        'text-[#01689B] underline decoration-dotted hover:decoration-solid dark:text-[#66A4C3]'
    ),
    monochrome: cn(
        'text-white no-underline visited:text-white hover:underline dark:text-black dark:visited:text-black'
    ),
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
                    <Icon icon={iconRight} className="ml-1.5 inline-block group-hover:hidden" />
                    <Icon
                        icon={`${iconRight}-fill`}
                        className="ml-1.5 hidden group-hover:inline-block"
                    />
                </>
            )}
        </Comp>
    );
};
