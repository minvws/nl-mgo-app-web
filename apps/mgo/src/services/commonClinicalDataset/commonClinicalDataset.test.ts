import { faker } from '$test/faker';
import { type MockedFunction, expect, test, vi, afterEach } from 'vitest';
import { getCommonClinicalDatasetService } from './commonClinicalDataset';

import { createBgzClient } from '@minvws/mgo-fhir-client';

const createBgzClientMock = createBgzClient as MockedFunction<typeof createBgzClient>;

vi.mock('@minvws/mgo-fhir-client', () => ({
    createBgzClient: vi.fn(() => ({})),
}));

afterEach(() => {
    vi.clearAllMocks();
});

test('returns the common clinical dataset service when there is a resource endpoint available', () => {
    const commonClinicalDatasetResource = faker.internet.url();
    const organization = faker.custom.healthcareOrganization({
        resourceEndpoints: { commonClinicalDataset: commonClinicalDatasetResource },
    });
    const commonClinicalDataset = getCommonClinicalDatasetService(organization);

    expect(commonClinicalDataset).not.toBeNull();
    expect(createBgzClientMock).toHaveBeenCalledWith(
        expect.objectContaining({
            headers: {
                'x-mgo-dva-target': commonClinicalDatasetResource,
            },
        })
    );
});

test('returns NULL when there is NO organization', () => {
    const commonClinicalDataset = getCommonClinicalDatasetService(undefined);

    expect(commonClinicalDataset).toBeNull();
    expect(createBgzClientMock).not.toHaveBeenCalled();
});

test('returns NULL when there is NO resource endpoint available', () => {
    const organization = faker.custom.healthcareOrganization();
    organization.resourceEndpoints.commonClinicalDataset = undefined;

    const commonClinicalDataset = getCommonClinicalDatasetService(organization);

    expect(commonClinicalDataset).toBeNull();
    expect(createBgzClientMock).not.toHaveBeenCalled();
});
