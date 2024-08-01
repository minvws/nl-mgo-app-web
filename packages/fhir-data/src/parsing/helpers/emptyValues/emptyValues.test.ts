import { expect, test } from 'vitest';
import { EMPTY_VALUE } from '../../type';
import { setEmptyValues } from './emptyValues';
import { faker } from '$test';

test('setEmptyValues replaces any undefined props with the EMPTY_VALUE', () => {
    const data = {
        foo: faker.lorem.sentences(),
        bar: undefined,
    };
    const result = setEmptyValues(data);

    expect(result).toEqual({
        foo: data.foo,
        bar: EMPTY_VALUE,
    });
});
