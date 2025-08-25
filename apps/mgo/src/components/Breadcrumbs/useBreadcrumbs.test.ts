import { renderHook } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';

import { Location, matchRoutes, RouteMatch, useLocation } from 'react-router-dom';
import { useBreadcrumbs } from './useBreadcrumbs';
import { useTranslateBreadcrumb } from './useTranslateBreadcrumb';

vi.mock('react-router-dom', () => ({
    useLocation: vi.fn(),
    matchRoutes: vi.fn(),
}));

vi.mock('./useTranslateBreadcrumb', () => ({
    useTranslateBreadcrumb: vi.fn(),
}));

beforeEach(() => {
    vi.mocked(useTranslateBreadcrumb).mockReturnValue({
        translateBreadcrumb: vi.fn((label) => `translated(${label})`),
    });
    vi.mocked(matchRoutes).mockImplementation((_routes, pathname) => {
        return [{ route: { handle: { breadcrumb: `breadcrumb(${pathname})` } } }] as RouteMatch[];
    });
});

test('useBreadcrumbs translates the breadcrumbs', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: `/foo/bar/baz` } as Location);

    const { result } = renderHook(() =>
        useBreadcrumbs([] /* routes config is not used in the test */)
    );

    expect(result.current).toEqual([
        {
            href: ``,
            label: 'translated(breadcrumb())',
        },
        {
            href: `/foo`,
            label: 'translated(breadcrumb(/foo))',
        },
        {
            href: `/foo/bar`,
            label: 'translated(breadcrumb(/foo/bar))',
        },
        {
            href: `/foo/bar/baz`,
            label: 'translated(breadcrumb(/foo/bar/baz))',
        },
    ]);
});

test('useBreadcrumbs handles only root', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: `` } as Location);

    const { result } = renderHook(() =>
        useBreadcrumbs([] /* routes config is not used in the test */)
    );

    expect(result.current).toEqual([
        {
            href: ``,
            label: 'translated(breadcrumb())',
        },
    ]);
});

test('useBreadcrumbs skips routes without a breadcrumb config', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: `/foo/bar/baz` } as Location);

    vi.mocked(matchRoutes).mockImplementation((_routes, pathname) => {
        if (pathname === '/foo/bar' || pathname === '') {
            return [{ route: { handle: {} } }] as RouteMatch[];
        }
        return [{ route: { handle: { breadcrumb: `breadcrumb(${pathname})` } } }] as RouteMatch[];
    });

    const { result } = renderHook(() =>
        useBreadcrumbs([] /* routes config is not used in the test */)
    );

    expect(result.current).toEqual([
        {
            href: `/foo`,
            label: 'translated(breadcrumb(/foo))',
        },
        {
            href: `/foo/bar/baz`,
            label: 'translated(breadcrumb(/foo/bar/baz))',
        },
    ]);
});

test('useBreadcrumbs skips routes that have no match', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: `/foo/bar/baz` } as Location);

    vi.mocked(matchRoutes).mockImplementation((_routes, pathname) => {
        if (pathname === '/foo/bar' || pathname === '') {
            return [];
        }
        return [{ route: { handle: { breadcrumb: `breadcrumb(${pathname})` } } }] as RouteMatch[];
    });

    const { result } = renderHook(() =>
        useBreadcrumbs([] /* routes config is not used in the test */)
    );

    expect(result.current).toEqual([
        {
            href: `/foo`,
            label: 'translated(breadcrumb(/foo))',
        },
        {
            href: `/foo/bar/baz`,
            label: 'translated(breadcrumb(/foo/bar/baz))',
        },
    ]);
});

test('useBreadcrumbs returns empty array when there are no matches', () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: `/foo/bar/baz` } as Location);

    vi.mocked(matchRoutes).mockImplementation((_routes, _pathname) => []);

    const { result } = renderHook(() =>
        useBreadcrumbs([] /* routes config is not used in the test */)
    );

    expect(result.current).toEqual([]);
});
