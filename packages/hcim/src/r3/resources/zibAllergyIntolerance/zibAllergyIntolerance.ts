import { FhirVersion } from '@minvws/mgo-fhir';
import { type AllergyIntolerance } from '@minvws/mgo-fhir/r3';
import { parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/zib-AllergyIntolerance'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317138
 */
function parseZibAllergyIntolerance(resource: AllergyIntolerance) {
    const category = map(resource._category, (category) => ({
        allergieCategorieCodelijst: parse.extension(
            category,
            'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
            'codeableConcept'
        ),
    }));

    const reaction = map(resource.reaction, (reaction) => ({
        substance: parse.codeableConcept(reaction.substance),
        manifestation: map(reaction.manifestation, parse.codeableConcept),
        description: parse.string(reaction.description),
        onset: parse.dateTime(reaction.onset),
        severity: {
            severityCodelist: parse.extensionMultiple(
                reaction._severity,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
        exposureRoute: parse.codeableConcept(reaction.exposureRoute),
    }));

    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),

        // HCIM BasicElements-v1.0(2017EN)
        identifier: map(resource.identifier, parse.identifier),
        patient: parse.reference(resource.patient),
        onsetDateTime: parse.dateTime(resource.onsetDateTime),
        recorder: parse.reference(resource.recorder),
        source: parse.reference(resource.asserter),

        // HCIM AllergyIntolerance-v3.2(2017EN)
        clinicalStatus: {
            allergieStatusCodelijst: parse.extension(
                resource._clinicalStatus,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
        verificationStatus: parse.code(resource.verificationStatus),
        category,
        criticality: {
            criticalExtentCodelist: parse.extension(
                resource._criticality,
                'http://nictiz.nl/fhir/StructureDefinition/code-specification', // NOSONAR
                'codeableConcept'
            ),
        },
        code: parse.codeableConcept(resource.code),
        lastOccurrence: parse.dateTime(resource.lastOccurrence),
        note: map(resource.note, parse.annotation),
        reaction,
    };
}

export type ZibAllergyIntolerance = ReturnType<typeof parseZibAllergyIntolerance>;

export const zibAllergyIntolerance = {
    profile,
    parse: parseZibAllergyIntolerance,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, AllergyIntolerance, ZibAllergyIntolerance>;
