import { type HealthcareOrganization } from '$/store/organizations/organizations';
import { createDocumentsClient } from '@minvws/mgo-fhir-client';

export function getDocumentsService(organization?: HealthcareOrganization) {
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
