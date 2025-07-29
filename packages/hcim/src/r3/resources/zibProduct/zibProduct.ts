import { FhirVersion } from '@minvws/mgo-fhir';
import { type Medication } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Product'; // NOSONAR

/**
 * @name HCIM PharmaceuticalProduct
 * @usage zibMedicationUse.medicationReference
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
function parseZibProduct(resource: Medication) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM PharmaceuticalProduct-v2.0(2017EN)
        description: parse.extension(
            resource,
            'http://nictiz.nl/fhir/StructureDefinition/zib-Product-Description', // NOSONAR
            'string'
        ),
        code: {
            text: parse.string(resource.code?.text),
            coding: map(resource.code?.coding, parse.coding),
        },
        form: parse.codeableConcept(resource.form),
        ingredient: map(resource.ingredient, (ingredient) => ({
            item_codeable_concept: parse.codeableConcept(ingredient.itemCodeableConcept),
            amount: parse.ratio(ingredient.amount),
        })),
    };
}

export type ZibProduct = ReturnType<typeof parseZibProduct>;

export const zibProduct = {
    profile,
    parse: parseZibProduct,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Medication, ZibProduct>;
