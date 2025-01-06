import { type ProcedurePerformer } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
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
} satisfies ResourceElementConfig<ProcedurePerformer, Performer>;
