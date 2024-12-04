import { type DataService, DataServiceId } from '../../DataService';
import { createClient } from '../../client';
import { type FhirClientOptions } from '../../types';
import { setupDocuments } from '../sections/documents/setupDocuments';
import { FhirVersion } from '@minvws/mgo-fhir-data';

export function createDocumentsClient(options: FhirClientOptions) {
    const client = createClient(options);

    return {
        dataServiceId: DataServiceId.Documents,
        fhirVersion: FhirVersion.R3,
        ...client,
        ...setupDocuments(client),
    } satisfies DataService;
}
