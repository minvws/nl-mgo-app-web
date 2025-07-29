import { type ProcedurePerformer } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { type Nullable } from '@minvws/mgo-utils';

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
