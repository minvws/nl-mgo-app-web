import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type ConditionStage } from 'fhir/r3';
import * as parse from '../../../../../parse/type';
import { type ResourceElementConfig } from '../../../../../types';
import { map } from '../../../../../utils';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Stage {
    summary: parse.MgoCodeableConcept | undefined;
    assessment: parse.MgoReference[] | undefined;
}

function parseStage(value: Nullable<ConditionStage>): Stage {
    return {
        summary: parse.codeableConcept(value?.summary),
        assessment: map(value?.assessment, parse.reference),
    };
}

export const stage = {
    parse: parseStage,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ConditionStage, Stage>;
