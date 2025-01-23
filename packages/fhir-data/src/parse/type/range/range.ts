import { type Range } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { quantity, type MgoQuantity } from '../quantity/quantity';

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
