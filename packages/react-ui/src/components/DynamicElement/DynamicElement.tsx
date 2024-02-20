import type { ComponentType, HTMLAttributes } from 'react';

export interface DynamicElementProps<
    Tag extends keyof HTMLElementTagNameMap = keyof HTMLElementTagNameMap,
> extends HTMLAttributes<HTMLElement> {
    as?: Tag | ComponentType;
}

/**
 * A small utility component that makes it easy to change the rendered element type.
 */
export const DynamicElement = ({
    as: Component = 'div',
    ...rest
}: DynamicElementProps & {
    /** avoids typing issues as the actual component type is unknown */
    [key: string]: unknown;
}) => {
    return <Component {...rest} />;
};
