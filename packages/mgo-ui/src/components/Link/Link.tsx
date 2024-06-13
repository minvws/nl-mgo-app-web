import { type AnchorHTMLAttributes } from 'react';
import { useComposition } from '../../hooks/useComposition/useComposition';
import { cn, focusStyle } from '../../utils';

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
    onClick?: never; // Please use `asChild` instead
} & AnchorOrCompositionProps;

export const Link = ({ asChild, children, className, ...rest }: LinkProps) => {
    const { Comp } = useComposition({ asChild, tag: 'a' });

    return (
        <Comp
            className={cn(
                `text-dark-blue-700 visited:text-dark-blue-900 cursor-pointer underline hover:no-underline`,
                focusStyle,
                className
            )}
            {...rest}
        >
            {children}
        </Comp>
    );
};
