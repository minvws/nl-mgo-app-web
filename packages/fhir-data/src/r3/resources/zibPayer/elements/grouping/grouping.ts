import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type CoverageGrouping } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type ResourceElementConfig } from '../../../../../types';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Grouping {
    group: parse.MgoString | undefined;
    groupDisplay: parse.MgoString | undefined;
    subGroup: parse.MgoString | undefined;
    subGroupDisplay: parse.MgoString | undefined;
    plan: parse.MgoString | undefined;
    planDisplay: parse.MgoString | undefined;
    subPlan: parse.MgoString | undefined;
    subPlanDisplay: parse.MgoString | undefined;
    class: parse.MgoString | undefined;
    classDisplay: parse.MgoString | undefined;
    subClass: parse.MgoString | undefined;
    subClassDisplay: parse.MgoString | undefined;
}

function parseGrouping(value: Nullable<CoverageGrouping>): Grouping {
    return {
        group: parse.string(value?.group),
        groupDisplay: parse.string(value?.groupDisplay),
        subGroup: parse.string(value?.subGroup),
        subGroupDisplay: parse.string(value?.subGroupDisplay),
        plan: parse.string(value?.plan),
        planDisplay: parse.string(value?.planDisplay),
        subPlan: parse.string(value?.subPlan),
        subPlanDisplay: parse.string(value?.subPlanDisplay),
        class: parse.string(value?.class),
        classDisplay: parse.string(value?.classDisplay),
        subClass: parse.string(value?.subClass),
        subClassDisplay: parse.string(value?.subClassDisplay),
    };
}

export const grouping = {
    parse: parseGrouping,
    uiSchemaGroup,
} satisfies ResourceElementConfig<CoverageGrouping, Grouping>;
