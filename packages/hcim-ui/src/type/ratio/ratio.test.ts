import { faker } from '$test';
import { type MgoQuantityProps } from '@minvws/mgo-hcim-parse';
import { testMessage } from '@minvws/mgo-intl/test/shared';
import { expect, test, vi } from 'vitest';
import { SingleValue } from '../../types/schema.js';
import { ratio } from './ratio.js';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantityProps) => `systemValue(${JSON.stringify(input)})`
    ),
}));

test('ratio', () => {
    const label = faker.custom.fhirMessageId();
    const mgoRatio = faker.mgo.ratio();
    const context = faker.ui.context();
    vi.spyOn(context, 'formatLabel').mockImplementation(
        (_label, _value, fallbackLabel) => testMessage(fallbackLabel) ?? ''
    );

    const result = ratio(context)(label, mgoRatio);

    expect(result).toEqual<SingleValue[]>([
        {
            label: testMessage('fhir.ratio.numerator'),
            type: `SINGLE_VALUE`,
            value: { display: `systemValue(${JSON.stringify(mgoRatio.numerator)})` },
        },
        {
            label: testMessage('fhir.ratio.denominator'),
            type: `SINGLE_VALUE`,
            value: { display: `systemValue(${JSON.stringify(mgoRatio.denominator)})` },
        },
    ]);
});
