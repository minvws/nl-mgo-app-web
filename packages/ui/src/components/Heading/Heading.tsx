import { type HTMLAttributes } from 'react';
import { useNavFocusRef } from '../../hooks';
import { useComposition } from '../../hooks/useComposition/useComposition';
import { cn, tw } from '../../utils';
import { type Size } from './sizes';

export interface HeadingBaseProps extends HTMLAttributes<HTMLElement> {
    readonly size?: Size;
    readonly focusOnRender?: boolean;
    readonly focusOnRenderKey?: unknown;
}

export type HeadingProps = HeadingBaseProps &
    (
        | {
              asChild: boolean;
              as?: never;
          }
        | {
              asChild?: never;
              as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
          }
    );

const HeadingStyle: Record<Size, string> = {
    xs: tw`leading-snug-lg text-lg md:leading-normal lg:text-xl`,
    sm: tw`leading-tight-sm text-xl md:text-2xl md:leading-snug lg:text-3xl lg:leading-normal`,
    md: tw`text-3xl md:text-4xl lg:text-5xl`,
    lg: tw`text-6xl md:text-7xl lg:text-8xl`,
    xl: tw`lg:text-10xl text-t-cat-rijkslint text-8xl md:text-9xl`,
};

export const Heading = ({
    as,
    asChild,
    size = 'md',
    focusOnRender,
    focusOnRenderKey,
    className,
    ...rest
}: HeadingProps) => {
    const tag = as ?? 'div';
    const { Comp } = useComposition({ asChild, tag });
    const navFocusRef = useNavFocusRef<HTMLHeadingElement>(focusOnRenderKey);

    return (
        <Comp
            ref={focusOnRender ? navFocusRef : null}
            className={cn(
                'text-t-label-primary font-sans leading-none font-bold',
                HeadingStyle[size],
                className
            )}
            {...rest}
        />
    );
};
