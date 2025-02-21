import { faker } from '$test';
import { testMessage } from '@minvws/mgo-mgo-intl/test';
import { expect, test, vi } from 'vitest';
import { type MgoQuantity, type MgoRatio } from '../../../parse/type';
import { ratio } from './ratio';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantity) => `systemValue(${JSON.stringify(input)})`
    ),
}));

test('ratio', () => {
    const label = faker.custom.fhirMessageId();

    const { numerator, denominator }: MgoRatio = {
        numerator: faker.fhir.quantity() as MgoQuantity,
        denominator: faker.fhir.quantity() as MgoQuantity,
    };
    const context = faker.custom.uiHelperContext();
    vi.spyOn(context, 'hasMessage').mockReturnValueOnce(false);
    const result = ratio(context)(label, { numerator, denominator });

    expect(result).toEqual([
        {
            label: testMessage('fhir.ratio.numerator'),
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(numerator)})`,
        },
        {
            label: testMessage('fhir.ratio.denominator'),
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(denominator)})`,
        },
    ]);
});
