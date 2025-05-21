import { faker } from '$test';
import { expect, test } from 'vitest';
import { hasExtensions } from './hasExtensions';

test('returns false for nullish', () => {
    const value = null;
    expect(hasExtensions(value)).toBe(false);
});

test('does not return whether the value itself is an extension', () => {
    const value = {
        value: faker.lorem.word(),
        _type: faker.lorem.word(),
        _ext: true,
    };
    expect(hasExtensions(value)).toBe(false);
});

test('returns whether the value has a nested extension', () => {
    const value = {
        value: faker.lorem.word(),
        _type: faker.lorem.word(),
        nested: {
            value: faker.lorem.word(),
            _type: faker.lorem.word(),
            _ext: true,
        },
    };
    expect(hasExtensions(value)).toBe(true);
});

test('returns whether the value has a nested extension (array)', () => {
    const value = {
        value: faker.lorem.word(),
        _type: faker.lorem.word(),
        nested: [
            {
                value: faker.lorem.word(),
                _type: faker.lorem.word(),
            },
            {
                value: faker.lorem.word(),
                _type: faker.lorem.word(),
                _ext: true,
            },
        ],
    };
    expect(hasExtensions(value)).toBe(true);
});
