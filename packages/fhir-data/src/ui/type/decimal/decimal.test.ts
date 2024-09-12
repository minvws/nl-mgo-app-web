import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoDecimal } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { decimal } from './decimal';

test('decimal', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const value = faker.fhir.decimal() as MgoDecimal;
    const result = decimal(label, value, options);
    expect(result).toEqual({
        label,
        type: 'decimal',
        display: numberToString(value),
        ...options,
    });
});
