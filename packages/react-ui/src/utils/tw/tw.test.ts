import { expect, test } from 'vitest';
import { tw } from './tw';
import { faker } from '@faker-js/faker';

test('returns the same string its given', () => {
    const value = faker.lorem.word();
    expect(tw`${value}`).toBe(value);
});
