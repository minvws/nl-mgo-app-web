import type { SearchParamsOption } from 'ky';
import { expect, test } from 'vitest';
import { defaultsSearchParams } from './defaultsSearchParams';

test.each<[SearchParamsOption[], Record<string, string>]>([
    [
        [{ foo: 'bar', baz: 4, bool: true, bah: false }],
        { foo: 'bar', baz: '4', bool: 'true', bah: 'false' },
    ],
    [
        [
            { foo: 'bar', baz: 4, bool: true, bah: false },
            { baz: 10, bool: false, extra: 'lorem' },
        ],
        { foo: 'bar', baz: '10', bool: 'false', bah: 'false', extra: 'lorem' },
    ],
    [
        [
            '?foo=loremipsum&bool=true&bah=false',
            new URLSearchParams('?foo=bar&baz=4'),
            { baz: 10, bool: false, extra: 'lorem' },
        ],
        { foo: 'bar', baz: '10', bool: 'false', bah: 'false', extra: 'lorem' },
    ],
])(
    'combineSearchParams combines multiple url params, applying params from left to right',
    (params, expected) => {
        const result = defaultsSearchParams(...params);

        expect(result.size).toBe(Object.keys(expected).length);

        Object.entries(expected).forEach(([key, value]) => {
            expect(result.has(key, value)).toBe(true);
        });
    }
);
