import { type DateString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export type MgoDate = PrimitiveValueType<'date', DateString>;

export const date = createTypeParser<string, MgoDate>((value) => ({
    _type: 'date',
    value: value as DateString,
}));
