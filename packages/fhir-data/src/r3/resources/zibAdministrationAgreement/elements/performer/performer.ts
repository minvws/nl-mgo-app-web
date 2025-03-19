import { type MedicationDispensePerformer } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';

export interface Performer {
    actor: parse.MgoReference | undefined;
    onBehalfOf: parse.MgoReference | undefined;
}

export function parsePerformer(value: Nullable<MedicationDispensePerformer>): Performer {
    return {
        actor: parse.reference(value?.actor),
        onBehalfOf: parse.reference(value?.onBehalfOf),
    };
}
