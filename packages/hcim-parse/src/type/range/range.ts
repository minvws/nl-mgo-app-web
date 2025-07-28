import { type Range } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';
import { quantityProps, type MgoQuantityProps } from '../quantity/quantity.js';

export interface MgoRange extends ValueType<'range'> {
    low: MgoQuantityProps | undefined;
    high: MgoQuantityProps | undefined;
}

export const range = createTypeParser<Range, MgoRange>((value) => {
    return {
        _type: 'range',
        low: value.low && quantityProps(value.low),
        high: value.high && quantityProps(value.high),
    };
});
