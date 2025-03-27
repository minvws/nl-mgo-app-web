import { type DocumentManifestContent } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';

export interface IheMhdMinimalDocumentReferenceContent {
    attachment: parse.MgoAttachment | undefined;
    reference: parse.MgoReference | undefined;
}

export function parseContent(
    value: Nullable<DocumentManifestContent>
): IheMhdMinimalDocumentReferenceContent {
    return {
        attachment: parse.attachment(value?.pAttachment),
        reference: parse.reference(value?.pReference),
    };
}
