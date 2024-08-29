import { type DateTimeString } from '../../../fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoDateTime = DateTimeString;

export const dateTime = createTypeParser<string, MgoDateTime>((value) => value as DateTimeString);
