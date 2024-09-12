import { type PatientCommunication } from 'fhir/r3';
import { type Nullable } from '../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { type ResourceElementConfig } from '../../../../elements/config';
import { parse } from '../../../../parse';

export interface Communication {
    language: parse.MgoCodeableConcept | undefined;
    preferred: parse.MgoBoolean | undefined;
}

function parseCommunication(value: Nullable<PatientCommunication>): Communication {
    return {
        language: parse.codeableConcept(value?.language),
        preferred: parse.boolean(value?.preferred),
    };
}

export const communication = {
    parse: parseCommunication,
    uiSchemaGroup,
} satisfies ResourceElementConfig<PatientCommunication, Communication>;
