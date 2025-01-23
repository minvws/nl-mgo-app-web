import { type DateString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoDate = DateString;

export const date = createTypeParser<string, MgoDate>((value) => value as MgoDate);
