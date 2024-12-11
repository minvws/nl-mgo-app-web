import { faker } from '$test';
import { type Mock, expect, test } from 'vitest';
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

test('range without message', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const { low, high }: MgoRange = {
        low: mockQuantity(),
        high: mockQuantity(),
    };
    const context = faker.custom.uiContext();
    (context.hasMessage as unknown as Mock).mockImplementation(() => false);
    const result = general.range(context)(label, { low, high }, options);
    expect(result).toEqual([
        {
            label: `intl(fhir.range.low)`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(low.value, low.unit),
            ...options,
        },
        {
            label: `intl(fhir.range.high)`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(high.value, high.unit),
            ...options,
        },
    ]);
});

test('range with message', () => {
    const label = faker.custom.messageId();
    const options = faker.custom.uiEntryOptions();
    const { low, high }: MgoRange = {
        low: mockQuantity(),
        high: mockQuantity(),
    };
    const context = faker.custom.uiContext();
    (context.hasMessage as unknown as Mock).mockImplementation(() => true);
    const result = general.range(context)(label, { low, high }, options);
    expect(result).toEqual([
        {
            label: `intl(${label}.low)`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(low.value, low.unit),
            ...options,
        },
        {
            label: `intl(${label}.high)`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(high.value, high.unit),
            ...options,
        },
    ]);
});
