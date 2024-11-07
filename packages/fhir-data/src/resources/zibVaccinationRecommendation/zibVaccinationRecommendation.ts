import { type ImmunizationRecommendation } from '../../fhir/index';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { recommendation } from './elements/recommendation/recommendation';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317390
 */
function parseZibVaccinationRecommendation(resource: ImmunizationRecommendation) {
    return {
        ...parse.resourceMeta(resource, profile),
        orderStatus: parse.extensionNictiz(resource, 'zib-VaccinationRecommendation-OrderStatus'),
        recommendation: map(resource.recommendation, recommendation.parse),
    };
}

export type ZibVaccinationRecommendation = ReturnType<typeof parseZibVaccinationRecommendation>;

export const zibVaccinationRecommendation = {
    profile,
    parse: parseZibVaccinationRecommendation,
    uiSchema,
} satisfies ResourceConfig<ImmunizationRecommendation, ZibVaccinationRecommendation>;
