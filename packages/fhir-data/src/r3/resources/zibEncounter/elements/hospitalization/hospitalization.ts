import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type EncounterHospitalization } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Hospitalization {
    admitSource: parse.MgoCodeableConcept | undefined;
    dischargeDisposition: parse.MgoCodeableConcept | undefined;
}

function parseHospitalization(value: Nullable<EncounterHospitalization>): Hospitalization {
    return {
        admitSource: parse.codeableConcept(value?.admitSource),
        dischargeDisposition: parse.codeableConcept(value?.dischargeDisposition),
    };
}

export const hospitalization = {
    parse: parseHospitalization,
    uiSchemaGroup,
} satisfies ResourceElementConfig<EncounterHospitalization, Hospitalization>;
