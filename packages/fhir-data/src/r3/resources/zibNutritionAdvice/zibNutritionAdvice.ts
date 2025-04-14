import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type NutritionOrder } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317294
 */
function parseZibNutritionAdvice(resource: NutritionOrder) {
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
} satisfies ResourceConfig<NutritionOrder, ZibNutritionAdvice>;
