import { beforeEach, expect, test, vi } from 'vitest';
import { SchemaWithDefinitions } from '../../schemaTypes.js';
import { normalizeRefs } from './normalizeRefs.js';
import { isSafeName, makeSafeName } from './safeName.js';

vi.mock('./safeName.js', () => ({
    isSafeName: vi.fn((value) => !value.startsWith('unsafe_')),
    makeSafeName: vi.fn((value) => `safe(${value})`),
}));

beforeEach(() => {
    vi.mocked(isSafeName).mockClear();
    vi.mocked(makeSafeName).mockClear();
});

test('replaces all unsafe $ref values in objects with a safe name', () => {
    const schema: SchemaWithDefinitions = {
        definitions: {
            ['foo']: {
                type: 'object',
                properties: {
                    ['bar']: {
                        $ref: `#/definitions/unsafe_baz`,
                    },
                },
            },
            ['unsafe_baz']: {
                type: 'string',
                const: 'baz',
            },
        },
    };

    const expectedSchema: SchemaWithDefinitions = {
        definitions: {
            ['foo']: {
                type: 'object',
                properties: {
                    ['bar']: {
                        $ref: `#/definitions/safe(unsafe_baz)`,
                    },
                },
            },
            ['safe(unsafe_baz)']: {
                type: 'string',
                const: 'baz',
            },
        },
    };

    const normalizedSchema = normalizeRefs(schema);
    expect(normalizedSchema).toEqual(expectedSchema);
});

test('replaces all unsafe $ref values in arrays with a safe name', () => {
    const schema: SchemaWithDefinitions = {
        definitions: {
            ['foo']: {
                type: 'array',
                items: {
                    $ref: `#/definitions/unsafe_baz`,
                },
            },
            ['unsafe_baz']: {
                type: 'string',
                const: 'baz',
            },
        },
    };

    const expectedSchema: SchemaWithDefinitions = {
        definitions: {
            ['foo']: {
                type: 'array',
                items: {
                    $ref: `#/definitions/safe(unsafe_baz)`,
                },
            },
            ['safe(unsafe_baz)']: {
                type: 'string',
                const: 'baz',
            },
        },
    };

    const normalizedSchema = normalizeRefs(schema);
    expect(normalizedSchema).toEqual(expectedSchema);
});

test('replaces all deep unsafe $ref values in objects with a safe name', () => {
    const schema: SchemaWithDefinitions = {
        definitions: {
            ['foo']: {
                type: 'object',
                properties: {
                    ['bar']: {
                        type: 'array',
                        anyOf: [{ $ref: `#/definitions/unsafe_baz` }, { type: 'string' }],
                    },
                },
            },
            ['unsafe_baz']: {
                type: 'string',
                const: 'baz',
            },
        },
    };

    const expectedSchema: SchemaWithDefinitions = {
        definitions: {
            ['foo']: {
                type: 'object',
                properties: {
                    ['bar']: {
                        type: 'array',
                        anyOf: [{ $ref: `#/definitions/safe(unsafe_baz)` }, { type: 'string' }],
                    },
                },
            },
            ['safe(unsafe_baz)']: {
                type: 'string',
                const: 'baz',
            },
        },
    };

    const normalizedSchema = normalizeRefs(schema);
    expect(normalizedSchema).toEqual(expectedSchema);
});

test('rewrites unsafe $ref values without the "#/definitions/" prefix', () => {
    const schema: SchemaWithDefinitions = {
        definitions: {
            foo: { $ref: 'unsafe_baz' },
            unsafe_baz: { type: 'string' },
        },
    };

    expect(normalizeRefs(schema)).toEqual({
        definitions: {
            foo: { $ref: '#/definitions/safe(unsafe_baz)' },
            'safe(unsafe_baz)': { type: 'string' },
        },
    });
});

test('handles invalid URI encoding in $ref values', () => {
    const invalid = 'unsafe_%E0%A4%A';

    const schema: SchemaWithDefinitions = {
        definitions: {
            foo: { $ref: `#/definitions/${invalid}` },
            [invalid]: { type: 'string' },
        },
    };

    expect(normalizeRefs(schema)).toEqual({
        definitions: {
            foo: { $ref: `#/definitions/safe(${invalid})` },
            [`safe(${invalid})`]: { type: 'string' },
        },
    });
});

test('does not modify safe $ref values', () => {
    const schema: SchemaWithDefinitions = {
        definitions: {
            foo: {
                type: 'object',
                properties: {
                    bar: { $ref: '#/definitions/safeRef' },
                },
            },
            safeRef: { type: 'string' },
        },
    };

    expect(normalizeRefs(schema).definitions.foo).toEqual({
        type: 'object',
        properties: {
            bar: { $ref: '#/definitions/safeRef' },
        },
    });
});
