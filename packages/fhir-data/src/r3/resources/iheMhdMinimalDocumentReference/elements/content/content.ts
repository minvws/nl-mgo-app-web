import { type DocumentReferenceContent } from 'fhir/r3';
import { type Nullable } from '../../../../../types/Nullable';
import { attachment, type Attachment } from '../../../../elements';

export interface IheMhdMinimalDocumentReferenceContent {
    attachment: Attachment | undefined;
}

export function parseContent(
    value: Nullable<DocumentReferenceContent>
): IheMhdMinimalDocumentReferenceContent {
    return {
        attachment: value?.attachment ? attachment.parse(value.attachment) : undefined,
    };
}
