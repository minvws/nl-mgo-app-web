import { FhirVersion, createClient } from '@minvws/mgo-fhir-client';
import { DataServiceId, type DataService, type DataServiceOptions } from '../../types';
import { setupDocuments } from './sections/documents/setupDocuments';

export function createPdfAService(options: DataServiceOptions) {
    const client = createClient({
        fhirVersion: FhirVersion.R3,
        ...options,
    });

    return {
        dataServiceId: DataServiceId.PdfA,
        ...client,
        ...setupDocuments(client),
    } satisfies DataService;
}
