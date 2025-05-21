import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type Medication } from 'fhir/r4';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types';
import { map } from '../../../utils';
import { batch } from './elements/batch/batch';
import { ingredient } from './elements/ingredient/ingredient';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/nl-core-PharmaceuticalProduct'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.nl-core/0.8.0-beta.1/files/1946208
 */
function parseNlCorePharmaceuticalProduct(resource: Medication) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R4),
        description: parse.extensionNictiz(resource, 'ext-PharmaceuticalProduct.Description'),
        code: parse.codeableConcept(resource.code),
        status: parse.code(resource.status),
        manufacturer: parse.reference(resource.manufacturer),
        form: parse.codeableConcept(resource.form),
        amount: parse.ratio(resource.amount),
        ingredient: map(resource.ingredient, ingredient.parse),
        batch: batch.parse(resource.batch),
        identifier: map(resource.identifier, parse.identifier),
        name: parse.string(resource.code?.text),
    };
}

export type R4NlCorePharmaceuticalProduct = ReturnType<typeof parseNlCorePharmaceuticalProduct>;

export const nlCorePharmaceuticalProductR4 = {
    profile,
    parse: parseNlCorePharmaceuticalProduct,
    uiSchema,
} satisfies ResourceConfig<Medication, R4NlCorePharmaceuticalProduct>;
