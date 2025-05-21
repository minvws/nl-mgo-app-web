import { type TimeString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoTime extends PrimitiveValueType<'time', TimeString> {}

export const time = createTypeParser<string, MgoTime>((value) => ({
    _type: 'time',
    value: value as TimeString,
}));
