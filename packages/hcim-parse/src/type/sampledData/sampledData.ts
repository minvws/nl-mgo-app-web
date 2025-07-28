import { type SampledData } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';
import { decimal, type MgoDecimal } from '../decimal/decimal.js';
import { type MgoPositiveInt, positiveInt } from '../positiveInt/positiveInt.js';
import { type MgoSimpleQuantity, simpleQuantity } from '../simpleQuantity/simpleQuantity.js';
import { type MgoString, string } from '../string/string.js';

export interface MgoSampledData extends ValueType<'sampledData'> {
    origin: MgoSimpleQuantity | undefined;
    period: MgoDecimal;
    factor: MgoDecimal | undefined;
    lowerLimit: MgoDecimal | undefined;
    upperLimit: MgoDecimal | undefined;
    dimensions: MgoPositiveInt | undefined;
    data: MgoString | undefined;
}

/**
 * @see: https://simplifier.net/packages/hl7.fhir.r3.core/3.0.2/files/59840
 */
export const sampledData = createTypeParser<SampledData, MgoSampledData>((value) => ({
    _type: 'sampledData',
    origin: simpleQuantity(value.origin),
    period: decimal(value.period)!,
    factor: decimal(value.factor),
    lowerLimit: decimal(value.lowerLimit),
    upperLimit: decimal(value.upperLimit),
    dimensions: positiveInt(value.dimensions),
    data: string(value.data),
}));
