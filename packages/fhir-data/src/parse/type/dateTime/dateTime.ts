import { type DateTimeString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoDateTime extends PrimitiveValueType<'dateTime', DateTimeString> {}

export const dateTime = createTypeParser<string, MgoDateTime>((value) => ({
    _type: 'dateTime',
    value: value as DateTimeString,
}));
