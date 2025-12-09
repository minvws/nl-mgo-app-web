import { beforeEach, expect, it, vi } from 'vitest';
import { faker } from '../../test/index.js';

const hoisted = vi.hoisted(() => ({
    searchSpy: vi.fn(),
}));

const createMockSelf = () => ({
    postMessage: vi.fn(),
    onmessage: vi.fn(),
});

let mockSelf = createMockSelf();

vi.mock('../search/search.js', () => {
    return {
        createSearchIndex: vi.fn(async () => {
            return {
                db: {},
                search: hoisted.searchSpy,
            };
        }),
    };
});

beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockSelf = createMockSelf();
    (globalThis as unknown as Record<string, unknown>).self = mockSelf as unknown;
});

it('can build the index', async () => {
    await import('./workerFile.js');

    const message = {
        type: 'create-index',
        payload: [faker.custom.organization()],
        requestId: faker.number.int(),
    };
    await mockSelf.onmessage({ data: message });

    expect(mockSelf.postMessage).toHaveBeenCalledTimes(1);
    expect(mockSelf.postMessage).toHaveBeenCalledWith({
        type: 'create-index-response',
        payload: undefined,
        requestId: message.requestId,
    });
});

it('can search the index', async () => {
    const results = { hits: [{ id: '1' }], count: 1 };
    hoisted.searchSpy.mockResolvedValue(results);

    await import('./workerFile.js');

    const indexMessage = {
        type: 'create-index',
        payload: [faker.custom.organization()],
        requestId: faker.number.int(),
    };
    await mockSelf.onmessage({ data: indexMessage });

    const searchMessage = {
        type: 'search',
        payload: 'term',
        requestId: faker.number.int(),
    };
    await mockSelf.onmessage({ data: searchMessage });

    expect(mockSelf.postMessage).toHaveBeenCalledTimes(2);
    expect(mockSelf.postMessage).toHaveBeenNthCalledWith(2, {
        type: 'search-response',
        payload: results,
        requestId: searchMessage.requestId,
    });
});

it('throws when searching before index is created', async () => {
    await import('./workerFile.js');

    const searchMessage = {
        type: 'search',
        payload: 'term',
        requestId: faker.number.int(),
    };
    const promise = mockSelf.onmessage({ data: searchMessage });

    await expect(promise).rejects.toThrowError('Index not created');
});

it('throws when searching with an invalid payload', async () => {
    await import('./workerFile.js');

    const invalidMessage = {
        type: 'invalid-type',
        payload: null,
        requestId: faker.number.int(),
    };
    const promise = mockSelf.onmessage({ data: invalidMessage });
    await expect(promise).rejects.toThrowError('Unknown event type: invalid-type');
    expect(mockSelf.postMessage).not.toHaveBeenCalled();
});
