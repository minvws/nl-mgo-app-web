import { faker } from '$test';
import { expect, test } from 'vitest';
import { boolean } from './boolean';

test('boolean', () => {
    const value = faker.datatype.boolean();
    expect(boolean(value)).toEqual({
        _type: 'boolean',
        value,
    });
});
