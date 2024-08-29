import { type LosslessNumber } from 'lossless-json';
import type { Bundle, DocumentReference, FhirResource } from '../../fhir';
import { type DeepReplaceTypeInObject } from '../../types/DeepReplaceType';
import { getBundleResources, safeGetBulk } from '../../utils';
import { type Lossless } from '../../types/Lossless';

export function getMgoDocuments<T extends FhirResource>(bundle: Lossless<Bundle<T>>) {
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
