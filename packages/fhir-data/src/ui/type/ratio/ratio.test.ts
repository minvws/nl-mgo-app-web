import { faker } from '$test';
import { expect, test, vi, type Mock } from 'vitest';
import { type MgoQuantity, type MgoRatio } from '../../../parse/type';
import { ratio } from './ratio';

vi.mock('../../format/systemValue/systemValue', () => ({
    systemValue: vi.fn(
        (_context) => (input: MgoQuantity) => `systemValue(${JSON.stringify(input)})`
    ),
}));

test('ratio', () => {
    const label = faker.custom.messageId();

    const { numerator, denominator }: MgoRatio = {
        numerator: faker.fhir.quantity() as MgoQuantity,
        denominator: faker.fhir.quantity() as MgoQuantity,
    };
    const context = faker.custom.uiHelperContext();
    (context.hasMessage as unknown as Mock).mockImplementation(() => false);
    const result = ratio(context)(label, { numerator, denominator });

    expect(result).toEqual([
        {
            label: `intl(fhir.ratio.numerator)`,
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(numerator)})`,
        },
        {
            label: `intl(fhir.ratio.denominator)`,
            type: `SINGLE_VALUE`,
            display: `systemValue(${JSON.stringify(denominator)})`,
        },
    ]);
});
