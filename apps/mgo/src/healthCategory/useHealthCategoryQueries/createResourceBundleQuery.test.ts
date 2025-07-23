import { faker } from '$test/faker';
import { DataServiceId, type DataService } from '@minvws/mgo-data-services';
import { FhirVersion } from '@minvws/mgo-fhir';
import { type QueryFunction } from '@tanstack/react-query';
import { expect, test, vi } from 'vitest';
import { HealthCategory } from '../HealthCategory';
import { createResourceBundleQuery } from './createResourceBundleQuery';

function createMockService() {
    return {
        dataServiceId: DataServiceId.CommonClinicalDataset,
        fhirVersion: FhirVersion.R3,
        getResource: vi.fn(() => ({
            json: () => Promise.resolve({}),
        })),
    } as unknown as DataService<FhirVersion.R3>;
}

test('returns queries for medication', async () => {
    const category = HealthCategory.PersonalInformation;
    const organization = faker.custom.healthcareOrganization();
    const service = createMockService();

    const { queryKey, queryFn } = createResourceBundleQuery({
        category,
        organization,
        service,
        method: 'getResource',
    })!;

    expect(queryKey).toEqual([
        category,
        organization.id,
        DataServiceId.CommonClinicalDataset,
        'getResource',
    ]);

    (queryFn as QueryFunction)(undefined as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(service.getResource).toHaveBeenCalledTimes(1);
});

test('returns undefined if there is no service', async () => {
    const category = HealthCategory.PersonalInformation;
    const organization = faker.custom.healthcareOrganization();
    const result = createResourceBundleQuery({
        category,
        organization,
        service: null as ReturnType<typeof createMockService> | null,
        method: 'getResource',
    });
    expect(result).toBeUndefined();
});
