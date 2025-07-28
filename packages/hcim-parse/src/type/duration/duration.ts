import { type Duration } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type ValueType } from '../../types.js';
import { quantityProps, type MgoQuantityProps } from '../quantity/quantity.js';

export interface MgoDuration extends MgoQuantityProps, ValueType<'duration'> {}

export const duration = createTypeParser<Duration, MgoDuration>((value) => ({
    _type: 'duration',
    ...quantityProps(value),
}));
