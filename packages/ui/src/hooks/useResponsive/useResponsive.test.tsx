import { renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import { breakpointQueries, useResponsive, type ResponsiveConfig } from './useResponsive';
import { mockMatchMedia } from '../../../test/helpers';

const { sm, md, lg, xl, '2xl': xxl } = breakpointQueries;
const allQueries = [sm, md, lg, xl, xxl];

test.each<[string[], ResponsiveConfig<string>, string]>([
    [[], { base: 'base', sm: 'sm' }, 'base'],
    [allQueries, { base: 'base', sm: 'sm' }, 'sm'],
    [allQueries, { base: 'base', sm: 'sm', lg: 'lg' }, 'lg'],
    [[sm, md], { base: 'base', sm: 'sm', lg: 'lg' }, 'sm'],
    [[sm, md, lg], { base: 'base', sm: 'sm', md: 'md' }, 'md'],
    [[sm, md, lg], { base: 'base', xl: 'xl' }, 'base'],
])(
    'returns the value matching the largest breakpoint, or base if there is no match %#',
    async (matches, config, expected) => {
        mockMatchMedia(matches);

        const { result } = renderHook(() => useResponsive(config));

        expect(result.current).toEqual(expected);
    }
);

test.each<[string[], ResponsiveConfig<unknown>, unknown]>([
    [[], { base: 1, sm: 2 }, 1],
    [allQueries, { base: 1, md: 2 }, 2],
    [[], { base: true, sm: false }, true],
    [allQueries, { base: true, md: false }, false],
    [[], { base: { foo: 'bar' }, sm: { bar: 'foo' } }, { foo: 'bar' }],
    [allQueries, { base: { foo: 'bar' }, md: { bar: 'foo' } }, { bar: 'foo' }],
])('works with any config value %#', async (matches, config, expected) => {
    mockMatchMedia(matches);

    const { result } = renderHook(() => useResponsive(config));

    expect(result.current).toEqual(expected);
});

test.each<[string[], unknown, unknown]>([
    [[], { foo: 'bar' }, { foo: 'bar' }],
    [allQueries, 4, 4],
    [[], true, true],
    [allQueries, false, false],
    [[], undefined, undefined],
    [allQueries, null, null],
    [allQueries, 'string', 'string'],
])('works with any single value %#', async (matches, config, expected) => {
    mockMatchMedia(matches);

    const { result } = renderHook(() => useResponsive(config));

    expect(result.current).toEqual(expected);
});
