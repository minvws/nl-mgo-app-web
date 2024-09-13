import { faker } from '$test/faker';
import { type MockedFunction, expect, test, vi, afterEach } from 'vitest';
import { createGpClient } from '@minvws/mgo-fhir-client';
import { getGeneralPractitionerService } from './generalPractitioner';

const createGpClientMock = createGpClient as MockedFunction<typeof createGpClient>;

vi.mock('@minvws/mgo-fhir-client', () => ({
    createGpClient: vi.fn(() => ({})),
}));

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the general practitioner client when there is a resource endpoint available', () => {
    const resource = faker.internet.url();
    const organization = faker.custom.healthcareOrganization({
        resourceEndpoints: { generalPractitioner: resource },
    });
    const generalPracticionerService = getGeneralPractitionerService(organization);

    expect(generalPracticionerService).not.toBeNull();
    expect(createGpClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': resource,
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const generalPracticionerService = getGeneralPractitionerService(undefined);

    expect(generalPracticionerService).toBeNull();
    expect(createGpClientMock).not.toHaveBeenCalled();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.resourceEndpoints.generalPractitioner = undefined;

    const generalPracticionerService = getGeneralPractitionerService(organization);

    expect(generalPracticionerService).toBeNull();
    expect(createGpClientMock).not.toHaveBeenCalled();
});
