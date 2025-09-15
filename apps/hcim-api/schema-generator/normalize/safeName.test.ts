import { expect, test } from 'vitest';
import { isSafeName, makeSafeName } from './safeName.js';

test.each<[string, boolean]>([
    ['foo', true],
    ['Foo_bar', true],
    ['foo_bar<>', false],
    ['foo_"bar"', false],
    ['0_foo', false],
])('isSafeName returns whether name %j is safe: %j', (name, expected) => {
    expect(isSafeName(name)).toEqual(expected);
});

test.each<[string, string]>([
    ['foo', 'foo'],
    ['foo_bar', 'foo_bar'],
    ['foo_bar<>', 'foo_bar_Of_'],
    ['foo_"bar"', 'foo_bar'],
    ['0_foo', '_0_foo'],
    [
        'PrimitiveValueType<\"code\",(\"accepted\"|\"declined\"|\"tentative\"|\"needs-action\")>',
        'PrimitiveValueType_Of_code__accepted_declined_tentative_needs_action',
    ],
    [
        'ExtensionValue<structure-0.6856249017465181>',
        'ExtensionValue_Of_structure_0_6856249017465181',
    ],
])('makeSafeName transforms name %j to %j', (name, expected) => {
    expect(makeSafeName(name)).toEqual(expected);
});
