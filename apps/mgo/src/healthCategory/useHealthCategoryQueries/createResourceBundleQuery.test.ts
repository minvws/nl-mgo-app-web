import { faker } from '$test/faker';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { expect, test, vi } from 'vitest';
import { createResourceBundleQuery } from './createResourceBundleQuery';
import { type QueryFunction } from '@tanstack/react-query';
import { FhirVersion } from '@minvws/mgo-fhir-data';

function createMockService() {
    return {
        dataServiceId: DataServiceId.CommonClinicalDataset,
        fhirVersion: FhirVersion.R3,
        foobar: vi.fn(() => ({
            json: () => Promise.resolve({}),
        })),
    };
}

test('returns queries for medication', async () => {
    const organization = faker.custom.healthcareOrganization();
    const service = createMockService();

    const { queryKey, queryFn } = createResourceBundleQuery({
        organization,
        service,
        method: 'foobar',
    })!;

    expect(queryKey).toEqual([organization.id, DataServiceId.CommonClinicalDataset, 'foobar']);

    (queryFn as QueryFunction)(undefined as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    expect(service.foobar).toHaveBeenCalledTimes(1);
});

test('returns undefined if there is no service', async () => {
    const organization = faker.custom.healthcareOrganization();
    const result = createResourceBundleQuery({
        organization,
        service: null as ReturnType<typeof createMockService> | null,
        method: 'foobar',
    });
    expect(result).toBeUndefined();
});
