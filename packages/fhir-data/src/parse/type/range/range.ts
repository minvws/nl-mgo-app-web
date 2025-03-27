import { type Range } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { quantity, type MgoQuantity } from '../quantity/quantity';

export interface MgoRange extends ValueType<'Range'> {
    low: MgoQuantity | undefined;
    high: MgoQuantity | undefined;
}

export const range = createTypeParser<Range, MgoRange>((value) => {
    return {
        _type: 'Range',
        low: quantity(value.low),
        high: quantity(value.high),
    };
});
