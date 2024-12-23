import { type NutritionOrder } from 'fhir/r3';
import { type I18nContext } from '../../../i18n';
import { FhirVersion } from '../../../types/Fhir';
import { parse } from '../../../parse';
import { type ResourceConfigR3 } from '../config';
import { uiSchema } from './uiSchema';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317294
 */
function parseZibNutritionAdvice(resource: NutritionOrder, _i18nContext: I18nContext) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        comment: parse.extensionNictiz(resource, 'zib-NutritionAdvice-Explanation'),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        patient: parse.reference(resource.patient),
        dateTime: parse.dateTime(resource.dateTime),
        foodPreferenceModifier: map(resource.foodPreferenceModifier, parse.codeableConcept),
    };
}

export type ZibNutritionAdvice = ReturnType<typeof parseZibNutritionAdvice>;

export const zibNutritionAdvice = {
    profile,
    parse: parseZibNutritionAdvice,
    uiSchema,
} satisfies ResourceConfigR3<NutritionOrder, ZibNutritionAdvice>;
