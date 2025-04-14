import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ProcedurePerformer } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
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
