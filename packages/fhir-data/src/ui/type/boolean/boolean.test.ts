import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoBoolean } from '../../../parse/type';
import { toString } from '../../helpers';
import { boolean } from './boolean';

test('boolean', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value: MgoBoolean = faker.datatype.boolean();
    const result = boolean(label, value, options);
    expect(result).toEqual({
        label,
        type: 'boolean',
        display: toString(value),
        ...options,
    });
});
