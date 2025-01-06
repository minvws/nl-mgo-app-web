import { type ProcedureFocalDevice } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface FocalDevice {
    manipulated: parse.MgoReference | undefined;
}

function parseFocalDevice(value: Nullable<ProcedureFocalDevice>): FocalDevice {
    return {
        manipulated: parse.reference(value?.manipulated),
    };
}

export const focalDevice = {
    parse: parseFocalDevice,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ProcedureFocalDevice, FocalDevice>;
