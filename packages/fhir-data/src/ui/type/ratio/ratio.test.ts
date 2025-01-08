import { faker } from '$test';
import { expect, test, type Mock } from 'vitest';
import { type MgoRatio } from '../../../parse/type';
import { format } from '../../format';
import { mockQuantity } from '../quantity/quantity.test';
import { ratio } from './ratio';

test('ratio', () => {
    const label = faker.custom.messageId();

    const { numerator, denominator }: MgoRatio = {
        numerator: mockQuantity(),
        denominator: mockQuantity(),
    };
    const context = faker.custom.uiHelperContext();
    (context.hasMessage as unknown as Mock).mockImplementation(() => false);
    const result = ratio(context)(label, { numerator, denominator });
    expect(result).toEqual([
        {
            label: `intl(fhir.ratio.numerator)`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(numerator.value, numerator.unit),
        },
        {
            label: `intl(fhir.ratio.denominator)`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(denominator.value, denominator.unit),
        },
    ]);
});
