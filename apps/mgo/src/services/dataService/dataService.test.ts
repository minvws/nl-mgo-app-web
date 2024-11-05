import { faker } from '$test/faker';
import {
    DataServiceId,
    createBgzClient,
    createDocumentsClient,
    createGpClient,
    createVaccinationsClient,
} from '@minvws/mgo-fhir-client';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { getDataService } from './dataService';

const dataServiceClientMocks = {
    [DataServiceId.Vaccinations]: createVaccinationsClient as MockedFunction<
        typeof createVaccinationsClient
    >,
    [DataServiceId.CommonClinicalDataset]: createBgzClient as MockedFunction<
        typeof createBgzClient
    >,
    [DataServiceId.Documents]: createDocumentsClient as MockedFunction<
        typeof createDocumentsClient
    >,
    [DataServiceId.GeneralPractitioner]: createGpClient as MockedFunction<typeof createGpClient>,
};

vi.mock('@minvws/mgo-fhir-client', async (importActual) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const mod = await importActual<typeof import('@minvws/mgo-fhir-client')>();
    return {
        ...mod,
        createBgzClient: vi.fn(() => ({
            dataServiceId: DataServiceId.CommonClinicalDataset,
        })),
        createDocumentsClient: vi.fn(() => ({
            dataServiceId: DataServiceId.Documents,
        })),
        createGpClient: vi.fn(() => ({
            dataServiceId: DataServiceId.GeneralPractitioner,
        })),
        createVaccinationsClient: vi.fn(() => ({
            dataServiceId: DataServiceId.Vaccinations,
        })),
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the vaccinations service when there is a resource endpoint available', () => {
    const resourceEndpoints = {
        vaccinations: faker.internet.url(),
        commonClinicalDataset: faker.internet.url(),
        documents: faker.internet.url(),
        generalPractitioner: faker.internet.url(),
    };
    const organization = faker.custom.healthcareOrganization({
        resourceEndpoints,
    });
    const dataServiceId = faker.custom.dataServiceId();
    const dataService = getDataService(organization, dataServiceId);
    const createClientMock = dataServiceClientMocks[dataServiceId];

    const dataServiceEndpoint = {
        [DataServiceId.Vaccinations]: resourceEndpoints.vaccinations,
        [DataServiceId.CommonClinicalDataset]: resourceEndpoints.commonClinicalDataset,
        [DataServiceId.Documents]: resourceEndpoints.documents,
        [DataServiceId.GeneralPractitioner]: resourceEndpoints.generalPractitioner,
    };

    expect(dataService?.dataServiceId).toBe(dataServiceId);
    expect(createClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': dataServiceEndpoint[dataServiceId],
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const dataService = getDataService(undefined, faker.custom.dataServiceId());
    expect(dataService).toBeNull();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.resourceEndpoints = {
        vaccinations: undefined,
        commonClinicalDataset: undefined,
        documents: undefined,
        generalPractitioner: undefined,
    };

    const dataService = getDataService(organization, faker.custom.dataServiceId());
    expect(dataService).toBeNull();
});
