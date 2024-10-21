import { type ResourceElementConfig } from '../../../../elements/config';
import { type ProcedurePerformer } from '../../../../fhir/index';
import { parse } from '../../../../parse';
import { type Nullable } from '../../../../types/Nullable';
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
