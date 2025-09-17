import { renderHook } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';

import { type DataService } from '$/services';
import { Resource, useStore } from '$/store';
import { faker } from '$test/faker';
import { flushCallStack } from '@minvws/mgo-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HealthUiSchemaContext } from '../HealthUiSchemaContext';
import { useBinaryReference } from './useBinaryReference';

const hoisted = vi.hoisted(() => {
    const mockDataServiceJson = vi.fn(async () => ({}));
    const mockDataServiceGet = vi.fn(() => ({ json: mockDataServiceJson }));
    const mockDataService = {
        meta: { dataServiceId: 'x', fhirVersionEnum: 'R3' },
        get: mockDataServiceGet,
    } as unknown as DataService;
    return { mockDataService, mockDataServiceJson };
});

vi.mock('$/services', async (importOriginal) => {
    const mod = await importOriginal<typeof import('$/services')>();
    return {
        ...mod,
        createDataService: vi.fn(() => hoisted.mockDataService),
    };
});

const createWrapper = ({
    resource,
    queryClient,
}: {
    queryClient?: QueryClient;
    resource: Resource;
}) => {
    const client =
        queryClient ??
        new QueryClient({
            defaultOptions: { queries: { retry: false } },
        });
    return ({ children }: { readonly children: React.ReactNode }) => (
        <QueryClientProvider client={client}>
            <HealthUiSchemaContext.Provider value={{ resource }}>
                {children}
            </HealthUiSchemaContext.Provider>
        </QueryClientProvider>
    );
};

beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal('URL', { createObjectURL: vi.fn(() => 'blob:http://localhost') });
});

test('returns a binary blob url for an R3 Binary', async () => {
    const state = useStore.getState();
    vi.spyOn(state, 'getOrganizationResourceEndpoint').mockReturnValue(faker.internet.url());
    hoisted.mockDataServiceJson.mockResolvedValue(faker.fhir.r3.binary());

    const wrapper = createWrapper({ resource: faker.custom.resource() });
    const reference = `Binary/${faker.string.uuid()}`;
    const { result } = renderHook(() => useBinaryReference(reference), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await flushCallStack(2);

    const { isLoading, binaryBlobUrl } = result.current;
    expect(isLoading).toBe(false);
    expect(binaryBlobUrl?.startsWith('blob:')).toBe(true);
});

test('returns a binary blob url for an R4 Binary', async () => {
    const state = useStore.getState();
    vi.spyOn(state, 'getOrganizationResourceEndpoint').mockReturnValue(faker.internet.url());
    hoisted.mockDataServiceJson.mockResolvedValue(faker.fhir.r4.binary());

    const wrapper = createWrapper({ resource: faker.custom.resource() });
    const reference = `Binary/${faker.string.uuid()}`;
    const { result } = renderHook(() => useBinaryReference(reference), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await flushCallStack(2);

    const { isLoading, binaryBlobUrl } = result.current;
    expect(isLoading).toBe(false);
    expect(binaryBlobUrl?.startsWith('blob:')).toBe(true);
});

test('retryQuery invalidates the binary query key', async () => {
    const state = useStore.getState();
    const resourceEndpoint = faker.internet.url();
    vi.spyOn(state, 'getOrganizationResourceEndpoint').mockReturnValue(resourceEndpoint);

    const resource = faker.custom.resource();
    const reference = `Binary/${faker.string.uuid()}`;

    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const invalidateSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const wrapper = createWrapper({ resource, queryClient });

    const { result } = renderHook(() => useBinaryReference(reference), { wrapper });

    result.current.retryQuery();

    expect(invalidateSpy).toHaveBeenCalledWith(
        expect.objectContaining({ queryKey: [resourceEndpoint, 'binary', reference] })
    );
});

test('does nothing when reference does not match Binary regex', async () => {
    const state = useStore.getState();
    vi.spyOn(state, 'getOrganizationResourceEndpoint').mockReturnValue(faker.internet.url());

    const wrapper = createWrapper({ resource: faker.custom.resource() });
    const nonBinaryReference = `Observation/${faker.string.uuid()}`;

    const { result } = renderHook(() => useBinaryReference(nonBinaryReference), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isEmpty).toBe(true);
    expect(result.current.binaryBlobUrl).toBeUndefined();
    expect(hoisted.mockDataServiceJson).not.toHaveBeenCalled();
});

test('does nothing when reference is undefined', async () => {
    const state = useStore.getState();
    vi.spyOn(state, 'getOrganizationResourceEndpoint').mockReturnValue(faker.internet.url());

    const wrapper = createWrapper({ resource: faker.custom.resource() });
    const reference = undefined;

    const { result } = renderHook(() => useBinaryReference(reference), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.isEmpty).toBe(true);
    expect(result.current.binaryBlobUrl).toBeUndefined();
    expect(hoisted.mockDataServiceJson).not.toHaveBeenCalled();
});
