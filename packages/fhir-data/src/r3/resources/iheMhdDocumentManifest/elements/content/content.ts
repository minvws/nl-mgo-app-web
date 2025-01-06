import { type DocumentManifestContent } from 'fhir/r3';
import { parse } from '../../../../../parse';
import { type Nullable } from '../../../../../types/Nullable';
import { attachment, type Attachment } from '../../../../elements';

export interface IheMhdMinimalDocumentReferenceContent {
    attachment: Attachment | undefined;
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
