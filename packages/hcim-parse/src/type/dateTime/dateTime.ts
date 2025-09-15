import { type DateTimeString } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoDateTime = PrimitiveValueType<'dateTime', DateTimeString>;

export const dateTime = createTypeParser<string, MgoDateTime>((value) => ({
    _type: 'dateTime',
    value: value as DateTimeString,
}));
