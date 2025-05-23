import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type NutritionOrder } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317294
 */
function parseZibNutritionAdvice(resource: NutritionOrder) {
    const { oralDiet } = resource;

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.patient),
        dateTime: parse.dateTime(resource.dateTime),
        orderer: parse.reference(resource.orderer),

        // HCIM NutritionAdvice-v3.1(2017EN)
        comment: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-NutritionAdvice-Explanation', // NOSONAR
            'string'
        ),

        oralDiet: {
            type: map(oralDiet?.type, parse.codeableConcept),
            fluidConsistencyType: map(oralDiet?.fluidConsistencyType, parse.codeableConcept),
            texture: map(oralDiet?.texture, (texture) => ({
                modifier: parse.codeableConcept(texture.modifier),
                foodType: parse.codeableConcept(texture.foodType),
            })),
        },
    };
}

export type ZibNutritionAdvice = ReturnType<typeof parseZibNutritionAdvice>;

export const zibNutritionAdvice = {
    profile,
    parse: parseZibNutritionAdvice,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<NutritionOrder, ZibNutritionAdvice>;
