import { type LosslessNumber } from '@minvws/mgo-fhir-client';
import { type DeepReplaceTypeInObject } from '@minvws/mgo-fhir-client/types/replacement.js';
import type { Bundle, DocumentReference, FhirResource, InputFhir } from '../../fhir';
import { getBundleResources, safeGetBulk } from '../../utils';

export function getMgoDocuments<T extends FhirResource>(bundle: InputFhir<Bundle<T>>) {
    const manifest = getBundleResources(bundle, 'DocumentReference');

    return manifest.map(getMgoDocument);
}

export function getMgoDocument(
    document: DocumentReference | DeepReplaceTypeInObject<DocumentReference, number, LosslessNumber>
) {
    return {
        ...safeGetBulk(document, {
            id: ({ id }) => id,
            title: ({ description }) => description,
            content: ({ content }) => content,
            indexed: ({ indexed }) => indexed,
            status: ({ securityLabel }) =>
                securityLabel
                    .map((x) => x.coding.map((y) => y.display))
                    .flat()
                    .join(', '),
            author: ({ author }) =>
                author
                    .map((x) => x.display)
                    .flat()
                    .join(', '),
        }),
    };
}

export type MgoDocumentReference = ReturnType<typeof getMgoDocuments>[number];
