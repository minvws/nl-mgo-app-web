import { type DocumentManifest } from '../../fhir';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { parseContent } from './elements/content/content';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.DocumentManifest';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317001
 */
function parseIheMhdDocumentManifest(resource: DocumentManifest) {
    return {
        ...parse.resourceMeta(resource, profile),
        description: parse.string(resource.description),
        created: parse.dateTime(resource.created),
        subject: parse.reference(resource.subject),
        status: parse.code(resource.status),
        type: parse.codeableConcept(resource.type),
        author: map(resource.author, parse.reference),
        recipient: map(resource.recipient, parse.reference),
        content: map(resource.content, parseContent),
    };
}

export type IheMhdDocumentManifest = ReturnType<typeof parseIheMhdDocumentManifest>;

export const iheMhdDocumentManifest = {
    profile,
    parse: parseIheMhdDocumentManifest,
    uiSchema,
} satisfies ResourceConfig<DocumentManifest, IheMhdDocumentManifest>;
