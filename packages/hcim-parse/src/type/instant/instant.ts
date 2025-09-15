import { type InstantDateTimeString } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoInstant = PrimitiveValueType<'instant', InstantDateTimeString>;

export const instant = createTypeParser<string, MgoInstant>((value) => ({
    _type: 'instant',
    value: value as InstantDateTimeString,
}));
