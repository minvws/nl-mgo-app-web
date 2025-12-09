import { mockArray } from '@minvws/mgo-utils/test/shared';
import { beforeEach, expect, it, vi } from 'vitest';
import { faker } from '../../test/index.js';
import { CreateIndexWorkerFunction, SearchWorkerFunction } from './workerFile.js';

class MockWorker {
    static readonly instances: MockWorker[] = [];
    constructor(_specifier: unknown, _options?: unknown) {
        MockWorker.instances.push(this);
    }
    terminate = vi.fn();
}

vi.stubGlobal('Worker', MockWorker);

const hoisted = vi.hoisted(() => ({
    createIndex: vi.fn<CreateIndexWorkerFunction>(),
    search: vi.fn<SearchWorkerFunction>(),
}));

vi.mock('./utils.js', () => {
    return {
        setupAsyncWorkerFunction: vi.fn((_worker: unknown, type: string) => {
            if (type === 'create-index') return hoisted.createIndex;
            if (type === 'search') return hoisted.search;
            throw new Error('Unexpected request type');
        }),
    };
});

beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    MockWorker.instances.length = 0;
});

it('creates the worker, builds the index, and returns a search function', async () => {
    hoisted.search.mockResolvedValue({ hits: [] } as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    const { createSearchWorker } = await import('./index.js');

    const organizations = mockArray({ max: 10, factory: faker.custom.organization });
    const { search } = await createSearchWorker(organizations);

    expect(hoisted.createIndex).toHaveBeenCalledTimes(1);
    expect(hoisted.createIndex).toHaveBeenCalledWith(organizations);

    const result = await search('term');
    expect(hoisted.search).toHaveBeenCalledWith('term');
    expect(result).toEqual({ hits: [] });
});

it('terminates the worker when terminate is called', async () => {
    const { createSearchWorker } = await import('./index.js');
    const { terminate } = await createSearchWorker([]);

    expect(MockWorker.instances.length).toBe(1);
    const instance = MockWorker.instances[0]!;

    expect(instance.terminate).not.toHaveBeenCalled();
    terminate();
    expect(instance.terminate).toHaveBeenCalledTimes(1);
});
