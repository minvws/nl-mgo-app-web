import { expect, test } from 'vitest';
import { normalizeLabel } from './normalizeLabel';

test.each<[string, string]>([
    ['fooBar', 'Foo bar'],
    ['FooBar', 'Foo bar'],
    ['foobar', 'Foobar'],
    ['ABCFooBar', 'ABC foo bar'],
    ['FooBarABC', 'Foo bar ABC'],
    ['FooBarAB', 'Foo bar AB'],
    ['FooBarA', 'Foo bar a'],
    ['FooBar (ABC)', 'Foo bar (ABC)'],
])('normalizeLabel correctly formats output from %s to %s', (input, expected) => {
    expect(normalizeLabel(input)).toEqual(expected);
});
