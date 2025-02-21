import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { type MgoQuantity } from '../../../parse/type';
import { quantity } from './quantity';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantity) => `systemValue(${JSON.stringify(input)})`
    ),
}));

function mockQuantity(): MgoQuantity {
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
    const label = faker.custom.fhirMessageId();

    const mgoQuantity = mockQuantity();
    const result = quantity(faker.custom.uiHelperContext())(label, mgoQuantity);
    expect(result).toEqual({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        display: `systemValue(${JSON.stringify(mgoQuantity)})`,
    });
});

test('quantity with undefined fields', () => {
    const label = faker.custom.fhirMessageId();

    const result = quantity(faker.custom.uiHelperContext())(label, undefined);
    expect(result).toEqual({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        display: `systemValue(${JSON.stringify(undefined)})`,
    });
});
