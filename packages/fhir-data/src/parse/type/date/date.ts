import { type DateString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoDate extends PrimitiveValueType<'Date', DateString> {}

export const date = createTypeParser<string, MgoDate>((value) => ({
    _type: 'Date',
    value: value as DateString,
}));
