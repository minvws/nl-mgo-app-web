import { faker } from '$test';
import { type MgoQuantityProps } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { beforeEach, expect, test, vi } from 'vitest';
import { SingleValue } from '../../types/schema.js';
import { range } from './range.js';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantityProps) => `systemValue(${JSON.stringify(input)})`
    ),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

test('range', () => {
    const label = faker.custom.fhirMessageId();
    const mgoRange = faker.mgo.range();
    const context = faker.ui.context();
    const result = range(context)(label, mgoRange);
    expect(result).toEqual([
        {
            id: label,
            label: `intl(${label})`,
            type: `SINGLE_VALUE`,
            value: { display: `systemValue(${JSON.stringify(mgoRange.low)})` },
        },
        {
            id: label,
            label: `intl(${label})`,
            type: `SINGLE_VALUE`,
            value: { display: `systemValue(${JSON.stringify(mgoRange.high)})` },
        },
    ]);
});

test('range with fallback labels', () => {
    const label = faker.custom.fhirMessageId();
    const mgoRange = faker.mgo.range();
    const context = faker.ui.context();
    vi.spyOn(context, 'baseProps').mockImplementation((label, _value, options) => ({
        id: label,
        label: testMessage(options?.defaultLabel) ?? '',
    }));
    const result = range(context)(label, mgoRange);
    expect(result).toMatchObject<Partial<SingleValue>[]>([
        {
            label: testMessage('fhir.range.low'),
            type: `SINGLE_VALUE`,
            value: { display: `systemValue(${JSON.stringify(mgoRange.low)})` },
        },
        {
            label: testMessage('fhir.range.high'),
            type: `SINGLE_VALUE`,
            value: { display: `systemValue(${JSON.stringify(mgoRange.high)})` },
        },
    ]);
});
