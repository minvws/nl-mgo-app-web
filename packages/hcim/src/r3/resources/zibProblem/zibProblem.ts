import { FhirVersion } from '@minvws/mgo-fhir';
import { type Condition } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-Problem'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317327
 */
function parseZibProblem(resource: Condition) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        subject: parse.reference(resource.subject),
        onsetDateTime: parse.dateTime(resource.onsetDateTime),
        asserter: parse.reference(resource.asserter),

        // HCIM Problem-v4.1(2017EN)
        clinicalStatus: {
            problemStatusCodelist: parse.extension(
                resource._clinicalStatus,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
        verificationStatus: {
            verificatieStatusCodelijst: parse.extension(
                resource._verificationStatus,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
        category: map(resource.category, parse.codeableConcept),
        code: parse.codeableConcept(resource.code),
        bodySite: map(resource.bodySite, (bodySite) => ({
            ...parse.codeableConcept(bodySite),
            laterality: parse.extension(
                bodySite,
                'http://nictiz.nl/fhir/StructureDefinition/BodySite-Qualifier', // NOSONAR
                'codeableConcept'
            ),
        })),
        abatementDateTime: parse.dateTime(resource.abatementDateTime),
        note: map(resource.note, parse.annotation),
    };
}

export type ZibProblem = ReturnType<typeof parseZibProblem>;

export const zibProblem = {
    profile,
    parse: parseZibProblem,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, Condition, ZibProblem>;
