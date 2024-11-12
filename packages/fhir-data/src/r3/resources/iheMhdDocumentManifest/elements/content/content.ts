import { attachment, type MgoAttachment } from '../../../../elements';
import { type DocumentManifestContent } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';

export interface IheMhdMinimalDocumentReferenceContent {
    attachment: MgoAttachment | undefined;
    reference: parse.MgoReference | undefined;
}

export function parseContent(
    value: Nullable<DocumentManifestContent>
): IheMhdMinimalDocumentReferenceContent {
    return {
        attachment: value?.pAttachment ? attachment.parse(value.pAttachment) : undefined,
        reference: parse.reference(value?.pReference),
    };
}
