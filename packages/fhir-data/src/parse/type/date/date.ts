import { type DateString } from '../../../types/Fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';

export type MgoDate = DateString;

export const date = createTypeParser<string, MgoDate>((value) => value as MgoDate);
