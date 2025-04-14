import { type Nullable } from '@minvws/mgo-mgo-utils';
import { type DocumentManifestContent } from 'fhir/r3';
import { parse } from '../../../../../parse';

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
