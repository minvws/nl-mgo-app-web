import { type HealthcareOrganization } from '$/store';
import { faker } from '$test/faker';
import {
    DataServiceId,
    createCommonClinicalDatasetService,
    createGeneralPractitionerService,
    createPdfAService,
    createVaccinationImmunizationService,
} from '@minvws/mgo-data-services';
import { afterEach, expect, test, vi, type MockedFunction } from 'vitest';
import { getDataService } from './dataService';

const dataServiceMocks = {
    [DataServiceId.VaccinationImmunization]: createVaccinationImmunizationService as MockedFunction<
        typeof createVaccinationImmunizationService
    >,
    [DataServiceId.CommonClinicalDataset]: createCommonClinicalDatasetService as MockedFunction<
        typeof createCommonClinicalDatasetService
    >,
    [DataServiceId.PdfA]: createPdfAService as MockedFunction<typeof createPdfAService>,
    [DataServiceId.GeneralPractitioner]: createGeneralPractitionerService as MockedFunction<
        typeof createGeneralPractitionerService
    >,
};

vi.mock('@minvws/mgo-data-services', async (importActual) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const mod = await importActual<typeof import('@minvws/mgo-data-services')>();
    return {
        ...mod,
        createCommonClinicalDatasetService: vi.fn(() => ({
            dataServiceId: DataServiceId.CommonClinicalDataset,
        })),
        createPdfAService: vi.fn(() => ({
            dataServiceId: DataServiceId.PdfA,
        })),
        createGeneralPractitionerService: vi.fn(() => ({
            dataServiceId: DataServiceId.GeneralPractitioner,
        })),
        createVaccinationImmunizationService: vi.fn(() => ({
            dataServiceId: DataServiceId.VaccinationImmunization,
        })),
    };
});

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the data service when there is a resource endpoint available', () => {
    const dataServices: HealthcareOrganization['dataServices'] = [
        { id: DataServiceId.VaccinationImmunization, resourceEndpoint: faker.internet.url() },
        { id: DataServiceId.CommonClinicalDataset, resourceEndpoint: faker.internet.url() },
        { id: DataServiceId.PdfA, resourceEndpoint: faker.internet.url() },
        { id: DataServiceId.GeneralPractitioner, resourceEndpoint: faker.internet.url() },
    ];

    const organization = faker.custom.healthcareOrganization({ dataServices });
    const dataServiceId = faker.custom.dataServiceId();
    const dataService = getDataService(organization, dataServiceId);
    const createServiceMock = dataServiceMocks[dataServiceId];

    expect(dataService?.dataServiceId).toBe(dataServiceId);
    expect(createServiceMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': dataServices.find((x) => x.id === dataServiceId)
                    ?.resourceEndpoint,
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const dataService = getDataService(undefined, faker.custom.dataServiceId());
    expect(dataService).toBeNull();
});

test('returns NULL when there is NO dataServiceId', () => {
    const dataService = getDataService(faker.custom.healthcareOrganization(), undefined);
    expect(dataService).toBeNull();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.dataServices = [];

    const dataService = getDataService(organization, faker.custom.dataServiceId());
    expect(dataService).toBeNull();
});
