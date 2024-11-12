import { type ConditionEvidence } from 'fhir/r3';
import { type ResourceElementConfigR3 } from '../../../../elements/config';
import * as parse from '../../../../../parse/type';
import { type Nullable } from '../../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { map } from '../../../../../utils';

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
} satisfies ResourceElementConfigR3<ConditionEvidence, Evidence>;
