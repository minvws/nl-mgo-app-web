import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoInteger } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { integer } from './integer';

test('integer', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value = faker.fhir.integer() as MgoInteger;
    const result = integer(label, value, options);
    expect(result).toEqual({
        label,
        type: 'integer',
        display: numberToString(value),
        ...options,
    });
});
