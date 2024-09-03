import { faker } from '$test/faker';
import { type MockedFunction, expect, test, vi, afterEach } from 'vitest';
import { createVaccinationsClient } from '@minvws/mgo-fhir-client';
import { getVaccinationDataset } from './vaccinationDataset';

const createVaccinationsClientMock = createVaccinationsClient as MockedFunction<
    typeof createVaccinationsClient
>;

vi.mock('@minvws/mgo-fhir-client', () => ({
    createVaccinationsClient: vi.fn(() => ({})),
}));

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the vaccination dataset client when there is a resource endpoint available', () => {
    const vaccinationDatasetResource = faker.internet.url();
    const organization = faker.custom.healthcareOrganization({
        resourceEndpoints: { vaccinations: vaccinationDatasetResource },
    });
    const vaccinationDataset = getVaccinationDataset(organization);

    expect(vaccinationDataset).not.toBeNull();
    expect(createVaccinationsClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': vaccinationDatasetResource,
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const vaccinationDataset = getVaccinationDataset(undefined);

    expect(vaccinationDataset).toBeNull();
    expect(createVaccinationsClient).not.toHaveBeenCalled();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.resourceEndpoints.vaccinations = undefined;

    const vaccinationDataset = getVaccinationDataset(organization);

    expect(vaccinationDataset).toBeNull();
    expect(createVaccinationsClient).not.toHaveBeenCalled();
});
