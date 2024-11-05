import { type HealthcareOrganization } from '$/store/organizations/organizations';
import {
    DataServiceId,
    createBgzClient,
    createDocumentsClient,
    createGpClient,
    createVaccinationsClient,
} from '@minvws/mgo-fhir-client';

const dataServiceMap = {
    [DataServiceId.CommonClinicalDataset]: createBgzClient,
    [DataServiceId.Documents]: createDocumentsClient,
    [DataServiceId.GeneralPractitioner]: createGpClient,
    [DataServiceId.Vaccinations]: createVaccinationsClient,
};

const resourceEndpointMap = {
    [DataServiceId.CommonClinicalDataset]: 'commonClinicalDataset',
    [DataServiceId.Documents]: 'documents',
    [DataServiceId.GeneralPractitioner]: 'generalPractitioner',
    [DataServiceId.Vaccinations]: 'vaccinations',
} satisfies Record<DataServiceId, keyof HealthcareOrganization['resourceEndpoints']>;

export function getDataService<T extends DataServiceId>(
    organization: HealthcareOrganization | undefined,
    dataServiceId: T | undefined
) {
    if (!dataServiceId) {
        return null;
    }

    const createClient = dataServiceMap[dataServiceId];
    const resourceEndpoint = organization?.resourceEndpoints[resourceEndpointMap[dataServiceId]];

    if (!resourceEndpoint) {
        return null;
    }

    return createClient({
        prefixUrl: 'https://dva.test.mgo.irealisatie.nl/fhir/',
        timeout: 10000,
        headers: {
            'x-mgo-dva-target': resourceEndpoint,
        },
    }) as ReturnType<(typeof dataServiceMap)[T]>;
}
