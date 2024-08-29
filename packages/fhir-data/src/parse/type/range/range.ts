import { type Range } from '../../../fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type MgoQuantity, quantity } from '../quantity/quantity';

export interface MgoRange {
    low: MgoQuantity | undefined;
    high: MgoQuantity | undefined;
}

export const range = createTypeParser<Range, MgoRange>((value) => {
    return {
        low: quantity(value.low),
        high: quantity(value.high),
    };
});
