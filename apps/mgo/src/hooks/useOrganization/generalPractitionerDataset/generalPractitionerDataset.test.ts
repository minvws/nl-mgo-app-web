import { faker } from '$test/faker';
import { type MockedFunction, expect, test, vi, afterEach } from 'vitest';
import { createGpClient } from '@minvws/mgo-fhir-client';
import { getGeneralPractitionerDataset } from './generalPractitionerDataset';

const createGpClientMock = createGpClient as MockedFunction<typeof createGpClient>;

vi.mock('@minvws/mgo-fhir-client', () => ({
    createGpClient: vi.fn(() => ({})),
}));

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the general practitioner client when there is a resource endpoint available', () => {
    const gpDatasetResource = faker.internet.url();
    const organization = faker.custom.healthcareOrganization({
        resourceEndpoints: { generalPractitioner: gpDatasetResource },
    });
    const gpDataset = getGeneralPractitionerDataset(organization);

    expect(gpDataset).not.toBeNull();
    expect(createGpClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': gpDatasetResource,
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const gpDataset = getGeneralPractitionerDataset(undefined);

    expect(gpDataset).toBeNull();
    expect(createGpClientMock).not.toHaveBeenCalled();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.resourceEndpoints.generalPractitioner = undefined;

    const gpDataset = getGeneralPractitionerDataset(organization);

    expect(gpDataset).toBeNull();
    expect(createGpClientMock).not.toHaveBeenCalled();
});
