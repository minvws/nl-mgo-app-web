import type { OrganizationItem } from '../search/search.js';
import { setupAsyncWorkerFunction } from './utils.js';
import type { CreateIndexWorkerFunction, SearchWorkerFunction } from './workerFile.js';

export type SearchWorker = {
    search: SearchWorkerFunction;
    terminate: Worker['terminate'];
};

export async function createSearchWorker(items: OrganizationItem[]): Promise<SearchWorker> {
    const searchWorker = new Worker(new URL('./workerFile.js', import.meta.url), {
        type: 'module',
    });

    const createIndex = setupAsyncWorkerFunction<'create-index', CreateIndexWorkerFunction>(
        searchWorker,
        'create-index'
    );
    const search = setupAsyncWorkerFunction<'search', SearchWorkerFunction>(searchWorker, 'search');

    await createIndex(items);

    return { search, terminate: () => searchWorker.terminate() };
}
