/* eslint-disable react-refresh/only-export-components */
import {
    DocumentProps,
    NodeProps,
    PageProps,
    type TextProps,
    type ViewProps,
} from '@react-pdf/renderer';
import { CSSProperties, type PropsWithChildren } from 'react';

type StyleSheetCreate = typeof import('@react-pdf/renderer').StyleSheet.create;

// Extract Style type from Styles interface as it is not exported by @react-pdf/renderer
type Styles = Parameters<StyleSheetCreate>[0];
export type Style = Styles[string];

/**
 * Attempts to normalize a style object into a CSSProperties object.
 * Note that this is a best effort attempt and may not work for all styles.
 */
function normalizeStyles(style: Style | Style[]): CSSProperties {
    if (!style) return {};
    if (Array.isArray(style)) {
        return style.reduce((acc, s) => ({ ...acc, ...s }), {}) as CSSProperties;
    }
    return style as CSSProperties;
}

function mockPdfComponent<Props extends NodeProps>(Component: 'div' | 'p') {
    return ({
        fixed: _fixed,
        break: _break,
        style,
        children,
        ...rest
    }: PropsWithChildren<Props>) => (
        <Component {...rest} style={normalizeStyles(style)}>
            {children}
        </Component>
    );
}
export const Document = mockPdfComponent<DocumentProps>('div');
export const Page = mockPdfComponent<PageProps>('div');
export const View = mockPdfComponent<ViewProps>('div');
export const Text = ({ children, render, style, ...rest }: PropsWithChildren<TextProps>) => {
    if (render) {
        children = render({ pageNumber: 1, totalPages: 1, subPageNumber: 1, subPageTotalPages: 1 });
    }

    return <p {...rest}>{children}</p>;
};

export const StyleSheet = {
    create: (styles: Styles) => styles,
};
