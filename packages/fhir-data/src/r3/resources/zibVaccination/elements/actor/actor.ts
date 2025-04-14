import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ImmunizationPractitioner } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

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
