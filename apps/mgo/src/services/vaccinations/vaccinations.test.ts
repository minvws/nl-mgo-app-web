import { faker } from '$test/faker';
import { type MockedFunction, expect, test, vi, afterEach } from 'vitest';
import { createVaccinationsClient } from '@minvws/mgo-fhir-client';
import { getVaccinationsService } from './vaccinations';

const createVaccinationsClientMock = createVaccinationsClient as MockedFunction<
    typeof createVaccinationsClient
>;

vi.mock('@minvws/mgo-fhir-client', () => ({
    createVaccinationsClient: vi.fn(() => ({})),
}));

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the vaccinations service when there is a resource endpoint available', () => {
    const vaccinationsResource = faker.internet.url();
    const organization = faker.custom.healthcareOrganization({
        resourceEndpoints: { vaccinations: vaccinationsResource },
    });
    const vaccinations = getVaccinationsService(organization);

    expect(vaccinations).not.toBeNull();
    expect(createVaccinationsClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': vaccinationsResource,
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const vaccinations = getVaccinationsService(undefined);

    expect(vaccinations).toBeNull();
    expect(createVaccinationsClient).not.toHaveBeenCalled();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.resourceEndpoints.vaccinations = undefined;

    const vaccinations = getVaccinationsService(organization);

    expect(vaccinations).toBeNull();
    expect(createVaccinationsClient).not.toHaveBeenCalled();
});
