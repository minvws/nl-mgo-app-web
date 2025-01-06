import { type ImmunizationRecommendationRecommendation } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { map } from '../../../../../utils';
import { type ResourceElementConfig } from '../../../../../types/Fhir';
import { uiSchemaGroup } from './uiSchemaGroup';

export interface Recommendation {
    date: parse.MgoDateTime | undefined;
    code: parse.MgoCodeableConcept | undefined;
    dateCriterion: parse.MgoDateTime[] | undefined;
}

function parseRecommendation(
    value: Nullable<ImmunizationRecommendationRecommendation>
): Recommendation {
    return {
        date: parse.dateTime(value?.date),
        code: parse.codeableConcept(value?.vaccineCode),
        dateCriterion: map(value?.dateCriterion, (x) => parse.dateTime(x.value)),
    };
}

export const recommendation = {
    parse: parseRecommendation,
    uiSchemaGroup,
} satisfies ResourceElementConfig<ImmunizationRecommendationRecommendation, Recommendation>;
