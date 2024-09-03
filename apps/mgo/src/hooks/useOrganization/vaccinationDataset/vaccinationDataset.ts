import { type HealthcareOrganization } from '$/store/organizations';
import { createVaccinationsClient } from '@minvws/mgo-fhir-client';

export function getVaccinationDataset(organization?: HealthcareOrganization) {
    if (!organization?.resourceEndpoints.vaccinations) {
        return null;
    }

    return createVaccinationsClient({
        prefixUrl: 'https://dva.test.mgo.irealisatie.nl/fhir/',
        timeout: 10000,
        headers: {
            'x-mgo-dva-target': organization.resourceEndpoints.vaccinations,
        },
    });
}
