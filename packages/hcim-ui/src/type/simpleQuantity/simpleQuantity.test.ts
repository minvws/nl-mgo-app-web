import { faker } from '$test';
import { type MgoQuantityProps } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test, vi } from 'vitest';
import { simpleQuantity } from './simpleQuantity.js';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantityProps) => `systemValue(${JSON.stringify(input)})`
    ),
}));

test('simpleQuantity', () => {
    const label = faker.custom.fhirMessageId();
    const mgoSimpleQuantity = faker.mgo.simpleQuantity();
    const result = simpleQuantity(faker.ui.context())(label, mgoSimpleQuantity);
    expect(result).toEqual({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        display: `systemValue(${JSON.stringify(mgoSimpleQuantity)})`,
    });
});
