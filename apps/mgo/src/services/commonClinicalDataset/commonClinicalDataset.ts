import { type HealthcareOrganization } from '$/store/organizations/organizations';
import { createBgzClient } from '@minvws/mgo-fhir-client';

export function getCommonClinicalDatasetService(organization?: HealthcareOrganization) {
    if (!organization?.resourceEndpoints.commonClinicalDataset) {
        return null;
    }

    return createBgzClient({
        prefixUrl: 'https://dva.test.mgo.irealisatie.nl/fhir/',
        timeout: 10000,
        headers: {
            'x-mgo-dva-target': organization.resourceEndpoints.commonClinicalDataset,
        },
    });
}
