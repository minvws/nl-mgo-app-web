import { type LosslessNumber } from '@minvws/mgo-fhir-client';
import { isNullish } from '../../../utils';
import { type Nullable } from '../../../types/Nullable';

export function numberToString(value: Nullable<number | LosslessNumber>) {
    if (isNullish(value)) return null;
    return value.toString();
}
