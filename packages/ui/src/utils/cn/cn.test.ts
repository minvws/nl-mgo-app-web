import { expect, test } from 'vitest';
import { cn } from './cn';
import { faker } from '@faker-js/faker';

test('returns the same string its given', () => {
    const value = faker.lorem.word();
    expect(cn(value)).toBe(value);
});

test('constructs className string conditionally and merges tailwind classes', () => {
    expect(cn({ foo: true, bar: false }, ['text-white', 0, false], 'text-black')).toBe(
        'foo text-black'
    );
});
