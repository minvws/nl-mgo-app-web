import { expect, test } from 'vitest';
import { defaultsSearchParams } from './defaultsSearchParams';

test('defaultsSearchParams returns same values if there is only a single param', () => {
    const result = defaultsSearchParams({ foo: 'bar', baz: 4, bool: true, bah: false });

    expect(result.get('foo')).toBe('bar');
    expect(result.get('baz')).toBe('4');
    expect(result.get('bool')).toBe('true');
    expect(result.get('bah')).toBe('false');
    expect(result.size).toBe(4);
});

test('defaultsSearchParams combines multiple url params, applying params from left to right', () => {
    const result = defaultsSearchParams(
        { foo: 'bar', baz: 4, bool: true, bah: false },
        { baz: 10, bool: false, extra: 'lorem' }
    );

    expect(result.get('foo')).toBe('bar');
    expect(result.get('baz')).toBe('10');
    expect(result.get('bool')).toBe('false');
    expect(result.get('bah')).toBe('false');
    expect(result.get('extra')).toBe('lorem');
    expect(result.size).toBe(5);
});

test('defaultsSearchParams can handle different types of params arguments', () => {
    const result = defaultsSearchParams(
        undefined,
        '?foo=loremipsum&bool=true&bah=false',
        [
            ['foo', 'boo'],
            ['baz', '20'],
            ['bool', 'false'],
        ],
        new URLSearchParams('?foo=bar&baz=4'),
        undefined,
        { baz: 10, extra: 'lorem' },
        [
            ['baz', '1'],
            ['baz', '2'],
        ]
    );

    expect(result.get('foo')).toBe('bar');
    expect(result.getAll('baz')).toEqual(['1', '2']);
    expect(result.get('bool')).toBe('false');
    expect(result.get('bah')).toBe('false');
    expect(result.get('extra')).toBe('lorem');
    expect(result.size).toBe(6);
});

test('defaultsSearchParams can correctly override previously set arrays', () => {
    const result = defaultsSearchParams(
        [
            ['foo', '1'],
            ['foo', '2'],
            ['foo', '3'],
        ],
        { foo: 'lorem' }
    );

    expect(result.get('foo')).toBe('lorem');
    expect(result.size).toBe(1);
});
