import { type Duration } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { quantityLike, type MgoQuantity } from '../quantity/quantity';

export type MgoDuration = MgoQuantity;

export const duration = createTypeParser<Duration, MgoQuantity>(quantityLike);
