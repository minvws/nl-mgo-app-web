import { faker } from '$test';
import { expect, test } from 'vitest';
import { string } from './string';

test('string', () => {
    const value = faker.lorem.sentences();
    expect(string(value)).toEqual({
        _type: 'string',
        value,
    });
});
