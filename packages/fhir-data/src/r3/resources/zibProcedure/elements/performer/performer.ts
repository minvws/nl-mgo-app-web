import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { type ProcedurePerformer } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Performer {
    actor: parse.MgoReference | undefined;
}

function parsePerformer(value: Nullable<ProcedurePerformer>): Performer {
    return {
        actor: parse.reference(value?.actor),
    };
}

export const performer = {
    parse: parsePerformer,
    uiSchemaGroup,
} satisfies ResourceElementConfigR3<ProcedurePerformer, Performer>;
