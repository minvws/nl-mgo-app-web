import { faker } from '$test';
import { testMessage } from '@minvws/mgo-intl/test';
import { beforeEach } from 'node:test';
import { expect, test, vi } from 'vitest';
import { type MgoQuantityProps } from '../../../parse/type';
import { range } from './range';

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
    const context = faker.custom.uiHelperContext();
    const result = range(context)(label, mgoRange);
    expect(result).toEqual([
        {
            label: `intl(${label}.low)`,
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(mgoRange.low)})`,
        },
        {
            label: `intl(${label}.high)`,
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(mgoRange.high)})`,
        },
    ]);
});

test('range with fallback labels', () => {
    const label = faker.custom.fhirMessageId();
    const mgoRange = faker.mgo.range();
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'formatLabel').mockImplementation(
        (_label, _value, fallbackLabel) => testMessage(fallbackLabel) ?? ''
    );
    const result = range(context)(label, mgoRange);
    expect(result).toEqual([
        {
            label: testMessage('fhir.range.low'),
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(mgoRange.low)})`,
        },
        {
            label: testMessage('fhir.range.high'),
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(mgoRange.high)})`,
        },
    ]);
});
