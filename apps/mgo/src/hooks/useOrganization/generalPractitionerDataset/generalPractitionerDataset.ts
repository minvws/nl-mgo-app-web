import { type HealthcareOrganization } from '$/store/organizations';
import { createGpClient } from '@minvws/mgo-fhir-client';

export function getGeneralPractitionerDataset(organization?: HealthcareOrganization) {
    if (!organization?.resourceEndpoints.generalPractitioner) {
        return null;
    }

    return createGpClient({
        prefixUrl: 'https://dva.test.mgo.irealisatie.nl/fhir/',
        timeout: 10000,
        headers: {
            'x-mgo-dva-target': organization.resourceEndpoints.generalPractitioner,
        },
    });
}
