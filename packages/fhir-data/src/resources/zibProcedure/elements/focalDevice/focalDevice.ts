import { type ResourceElementConfig } from '../../../../elements/config';
import { type ProcedureFocalDevice } from '../../../../fhir/index';
import { parse } from '../../../../parse';
import { type Nullable } from '../../../../types/Nullable';
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
