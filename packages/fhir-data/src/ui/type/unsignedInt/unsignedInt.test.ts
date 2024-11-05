import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoUnsignedInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { unsignedInt } from './unsignedInt';

test('unsignedInt', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value = faker.fhir.unsignedInt() as MgoUnsignedInt;
    const result = unsignedInt(label, value, options);
    expect(result).toEqual({
        label,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
        ...options,
    });
});
