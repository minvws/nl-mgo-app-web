import { type HealthcareOrganization } from '$/store/organizations';
import { createDocumentsClient } from '@minvws/mgo-fhir-client';

export function getDocumentDataset(organization?: HealthcareOrganization) {
    if (!organization?.resourceEndpoints.documents) {
        return null;
    }

    return createDocumentsClient({
        prefixUrl: 'https://dva.test.mgo.irealisatie.nl/fhir/',
        timeout: 10000,
        headers: {
            'x-mgo-dva-target': organization.resourceEndpoints.documents,
        },
    });
}
