import { useResourcesStore } from '$/store';
import { faker } from '$test/faker';
import { flushCallStack } from '$test/helpers';
import { DataServiceId } from '@minvws/mgo-fhir-client';
import { getBundleMgoResources, type Lossless, type MgoResource } from '@minvws/mgo-fhir-data';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { type ReactNode } from 'react';
import { expect, test, vi, type MockedFunction } from 'vitest';
import { HealthCategory } from '../HealthCategory';
import { type ResourceQueryMeta } from '../useHealthCategoryQueries/resourceQueryMeta';
import { useHealthCategoryQueries } from '../useHealthCategoryQueries/useHealthCategoryQueries';
import { useHealthCategoryQuery } from './useHealthCategoryQuery';

vi.mock('@minvws/mgo-fhir-data', async (importActual) => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    const actual = await importActual<typeof import('@minvws/mgo-fhir-data')>();

    return {
        ...actual,
        getBundleMgoResources: vi.fn(() => []),
        getUiSchema: vi.fn(() => {}),
    };
});

vi.mock('../useHealthCategoryQueries/useHealthCategoryQueries', () => {
    return { useHealthCategoryQueries: vi.fn() };
});

const mockUseHealthCategoryQueries = useHealthCategoryQueries as MockedFunction<
    typeof useHealthCategoryQueries
>;
const mockGetBundleMgoResources = getBundleMgoResources as MockedFunction<
    typeof getBundleMgoResources
>;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});
const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('returns query state and related store data for medication ', async () => {
    const queryKey = faker.lorem.word();
    const queryMeta: ResourceQueryMeta = {
        organizationId: 'organization.id',
        dataServiceId: DataServiceId.CommonClinicalDataset,
        method: 'method',
    };
    const mgoResource = {
        profile: 'http://nictiz.nl/fhir/StructureDefinition/zib-MedicationUse',
        referenceId: faker.lorem.word(),
    } as Lossless<MgoResource>;

    mockUseHealthCategoryQueries.mockImplementation(() => [
        {
            meta: queryMeta,
            queryKey: [queryKey],
            queryFn: () =>
                Promise.resolve({
                    resourceType: 'Bundle',
                }),
        },
    ]);

    mockGetBundleMgoResources.mockImplementation(() => [mgoResource]);

    const store = useResourcesStore.getState();
    expect(store.resources.length).toBe(0);

    const { result: queryResult, rerender } = renderHook(
        () => useHealthCategoryQuery(HealthCategory.Medication),
        { wrapper }
    );
    const { id, ...rest } = queryResult.current;

    expect(id).toBeDefined();
    expect(rest).toEqual({
        category: HealthCategory.Medication,
        isLoading: true,
        isError: false,
        isEmpty: false,
        data: null,
    });

    await flushCallStack();
    rerender();

    const storeNew = useResourcesStore.getState();
    expect(storeNew.resources.length).toBe(1);

    const resource = storeNew.resources[0];
    expect(resource.organizationId).toBe(queryMeta.organizationId);
    expect(resource.dataServiceId).toBe(queryMeta.dataServiceId);

    const { id: idNew, ...restNew } = queryResult.current;
    expect(idNew).toBe(id);
    expect(restNew).toEqual({
        category: HealthCategory.Medication,
        isLoading: false,
        isError: false,
        isEmpty: false,
        data: {
            medicationUse: [resource],
        },
    });
});

test('can handle errors', async () => {
    const queryKey = faker.lorem.word();
    mockUseHealthCategoryQueries.mockImplementation(() => [
        {
            meta: {
                organizationId: 'organization.id',
                dataServiceId: DataServiceId.CommonClinicalDataset,
                method: 'method',
            },
            queryKey: [queryKey],
            queryFn: () => Promise.reject(),
        },
    ]);

    const { result: queryResult, rerender } = renderHook(
        () => useHealthCategoryQuery(HealthCategory.Medication),
        { wrapper }
    );

    await flushCallStack();
    rerender();

    const { id: _, ...rest } = queryResult.current;
    expect(rest).toEqual({
        category: HealthCategory.Medication,
        isLoading: false,
        isError: true,
        isEmpty: false,
        data: {
            medicationUse: [],
        },
    });
});
