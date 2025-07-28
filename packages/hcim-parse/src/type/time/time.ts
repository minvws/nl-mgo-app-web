import { type TimeString } from '@minvws/mgo-fhir';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser.js';
import { type PrimitiveValueType } from '../../types.js';

export type MgoTime = PrimitiveValueType<'time', TimeString>;

export const time = createTypeParser<string, MgoTime>((value) => ({
    _type: 'time',
    value: value as TimeString,
}));
