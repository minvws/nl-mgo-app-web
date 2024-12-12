import { type InstantDateTimeString } from '../../../types/Fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoInstant = InstantDateTimeString;

export const instant = createTypeParser<string, MgoInstant>((value) => value as MgoInstant);
