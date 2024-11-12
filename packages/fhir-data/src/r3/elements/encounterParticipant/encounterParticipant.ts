import { type Nullable } from '../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { type ResourceElementConfigR3 } from '../config';
import { parse } from '../../../parse';
import { type EncounterParticipant } from 'fhir/r3';

export interface Participant {
    individual: parse.MgoReference | undefined;
}

function parseEncounterParticipant(value: Nullable<EncounterParticipant>): Participant {
    return {
        individual: parse.reference(value?.individual),
    };
}

export const encounterParticipant = {
    parse: parseEncounterParticipant,
    uiSchemaGroup,
} satisfies ResourceElementConfigR3<EncounterParticipant, Participant>;
