import { type Nullable } from '@minvws/mgo-utils';
import { type ProcedureFocalDevice } from 'fhir/r3';
import { parse } from '../../../../../parse';

export interface FocalDevice {
    manipulated: parse.MgoReference | undefined;
}

export function parseFocalDevice(value: Nullable<ProcedureFocalDevice>): FocalDevice {
    return {
        manipulated: parse.reference(value?.manipulated),
    };
}
