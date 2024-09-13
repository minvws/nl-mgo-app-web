import { useResourcesStore } from '$/store';
import { faker } from '$test/faker';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import {
    getBundleMgoResources,
    isFhirResource,
    type Lossless,
    type MgoResource,
} from '@minvws/mgo-fhir-data';
import { type QueryFunction } from '@tanstack/react-query';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { HealthCategory } from '../HealthCategory';
import { createResourceBundleQuery } from './createResourceBundleQuery';

vi.mock('$/services', () => ({
    getCommonClinicalDatasetService: vi.fn(() => ({
        dataServiceId: DataServiceId.CommonClinicalDataset,
    })),
}));

vi.mock('@minvws/mgo-fhir-data', async (importActual) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const actual = await importActual<typeof import('@minvws/mgo-fhir-data')>();

    return {
        ...actual,
        getBundleMgoResources: vi.fn(() => []),
        getUiSchema: vi.fn(() => {}),
        isFhirResource: vi.fn(() => true),
    };
});

const mockGetBundleMgoResources = getBundleMgoResources as MockedFunction<
    typeof getBundleMgoResources
>;
const mockIsFhirResource = isFhirResource as unknown as MockedFunction<typeof isFhirResource>;

function createMockService() {
    return {
        dataServiceId: DataServiceId.CommonClinicalDataset,
        foobar: () => ({
            json: () => Promise.resolve({}),
        }),
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

    const mgoResource = {
        profile: faker.lorem.word(),
        referenceId: faker.lorem.word(),
    } as Lossless<MgoResource>;

    mockGetBundleMgoResources.mockImplementationOnce(() => [mgoResource]);

    expect(queryKey).toEqual([
        organization.id,
        DataServiceId.CommonClinicalDataset,
        HealthCategory.Medication,
        'foobar',
    ]);

    let resources = useResourcesStore.getState().resources;

    expect(resources.length).toBe(0);

    await (queryFn as QueryFunction)(undefined as any); // eslint-disable-line @typescript-eslint/no-explicit-any

    resources = useResourcesStore.getState().resources;

    expect(resources.length).toBe(1);
    expect(resources[0].organizationId).toBe(organization.id);
    expect(resources[0].dataServiceId).toBe(service.dataServiceId);
    expect(resources[0].mgoResource).toBe(mgoResource);
});

test('returns undefined if there is no service', async () => {
    mockIsFhirResource.mockImplementationOnce(() => false);

    const organization = faker.custom.healthcareOrganization();

    const result = createResourceBundleQuery({
        organization,
        service: null as ReturnType<typeof createMockService> | null,
        method: 'foobar',
    });

    expect(result).toBeUndefined();
});

test('throws if the service method does not return a Fhir Bundle', async () => {
    mockIsFhirResource.mockImplementationOnce(() => false);

    const organization = faker.custom.healthcareOrganization();
    const service = createMockService();

    const { queryFn } = createResourceBundleQuery({
        organization,
        service,
        method: 'foobar',
    })!;

    expect(async () => {
        await (queryFn as QueryFunction)(undefined as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    }).rejects.toThrowError(
        'Response for service: 48: foobar - does not seem to contain a Fhir Bundle. Received resourceType: "undefined"'
    );
});
