import { faker } from '$test';
import { expect, test } from 'vitest';
import { valueOf } from './valueOf';

test.each([null, undefined])('returns undefined for %j', (value) => {
    expect(valueOf(value)).toBe(undefined);
});

test('extracts value from valueType', () => {
    const value = {
        value: faker.lorem.word(),
        _type: faker.lorem.word(),
    };
    expect(valueOf(value)).toBe(value.value);
});

test('returns primitive value if supplied', () => {
    const value = faker.lorem.word();
    expect(valueOf(value)).toBe(value);
});
