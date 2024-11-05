import { type DocumentReference } from '../../fhir/index';
import { parse } from '../../parse';
import { map } from '../../utils';
import { type ResourceConfig } from '../config';
import { parseContent } from './elements/content/content';
import { uiSchema } from './uiSchema';

const profile = 'http://nictiz.nl/fhir/StructureDefinition/IHE.MHD.Minimal.DocumentReference';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317003
 */
function parseIheMhdMinimalDocumentReference(resource: DocumentReference) {
    return {
        ...parse.resourceMeta(resource, profile),
        description: parse.string(resource.description),
        status: parse.code(resource.status),
        type: parse.codeableConcept(resource.type),
        indexed: parse.string(resource.indexed),
        securityLabel: map(resource.securityLabel, parse.codeableConcept),
        author: map(resource.author, parse.reference),
        content: parseContent(resource.content[0]),
    };
}

export type IheMhdMinimalDocumentReference = ReturnType<typeof parseIheMhdMinimalDocumentReference>;

export const iheMhdMinimalDocumentReference = {
    profile,
    parse: parseIheMhdMinimalDocumentReference,
    uiSchema,
} satisfies ResourceConfig<DocumentReference, IheMhdMinimalDocumentReference>;
