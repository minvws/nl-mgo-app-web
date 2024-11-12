import { parse } from '../../../parse';
import { map } from '../../../utils';
import { type ResourceConfigR3 } from '../config';
import { recommendation } from './elements/recommendation/recommendation';
import { uiSchema } from './uiSchema';
import { FhirVersion } from '../../../types/Fhir';
import { type ImmunizationRecommendation } from 'fhir/r3';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317390
 */
function parseZibVaccinationRecommendation(resource: ImmunizationRecommendation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        orderStatus: parse.extensionNictiz(resource, 'zib-VaccinationRecommendation-OrderStatus'),
        recommendation: map(resource.recommendation, recommendation.parse),
    };
}

export type ZibVaccinationRecommendation = ReturnType<typeof parseZibVaccinationRecommendation>;

export const zibVaccinationRecommendation = {
    profile,
    parse: parseZibVaccinationRecommendation,
    uiSchema,
} satisfies ResourceConfigR3<ImmunizationRecommendation, ZibVaccinationRecommendation>;
