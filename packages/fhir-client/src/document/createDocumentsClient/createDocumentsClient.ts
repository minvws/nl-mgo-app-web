import { type DataService, DataServiceId } from '../../DataService';
import { createClient } from '../../client';
import type { FhirClientOptions } from '../../types';
import { setupDocuments } from '../sections/documents/setupDocuments';

export function createDocumentsClient(options: FhirClientOptions) {
    const client = createClient(options);

    return {
        dataServiceId: DataServiceId.Documents,
        ...client,
        ...setupDocuments(client),
    } satisfies DataService;
}
