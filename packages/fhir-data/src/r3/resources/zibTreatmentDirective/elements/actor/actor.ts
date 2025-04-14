import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ConsentActor } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Actor {
    role: parse.MgoCodeableConcept | undefined;
    reference: parse.MgoReference | undefined;
}

function parseActor(value: Nullable<ConsentActor>): Actor {
    return {
        role: parse.codeableConcept(value?.role),
        reference: parse.reference(value?.reference),
    };
}

export const actor = {
    parse: parseActor,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ConsentActor, Actor>;
