import { parse } from '@minvws/mgo-hcim-parse';
import { type Nullable } from '@minvws/mgo-utils';
import { type ProcedureFocalDevice } from 'fhir/r3';

export interface FocalDevice {
    manipulated: parse.MgoReference | undefined;
}

export function parseFocalDevice(value: Nullable<ProcedureFocalDevice>): FocalDevice {
    return {
        manipulated: parse.reference(value?.manipulated),
    };
}
