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
    const label = faker.custom.messageId();

    const mgoQuantity = mockQuantity();
    const result = quantity(faker.custom.uiHelperContext())(label, mgoQuantity);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: `SINGLE_VALUE`,
        display: format.valueWithUnit(mgoQuantity.value, mgoQuantity.unit),
    });
});

test('quantity with undefined fields', () => {
    const label = faker.custom.messageId();

    const result = quantity(faker.custom.uiHelperContext())(label, undefined);
    expect(result).toEqual({
        label: `intl(${label})`,
        type: `SINGLE_VALUE`,
        display: undefined,
    });
});
