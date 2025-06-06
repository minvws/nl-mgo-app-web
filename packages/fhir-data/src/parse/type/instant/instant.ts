import { type InstantDateTimeString } from '@minvws/mgo-fhir-types';
import { createTypeParser } from '../../helpers/createTypeParser/createTypeParser';
import { type PrimitiveValueType } from '../../types';

export interface MgoInstant extends PrimitiveValueType<'instant', InstantDateTimeString> {}

export const instant = createTypeParser<string, MgoInstant>((value) => ({
    _type: 'instant',
    value: value as InstantDateTimeString,
}));
