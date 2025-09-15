import { type ProcedureFocalDevice } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { type Nullable } from '@minvws/mgo-utils';

export interface FocalDevice {
    manipulated: parse.MgoReference | undefined;
}

export function parseFocalDevice(value: Nullable<ProcedureFocalDevice>): FocalDevice {
    return {
        manipulated: parse.reference(value?.manipulated),
    };
}
