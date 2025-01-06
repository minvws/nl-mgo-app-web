import { type EncounterParticipant as FhirEncounterParticipant } from 'fhir/r3';
import { parse } from '../../../parse';
import { type Nullable } from '../../../types/Nullable';
import { type ResourceElementConfig } from '../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface EncounterParticipant {
    individual: parse.MgoReference | undefined;
}

function parseEncounterParticipant(
    value: Nullable<FhirEncounterParticipant>
): EncounterParticipant {
    return {
        individual: parse.reference(value?.individual),
    };
}

export const encounterParticipant = {
    parse: parseEncounterParticipant,
    uiSchemaGroup,
} satisfies ResourceElementConfig<FhirEncounterParticipant, EncounterParticipant>;
