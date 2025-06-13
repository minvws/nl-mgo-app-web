import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type DocumentReference } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../resourceTypes';
import { generateUiSchema } from '../../../ui/generator';
import { map } from '../../../utils';
import { summary } from './summary';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317003
 */
function parseIheMhdMinimalDocumentReference(resource: DocumentReference) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        masterIdentifier: parse.identifier(resource.masterIdentifier),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        type: parse.codeableConcept(resource.type),
        class: parse.codeableConcept(resource.class),
        subject: parse.reference(resource.subject),
        indexed: parse.instant(resource.indexed),
        author: map(resource.author, parse.reference),
        relatesTo: map(resource.relatesTo, (relatesTo) => ({
            target: parse.reference(relatesTo.target),
        })),
        securityLabel: map(resource.securityLabel, parse.codeableConcept),
        content: {
            attachment: parse.attachment(resource.content?.[0].attachment),
            format: parse.coding(resource.content?.[0].format),
        },
        context: {
            period: parse.period(resource.context?.period),
            facilityType: parse.codeableConcept(resource.context?.facilityType),
            practiceSetting: parse.codeableConcept(resource.context?.practiceSetting),
            sourcePatientInfo: parse.reference(resource.context?.sourcePatientInfo),
        },
    };
}

export type IheMhdMinimalDocumentReference = ReturnType<typeof parseIheMhdMinimalDocumentReference>;

export const iheMhdMinimalDocumentReference = {
    profile,
    parse: parseIheMhdMinimalDocumentReference,
    uiSchema: generateUiSchema,
    summary,
} satisfies ResourceConfig<DocumentReference, IheMhdMinimalDocumentReference>;
