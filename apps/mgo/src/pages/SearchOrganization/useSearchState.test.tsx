import { appConfig } from '$/config';
import { faker } from '$test/faker';
import { TestAppProviders } from '$test/helpers';
import { defer } from '@minvws/mgo-utils';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import { mockKyGetJson } from '../../../__mocks__/ky';
import { useSearchState } from './useSearchState';

const hoisted = vi.hoisted(() => ({
    useSearchWorker: vi.fn(),
    search: vi.fn(),
    workerState: {
        isInitialized: true,
        isSearching: false,
        searchResults: undefined,
    } as {
        isInitialized: boolean;
        isSearching: boolean;
        searchResults: { count?: number } | undefined;
    },
}));

vi.mock('ky');

vi.mock('./useSearchWorker', () => ({
    useSearchWorker: hoisted.useSearchWorker,
}));

beforeEach(() => {
    vi.resetAllMocks();
    mockKyGetJson(appConfig.data_service_endpoints_url, {});
    hoisted.search.mockReset();
    hoisted.workerState = {
        isInitialized: true,
        isSearching: false,
        searchResults: undefined,
    };
    hoisted.useSearchWorker.mockImplementation(() => ({
        search: hoisted.search,
        ...hoisted.workerState,
    }));
});

const hookOptions = {
    wrapper: TestAppProviders,
};

test('returns loading while endpoint config is loading', () => {
    const endpointsRequest = defer<Record<string, string>>();
    mockKyGetJson(appConfig.data_service_endpoints_url, endpointsRequest.promise);

    const { result } = renderHook(() => useSearchState(), hookOptions);

    expect(result.current.uiState).toBe('loading');
    expect(result.current.dataServiceEndpoints).toEqual({});
});

test('returns idle once ready and query is empty', async () => {
    const mockedDataServiceEndpoints = { '1': faker.internet.url() };
    mockKyGetJson(appConfig.data_service_endpoints_url, mockedDataServiceEndpoints);

    const { result } = renderHook(() => useSearchState(), hookOptions);

    await waitFor(() => expect(result.current.uiState).toBe('idle'));
    expect(result.current.dataServiceEndpoints).toEqual(mockedDataServiceEndpoints);
});

test('searches immediately when query changes and search is ready', async () => {
    const { result } = renderHook(() => useSearchState(), hookOptions);

    await waitFor(() => expect(result.current.uiState).toBe('idle'));

    const mockedSearchQuery = faker.lorem.word();
    act(() => {
        result.current.handleQueryChange(mockedSearchQuery);
    });

    expect(hoisted.search).toHaveBeenCalledWith(mockedSearchQuery);
});

test('replays typed query when worker becomes ready later', async () => {
    hoisted.workerState.isInitialized = false;

    const { result, rerender } = renderHook(() => useSearchState(), hookOptions);

    const mockedSearchQuery = faker.lorem.word();
    act(() => {
        result.current.handleQueryChange(mockedSearchQuery);
    });

    expect(hoisted.search).not.toHaveBeenCalled();

    hoisted.workerState.isInitialized = true;
    hoisted.useSearchWorker.mockImplementation(() => ({
        search: hoisted.search,
        ...hoisted.workerState,
    }));
    rerender();

    await waitFor(() => expect(hoisted.search).toHaveBeenCalledWith(mockedSearchQuery));
});

test('returns searching when query exists and worker is searching', async () => {
    hoisted.workerState.isSearching = true;

    const { result } = renderHook(() => useSearchState(), hookOptions);

    await waitFor(() => expect(result.current.uiState).toBe('idle'));
    act(() => {
        result.current.handleQueryChange(faker.lorem.word());
    });

    expect(result.current.uiState).toBe('searching');
});

test('returns results when query exists and matches are found', async () => {
    hoisted.workerState.searchResults = { count: 1 };

    const { result } = renderHook(() => useSearchState(), hookOptions);

    await waitFor(() => expect(result.current.uiState).toBe('idle'));
    act(() => {
        result.current.handleQueryChange(faker.lorem.word());
    });

    expect(result.current.uiState).toBe('results');
    expect(result.current.searchResults).toEqual({ count: 1 });
});

test('returns empty when query exists and no matches are found', async () => {
    hoisted.workerState.searchResults = { count: 0 };

    const { result } = renderHook(() => useSearchState(), hookOptions);

    await waitFor(() => expect(result.current.uiState).toBe('idle'));
    act(() => {
        result.current.handleQueryChange(faker.lorem.word());
    });

    expect(result.current.uiState).toBe('empty');
});
