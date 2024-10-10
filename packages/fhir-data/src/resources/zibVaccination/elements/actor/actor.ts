import { type ImmunizationPractitioner } from 'fhir/r3';
import { type Nullable } from '../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { type ResourceElementConfig } from '../../../../elements/config';
import { parse } from '../../../../parse';

export interface Actor {
    actor: parse.MgoReference | undefined;
}

function parseActor(value: Nullable<ImmunizationPractitioner>): Actor {
    return {
        actor: parse.reference(value?.actor),
    };
}

export const actor = {
    parse: parseActor,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ImmunizationPractitioner, Actor>;
