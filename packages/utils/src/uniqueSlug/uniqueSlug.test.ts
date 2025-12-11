import { expect, test } from 'vitest';

import { createUniqueSlug } from './uniqueSlug.js';

test.each<[string, string[], string]>([
    ['test', ['test'], 'test-2'],
    ['test', [], 'test'],
    ['test', ['foo', 'bar'], 'test'],
])('always creates a unique slug for: %s', (value, slugs, expected) => {
    const uniqueSlug = createUniqueSlug(value, slugs);
    expect(uniqueSlug).toBe(expected);
});

test.each<[string | null | undefined, string[], string]>([
    [null, [], 'undefined'],
    [null, ['undefined'], 'undefined-2'],
    [undefined, [], 'undefined'],
    ['', [], 'undefined'],
    [' ', [], 'undefined'],
])('can handle empty values and always creates a unique slug for: %s', (value, slugs, expected) => {
    const uniqueSlug = createUniqueSlug(value as string, slugs);
    expect(uniqueSlug).toBe(expected);
});

test.each<[string, string[], string]>([
    ['/special\nchars & ārę $ [] ręmövēd  ', ['foo', 'bar'], 'special-chars-are-removed'],
    [
        '/special\nchars & ārę $ [] ręmövēd  ',
        ['foo', 'special-chars-are-removed'],
        'special-chars-are-removed-2',
    ],
])(
    'createUniqueSlug removes special characters and replaces diacritics for: %s',
    (value, slugs, expected) => {
        const uniqueSlug = createUniqueSlug(value, slugs);
        expect(uniqueSlug).toBe(expected);
    }
);
