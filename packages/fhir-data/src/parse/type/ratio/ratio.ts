import { type Ratio } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { quantity, type MgoQuantity } from '../quantity/quantity';

export interface MgoRatio extends ValueType<'Ratio'> {
    numerator: MgoQuantity | undefined;
    denominator: MgoQuantity | undefined;
}

export const ratio = createTypeParser<Ratio, MgoRatio>((value) => {
    const { numerator, denominator } = value;
    return {
        _type: 'Ratio',
        numerator: quantity(numerator),
        denominator: quantity(denominator),
    };
});
