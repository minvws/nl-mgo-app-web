import { type Duration } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { quantityLike, type MgoQuantityLike } from '../quantity/quantity';

export interface MgoDuration extends MgoQuantityLike<'Duration'> {}

export const duration = createTypeParser<Duration, MgoDuration>((value) =>
    quantityLike(value, 'Duration')
);
