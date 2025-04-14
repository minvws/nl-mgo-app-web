import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ConditionEvidence } from 'fhir/r3';
import * as parse from '../../../../../parse/type';
import { type ResourceElementConfig } from '../../../../../types';
import { map } from '../../../../../utils';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Evidence {
    code: parse.MgoCodeableConcept[] | undefined;
    detail: parse.MgoReference[] | undefined;
}

function parseEvidence(value: Nullable<ConditionEvidence>): Evidence {
    return {
        code: map(value?.code, parse.codeableConcept),
        detail: map(value?.detail, parse.reference),
    };
}

export const evidence = {
    parse: parseEvidence,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ConditionEvidence, Evidence>;
