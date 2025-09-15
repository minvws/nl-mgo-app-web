import { FhirVersion } from '@minvws/mgo-fhir';
import { type Flag } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Alert'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317136
 */
function parseZibAlert(resource: Flag) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        author: parse.reference(resource.author),
        patient: parse.reference(resource.subject),

        // HCIM Alert-v3.2(2017EN)
        concernReference: parse.extension(
            resource,
            'http://hl7.org/fhir/StructureDefinition/flag-detail', // NOSONAR
            'reference'
        ),
        category: parse.codeableConcept(resource.category),
        code: parse.codeableConcept(resource.code),
        period: parse.period(resource.period),
    };
}

export type ZibAlert = ReturnType<typeof parseZibAlert>;

export const zibAlert = {
    profile,
    parse: parseZibAlert,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Flag, ZibAlert>;
