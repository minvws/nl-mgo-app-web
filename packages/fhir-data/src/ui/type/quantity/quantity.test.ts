import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoQuantity } from '../../../parse/type';
import { format } from '../../format';
import { quantity } from './quantity';

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
            type: `quantity.value`,
            display: format.valueWithUnit(mgoQuantity.value, mgoQuantity.unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `quantity.code`,
            display: format.codeWithSystem(mgoQuantity.code, mgoQuantity.system),
            ...options,
        },
    ]);
});
