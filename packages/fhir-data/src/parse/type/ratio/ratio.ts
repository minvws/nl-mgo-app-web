import { type Ratio } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { type MgoQuantityProps, quantityProps } from '../quantity/quantity';

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
