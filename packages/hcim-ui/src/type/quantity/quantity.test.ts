import { faker } from '$test';
import { type MgoQuantityProps } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test, vi } from 'vitest';
import { quantity } from './quantity.js';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantityProps) => `systemValue(${JSON.stringify(input)})`
    ),
}));

test('quantity', () => {
    const label = faker.custom.fhirMessageId();

    const mgoQuantity = faker.mgo.quantity();
    const result = quantity(faker.ui.context())(label, mgoQuantity);
    expect(result).toEqual({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        display: `systemValue(${JSON.stringify(mgoQuantity)})`,
    });
});

test('quantity with undefined fields', () => {
    const label = faker.custom.fhirMessageId();

    const result = quantity(faker.ui.context())(label, undefined);
    expect(result).toEqual({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        display: `systemValue(${JSON.stringify(undefined)})`,
    });
});
