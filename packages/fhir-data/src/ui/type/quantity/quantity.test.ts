import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoQuantity } from '../../../parse/type';
import { format } from '../../format';
import { quantity, simpleQuantity } from './quantity';

export function mockQuantity(): MgoQuantity {
    const comparator = faker.fhir.code(['<', '<=', '>=', '>']);
    return {
        value: faker.number.float(),
        comparator,
        code: faker.fhir.code(),
        system: faker.internet.url(),
        unit: faker.lorem.word(),
    };
}

test('quantity', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoQuantity = mockQuantity();
    const result = quantity(label, mgoQuantity, options);
    expect(result).toEqual([
        {
            label: `${label}.value`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(mgoQuantity.value, mgoQuantity.unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `SINGLE_VALUE`,
            display: format.codeWithSystem(mgoQuantity.code, mgoQuantity.system),
            ...options,
        },
    ]);
});

test('simpleQuantity', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const mgoQuantity = mockQuantity();
    const result = simpleQuantity(label, mgoQuantity, options);
    expect(result).toEqual({
        label: label,
        type: `SINGLE_VALUE`,
        display: format.valueWithUnit(mgoQuantity.value, mgoQuantity.unit),
        ...options,
    });
});

test('simpleQuantity with undefined fields', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const result = simpleQuantity(label, undefined, options);
    expect(result).toEqual({
        label: label,
        type: `SINGLE_VALUE`,
        display: undefined,
        ...options,
    });
});
