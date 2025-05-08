import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { type MgoQuantityProps } from '../../../parse/type';
import { simpleQuantity } from './simpleQuantity';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantityProps) => `systemValue(${JSON.stringify(input)})`
    ),
}));

test('simpleQuantity', () => {
    const label = faker.custom.fhirMessageId();
    const mgoSimpleQuantity = faker.mgo.simpleQuantity();
    const result = simpleQuantity(faker.custom.uiHelperContext())(label, mgoSimpleQuantity);
    expect(result).toEqual({
        label: testMessage(label),
        type: `SINGLE_VALUE`,
        display: `systemValue(${JSON.stringify(mgoSimpleQuantity)})`,
    });
});
