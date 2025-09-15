import { type Ratio } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';
import { type MgoQuantityProps, quantityProps } from '../quantity/quantity.js';

export interface MgoRatio extends ValueType<'ratio'> {
    numerator: MgoQuantityProps | undefined;
    denominator: MgoQuantityProps | undefined;
}

export const ratio = createTypeParser<Ratio, MgoRatio>((value) => {
    const { numerator, denominator } = value;
    return {
        _type: 'ratio',
        numerator: numerator && quantityProps(numerator),
        denominator: denominator && quantityProps(denominator),
    };
});
