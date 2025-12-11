import { type HTMLAttributes } from 'react';
import { useComposition } from '../../hooks/useComposition/useComposition';
import { cn, tw } from '../../utils';
import { type Size } from './sizes';

export interface TextBaseProps extends HTMLAttributes<HTMLElement> {
    readonly size?: Size;
}

export type TextProps = TextBaseProps &
    (
        | {
              asChild: boolean;
              as?: never;
          }
        | {
              asChild?: never;
              as?:
                  | 'p'
                  | 'h1'
                  | 'h2'
                  | 'h3'
                  | 'h4'
                  | 'h5'
                  | 'h6'
                  | 'span'
                  | 'div'
                  | 'dt'
                  | 'dd'
                  | 'nav';
          }
    );

const TextStyle: Record<Size, string> = {
    sm: tw`text-base leading-tight lg:text-lg lg:leading-relaxed`,
    md: tw`leading-snug-lg text-lg md:leading-normal lg:text-xl`,
    lg: tw`leading-tight-sm text-xl md:text-2xl md:leading-snug lg:text-3xl lg:leading-normal`,
};

export const Text = ({ as, asChild, size = 'md', className, ...rest }: TextProps) => {
    const tag = as ?? 'span';
    const { Comp } = useComposition({ asChild, tag });

    return (
        <Comp
            className={cn('text-t-label-primary font-sans font-normal', TextStyle[size], className)}
            {...rest}
        />
    );
};
