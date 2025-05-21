import { useMediaQueries } from '@react-hook/media-query';

const pxToEm = (px: number) => `${Math.round((px / 16) * 100) / 100}em`;
const pxToMinWidthQuery = (breakpointPx: number) => `(min-width: ${pxToEm(breakpointPx)})`;

// breakpoints should match the tailwind theme
export const breakpointQueries = {
    sm: pxToMinWidthQuery(640),
    md: pxToMinWidthQuery(768),
    lg: pxToMinWidthQuery(1024),
    xl: pxToMinWidthQuery(1280),
    '2xl': pxToMinWidthQuery(1536),
};

type QueryConfig = typeof breakpointQueries;
export type BreakpointSize = keyof QueryConfig;
export type ResponsiveConfig<T = unknown> = { [key in BreakpointSize]?: T } & { base: T };
export type ResponsiveProp<T = unknown> = ResponsiveConfig<T> | T;

const specificityOrder = ['2xl', 'xl', 'lg', 'md', 'sm'] as BreakpointSize[];

function isResponsiveConfig<T>(config: ResponsiveProp<T>): config is ResponsiveConfig<T> {
    return (
        typeof config === 'object' &&
        config !== null &&
        Object.prototype.hasOwnProperty.call(config, 'base')
    );
}

export function useResponsive<T>(value: ResponsiveProp<T>): T {
    const queries: Partial<QueryConfig> = {};
    const config: ResponsiveConfig<T> = isResponsiveConfig(value) ? value : { base: value };

    (Object.keys(config) as (keyof ResponsiveConfig)[]).forEach((key) => {
        if (key === 'base') return;
        queries[key] = breakpointQueries[key];
    });

    const { matches } = useMediaQueries(queries);
    for (const key of specificityOrder) {
        if (matches[key]) return config[key]!;
    }

    return config.base;
}
