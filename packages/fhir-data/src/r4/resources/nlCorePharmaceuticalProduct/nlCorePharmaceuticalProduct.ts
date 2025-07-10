import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Medication } from 'fhir/r4';
import { parse } from '../../../parse';
import { oneOfValueX } from '../../../parse/helpers';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-PharmaceuticalProduct'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.11.0-beta.1/files/2628579
 */
function parseNlCorePharmaceuticalProduct(resource: Medication) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),

        // ART-DECOR Dataset Vaccination-Immunization
        identifier: map(resource.identifier, parse.identifier),
        batch: {
            lotNumber: parse.string(resource.batch?.lotNumber),
        },

        // zib PharmaceuticalProduct-v2.1.2(2020EN)
        code: {
            text: parse.string(resource.code?.text),
            coding: map(resource.code?.coding, parse.coding),
        },
        form: parse.codeableConcept(resource.form),
        ingredient: map(resource.ingredient, (ingredient) => ({
            ...oneOfValueX(ingredient, ['codeableConcept', 'reference'], 'item'),
            strength: parse.ratio(ingredient.strength),
        })),
    };
}

export type R4NlCorePharmaceuticalProduct = ReturnType<typeof parseNlCorePharmaceuticalProduct>;

export const nlCorePharmaceuticalProductR4 = {
    profile,
    parse: parseNlCorePharmaceuticalProduct,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<Medication, R4NlCorePharmaceuticalProduct>;
