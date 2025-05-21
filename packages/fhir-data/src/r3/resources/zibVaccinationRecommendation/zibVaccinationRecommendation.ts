import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type ImmunizationRecommendation } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317390
 */
function parseZibVaccinationRecommendation(resource: ImmunizationRecommendation) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.patient),

        // HCIM PlannedCareActivityForTransfer-v3.1(2017EN) & HCIM Vaccination-v3.1(2017EN)
        orderStatus: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-VaccinationRecommendation-OrderStatus', // NOSONAR
            'codeableConcept'
        ),
        recommendation: map(resource.recommendation, (recomendation) => ({
            // HCIM BasicElements-v1.0(2017EN)
            date: parse.dateTime(recomendation?.date),

            // HCIM PlannedCareActivityForTransfer-v3.1(2017EN)
            supportingImmunization: map(recomendation?.supportingImmunization, parse.reference),

            // HCIM Vaccination-v3.1(2017EN)
            vaccineCode: parse.codeableConcept(recomendation?.vaccineCode),
            dateCriterion: map(recomendation?.dateCriterion, (x) => parse.dateTime(x.value)),
        })),
    };
}

export type ZibVaccinationRecommendation = ReturnType<typeof parseZibVaccinationRecommendation>;

export const zibVaccinationRecommendation = {
    profile,
    parse: parseZibVaccinationRecommendation,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<ImmunizationRecommendation, ZibVaccinationRecommendation>;
