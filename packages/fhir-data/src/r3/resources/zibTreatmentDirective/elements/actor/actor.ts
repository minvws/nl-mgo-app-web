import { type ConsentActor } from 'fhir/r3';
import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { type Nullable } from '../../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { parse } from '../../../../../parse';

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
} satisfies ResourceElementConfigR3<ConsentActor, Actor>;
