import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type PatientCommunication } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

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
