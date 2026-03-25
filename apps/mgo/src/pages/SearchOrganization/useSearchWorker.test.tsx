import { appConfig } from '$/config';
import { faker } from '$test/faker';
import { TestAppProviders } from '$test/helpers';
import { SearchWorker } from '@minvws/mgo-org-search';
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { mockKyGetJson } from '../../../__mocks__/ky';
import { mockLogError } from '../../hooks/useLogger/__mocks__/useLogger';
import { useSearchWorker } from './useSearchWorker';

const hoisted = vi.hoisted(() => ({
    createIndex: vi.fn().mockResolvedValue(undefined),
    search: vi.fn(),
    terminate: vi.fn(),
    searchWorker: undefined as SearchWorker | undefined,
}));

vi.mock('ky');
vi.mock('$/hooks/useLogger/useLogger');
vi.mock('@minvws/mgo-org-search', () => ({
    createSearchWorker: vi.fn(() => hoisted.searchWorker),
}));

beforeEach(() => {
    vi.resetAllMocks();
    hoisted.searchWorker = {
        createIndex: hoisted.createIndex,
        search: hoisted.search,
        terminate: hoisted.terminate,
    };
});

afterEach(() => {
    vi.useRealTimers();
});

test('initializes worker and builds index from organizations', async () => {
    const mockOrganizations = [
        { id: faker.string.uuid(), name: faker.company.name(), search_blob: faker.lorem.words(3) },
        { id: faker.string.uuid(), name: faker.company.name(), search_blob: faker.lorem.words(3) },
    ];
    mockKyGetJson(appConfig.organizations_url, mockOrganizations);

    renderHook(() => useSearchWorker(), { wrapper: TestAppProviders });

    await waitFor(() => expect(hoisted.createIndex).toHaveBeenCalledOnce());
    expect(hoisted.createIndex).toHaveBeenCalledWith(mockOrganizations);
});

test('search is debounced and returns results', async () => {
    vi.useFakeTimers();
    const query = faker.lorem.word();
    const organizationId = faker.string.uuid();
    const searchResults = { count: 1, organizations: [{ id: organizationId }] };
    hoisted.search.mockResolvedValue(searchResults);
    mockKyGetJson(appConfig.organizations_url, []);

    const { result } = renderHook(() => useSearchWorker(), {
        wrapper: TestAppProviders,
    });

    act(() => {
        result.current.search(query);
    });
    expect(hoisted.search).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(120);
    expect(hoisted.search).toHaveBeenCalledWith(query);
    expect(result.current.searchResults).toEqual(searchResults);
});

test('cleans up worker on unmount', () => {
    mockKyGetJson(appConfig.organizations_url, []);

    const { unmount } = renderHook(() => useSearchWorker(), {
        wrapper: TestAppProviders,
    });
    unmount();
    expect(hoisted.terminate).toHaveBeenCalledOnce();
});

test('logs error when organizations load without a worker', async () => {
    hoisted.searchWorker = undefined;
    const mockOrganizations = [
        { id: faker.string.uuid(), name: faker.company.name(), search_blob: faker.lorem.words(2) },
    ];
    mockKyGetJson(appConfig.organizations_url, mockOrganizations);

    renderHook(() => useSearchWorker(), { wrapper: TestAppProviders });

    await waitFor(() => expect(mockLogError).toHaveBeenCalledWith('No search worker found'));
});

test('logs error when searching without a worker', async () => {
    vi.useFakeTimers();
    hoisted.searchWorker = undefined;
    mockKyGetJson(appConfig.organizations_url, []);
    const query = faker.lorem.word();
    const { result } = renderHook(() => useSearchWorker(), {
        wrapper: TestAppProviders,
    });

    act(() => {
        result.current.search(query);
    });
    await vi.advanceTimersByTimeAsync(120);
    expect(mockLogError).toHaveBeenCalledWith('No search worker found');
});
