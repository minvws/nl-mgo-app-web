import { type AnchorHTMLAttributes } from 'react';
import { useComposition } from '../../hooks/useComposition/useComposition';
import { focusStyle } from '../../styles';
import { cn } from '../../utils';
import { type Variant } from './variants';

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
} & AnchorOrCompositionProps;

const linkStyle: Record<Variant, string> = {
    default: cn('text-dark-blue-700 visited:text-dark-blue-900 underline hover:no-underline'),
    monochrome: cn(
        'text-white no-underline visited:text-white hover:underline dark:text-black dark:visited:text-black'
    ),
};

export const Link = ({ variant = 'default', asChild, children, className, ...rest }: LinkProps) => {
    const { Comp } = useComposition({ asChild, tag: 'a' });

    return (
        <Comp className={cn('cursor-pointer', linkStyle[variant], focusStyle, className)} {...rest}>
            {children}
        </Comp>
    );
};
