import { type Duration } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type ValueType } from '../../types';
import { quantityProps, type MgoQuantityProps } from '../quantity/quantity';

export interface MgoDuration extends MgoQuantityProps, ValueType<'duration'> {}

export const duration = createTypeParser<Duration, MgoDuration>((value) => ({
    _type: 'duration',
    ...quantityProps(value),
}));
