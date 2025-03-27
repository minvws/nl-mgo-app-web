import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { beforeEach } from 'node:test';
import { expect, test, vi } from 'vitest';
import { type MgoQuantityLike } from '../../../parse/type';
import { range } from './range';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantityLike) => `systemValue(${JSON.stringify(input)})`
    ),
}));

beforeEach(() => {
    vi.resetAllMocks();
});

test('range without message', () => {
    const label = faker.custom.fhirMessageId();
    const mgoRange = faker.mgo.range();
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValue(false);
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

test('range with message', () => {
    const label = faker.custom.fhirMessageId();
    const mgoRange = faker.mgo.range();
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValue(true);
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
