import { type InstantDateTimeString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoInstant = InstantDateTimeString;

export const instant = createTypeParser<string, MgoInstant>((value) => value as MgoInstant);
