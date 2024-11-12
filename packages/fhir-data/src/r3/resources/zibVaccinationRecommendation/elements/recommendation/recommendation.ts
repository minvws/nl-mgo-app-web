import { type ImmunizationRecommendationRecommendation } from 'fhir/r3';
import { type ResourceElementConfigR3 } from '../../../../elements/config';
import { type Nullable } from '../../../../../types/Nullable';
import { uiSchemaGroup } from './uiSchemaGroup';
import { parse } from '../../../../../parse';
import { map } from '../../../../../utils';

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
} satisfies ResourceElementConfigR3<ImmunizationRecommendationRecommendation, Recommendation>;
