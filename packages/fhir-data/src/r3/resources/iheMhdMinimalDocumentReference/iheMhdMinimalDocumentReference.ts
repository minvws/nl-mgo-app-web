import { FhirVersion } from '@minvws/mgo-fhir-types';
import { type DocumentReference } from 'fhir/r3';
import { parse } from '../../../parse';
import { type ResourceConfig } from '../../../types/Fhir';
import { map } from '../../../utils';
import { parseContent } from './elements/content/content';
import { summary } from './summary';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317003
 */
function parseIheMhdMinimalDocumentReference(resource: DocumentReference) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        masterIdentifier: parse.identifier(resource.masterIdentifier),
        status: parse.code(resource.status),
        type: parse.codeableConcept(resource.type),
        class: parse.codeableConcept(resource.class),
        subject: parse.reference(resource.subject),
        indexed: parse.instant(resource.indexed),
        author: map(resource.author, parse.reference),
        content: parseContent(resource.content[0]),
        securityLabel: map(resource.securityLabel, parse.codeableConcept),
    };
}

export type IheMhdMinimalDocumentReference = ReturnType<typeof parseIheMhdMinimalDocumentReference>;

export const iheMhdMinimalDocumentReference = {
    profile,
    parse: parseIheMhdMinimalDocumentReference,
    uiSchema,
    summary,
} satisfies ResourceConfig<DocumentReference, IheMhdMinimalDocumentReference>;
