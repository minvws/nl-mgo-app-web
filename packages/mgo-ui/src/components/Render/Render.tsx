import { type ReactNode } from 'react';

export type RenderComp<T> = ReactNode | ((props: T) => ReactNode);

export type RenderProps<T> = {
    children: RenderComp<T>;
} & Omit<T, 'children'>;

/**
 * Small utility component to render children as JSX or as a function.
 * Function arguments are passed as props.
 */
export function Render<T>({ children, ...props }: RenderProps<T>) {
    return typeof children === 'function' ? children(props as T) : children;
}
