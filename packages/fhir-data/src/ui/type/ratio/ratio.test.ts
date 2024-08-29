import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoRatio } from '../../../parse/type';
import { format } from '../../format';
import { mockQuantity } from '../quantity/quantity.test';
import { ratio } from './ratio';

test('ratio', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const { numerator, denominator }: MgoRatio = {
        numerator: mockQuantity(),
        denominator: mockQuantity(),
    };
    const result = ratio(label, { numerator, denominator }, options);
    expect(result).toEqual([
        {
            label: `${label}.numerator.value`,
            type: `ratio.numerator.value`,
            display: format.valueWithUnit(numerator.value, numerator.unit),
            ...options,
        },
        {
            label: `${label}.numerator.code`,
            type: `ratio.numerator.code`,
            display: format.codeWithSystem(numerator.code, numerator.system),
            ...options,
        },
        {
            label: `${label}.denominator.value`,
            type: `ratio.denominator.value`,
            display: format.valueWithUnit(denominator.value, denominator.unit),
            ...options,
        },
        {
            label: `${label}.denominator.code`,
            type: `ratio.denominator.code`,
            display: format.codeWithSystem(denominator.code, denominator.system),
            ...options,
        },
    ]);
});
