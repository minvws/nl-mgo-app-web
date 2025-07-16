import { parse } from '@minvws/mgo-hcim-parse';
import { type Nullable } from '@minvws/mgo-utils';
import { type ProcedurePerformer } from 'fhir/r3';

export interface Performer {
    actor: parse.MgoReference | undefined;
    healthProfessionalRole: parse.MgoCodeableConcept | undefined;
}

export function parsePerformer(value: Nullable<ProcedurePerformer>): Performer {
    return {
        actor: parse.reference(value?.actor),
        healthProfessionalRole: parse.codeableConcept(value?.role),
    };
}
