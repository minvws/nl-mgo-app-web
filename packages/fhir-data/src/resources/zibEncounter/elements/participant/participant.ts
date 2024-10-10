import { type EncounterParticipant } from '../../../../fhir/index';
import { type Nullable } from '../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { type ResourceElementConfig } from '../../../../elements/config';
import { parse } from '../../../../parse';

export interface Participant {
    individual: parse.MgoReference | undefined;
}

function parseParticipant(value: Nullable<EncounterParticipant>): Participant {
    return {
        individual: parse.reference(value?.individual),
    };
}

export const participant = {
    parse: parseParticipant,
    uiSchemaGroup,
} satisfies ResourceElementConfig<EncounterParticipant, Participant>;
