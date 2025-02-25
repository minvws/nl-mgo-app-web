import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { beforeEach } from 'node:test';
import { expect, test, vi } from 'vitest';
import { type MgoQuantity, type MgoRange } from '../../../parse/type';
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

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantity) => `systemValue(${JSON.stringify(input)})`
    ),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

test('range without message', () => {
    const label = faker.custom.fhirMessageId();

    const { low, high }: MgoRange = {
        low: mockQuantity(),
        high: mockQuantity(),
    };
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValue(false);
    const result = general.range(context)(label, { low, high });
    expect(result).toEqual([
        {
            label: testMessage('fhir.range.low'),
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(low)})`,
        },
        {
            label: testMessage('fhir.range.high'),
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(high)})`,
        },
    ]);
});

test('range with message', () => {
    const label = faker.custom.fhirMessageId();

    const { low, high }: MgoRange = {
        low: mockQuantity(),
        high: mockQuantity(),
    };
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValue(true);
    const result = general.range(context)(label, { low, high });
    expect(result).toEqual([
        {
            label: `intl(${label}.low)`,
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(low)})`,
        },
        {
            label: `intl(${label}.high)`,
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(high)})`,
        },
    ]);
});
