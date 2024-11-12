import { attachment, type MgoAttachment } from '../../../../elements';
import { type DocumentReferenceContent } from 'fhir/r3';
import { type Nullable } from '../../../../../types/Nullable';

export interface IheMhdMinimalDocumentReferenceContent {
    attachment: MgoAttachment | undefined;
}

export function parseContent(
    value: Nullable<DocumentReferenceContent>
): IheMhdMinimalDocumentReferenceContent {
    return {
        attachment: value?.attachment ? attachment.parse(value.attachment) : undefined,
    };
}
