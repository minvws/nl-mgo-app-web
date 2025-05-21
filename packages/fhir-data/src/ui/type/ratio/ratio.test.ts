import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { type MgoQuantityProps } from '../../../parse/type';
import { ratio } from './ratio';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantityProps) => `systemValue(${JSON.stringify(input)})`
    ),
}));

test('ratio', () => {
    const label = faker.custom.fhirMessageId();
    const mgoRatio = faker.mgo.ratio();
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'formatLabel').mockImplementation(
        (_label, _value, fallbackLabel) => testMessage(fallbackLabel) ?? ''
    );

    const result = ratio(context)(label, mgoRatio);

    expect(result).toEqual([
        {
            label: testMessage('fhir.ratio.numerator'),
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(mgoRatio.numerator)})`,
        },
        {
            label: testMessage('fhir.ratio.denominator'),
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(mgoRatio.denominator)})`,
        },
    ]);
});
