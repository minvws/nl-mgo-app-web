import { type Ratio } from '../../../fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { quantity, type MgoQuantity } from '../quantity/quantity';

export interface MgoRatio {
    numerator: MgoQuantity | undefined;
    denominator: MgoQuantity | undefined;
}

export const ratio = createTypeParser<Ratio, MgoRatio>((value) => {
    const { numerator, denominator } = value;
    return {
        numerator: quantity(numerator),
        denominator: quantity(denominator),
    };
});
