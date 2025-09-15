import { FhirVersion } from '@minvws/mgo-fhir';
import { type DocumentManifest } from '@minvws/mgo-fhir/r3';
import { oneOfValueX, parse } from '@minvws/mgo-hcim-parse';
import { generateUiSchema } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { type ResourceConfig } from '../../../resourceTypes.js';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.DocumentManifest'; // NOSONAR

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317001
 */
function parseIheMhdDocumentManifest(resource: DocumentManifest) {
    return {
        ...parse.resourceMeta(resource, profile, FhirVersion.R3),
        masterIdentifier: parse.identifier(resource.masterIdentifier),
        identifier: map(resource.identifier, parse.identifier),
        status: parse.code(resource.status),
        type: parse.codeableConcept(resource.type),
        subject: parse.reference(resource.subject),
        created: parse.dateTime(resource.created),
        author: map(resource.author, parse.reference),
        content: map(resource.content, (content) => ({
            ...oneOfValueX(content, ['reference', 'attachment'], 'p'),
        })),
    };
}

export type IheMhdDocumentManifest = ReturnType<typeof parseIheMhdDocumentManifest>;

export const iheMhdDocumentManifest = {
    profile,
    parse: parseIheMhdDocumentManifest,
    uiSchema: generateUiSchema,
} satisfies ResourceConfig<FhirVersion.R3, DocumentManifest, IheMhdDocumentManifest>;
