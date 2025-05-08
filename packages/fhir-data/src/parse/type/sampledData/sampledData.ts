import { type SampledData } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { type MgoSimpleQuantityProps, simpleQuantityProps } from '../simpleQuantity/simpleQuantity';

export interface MgoSampledData extends ValueType<'sampledData'> {
    origin: MgoSimpleQuantityProps;
    period: number;
    factor: number | undefined;
    lowerLimit: number | undefined;
    upperLimit: number | undefined;
    dimensions: number;
    data: string | undefined;
}

/**
 * @see: https://simplifier.net/packages/hl7.fhir.r3.core/3.0.2/files/59840
 */
export const sampledData = createTypeParser<SampledData, MgoSampledData>((value) => ({
    _type: 'sampledData',
    origin: simpleQuantityProps(value.origin),
    period: value.period,
    factor: value.factor,
    lowerLimit: value.lowerLimit,
    upperLimit: value.upperLimit,
    dimensions: value.dimensions,
    data: value.data,
}));
