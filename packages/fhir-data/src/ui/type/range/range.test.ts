import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoRange } from '../../../parse/type';
import { format } from '../../format';
import * as general from './range';

function mockQuantity() {
    return {
        value: faker.number.float(),
        comparator: faker.fhir.code(['<', '<=', '>=', '>']),
        code: faker.fhir.code(),
        system: faker.internet.url(),
        unit: faker.lorem.word(),
    };
}

test('range', () => {
    const label = faker.lorem.word();
    const options = faker.uiSchema.valueOptions();
    const { low, high }: MgoRange = {
        low: mockQuantity(),
        high: mockQuantity(),
    };
    const result = general.range(label, { low, high }, options);
    expect(result).toEqual([
        {
            label: `${label}.low.value`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(low.value, low.unit),
            ...options,
        },
        {
            label: `${label}.low.code`,
            type: `SINGLE_VALUE`,
            display: format.codeWithSystem(low.code, low.system),
            ...options,
        },
        {
            label: `${label}.high.value`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(high.value, high.unit),
            ...options,
        },
        {
            label: `${label}.high.code`,
            type: `SINGLE_VALUE`,
            display: format.codeWithSystem(high.code, high.system),
            ...options,
        },
    ]);
});
