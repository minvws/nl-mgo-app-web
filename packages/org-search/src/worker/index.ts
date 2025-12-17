import { setupAsyncWorkerFunction } from './utils.js';
import type { CreateIndexWorkerFunction, SearchWorkerFunction } from './workerFile.js';

export type SearchWorker = {
    search: SearchWorkerFunction;
    createIndex: CreateIndexWorkerFunction;
    terminate: Worker['terminate'];
};

export function createSearchWorker(): SearchWorker {
    const searchWorker = new Worker(new URL('./workerFile.js', import.meta.url), {
        type: 'module',
    });

    const createIndex = setupAsyncWorkerFunction<'create-index', CreateIndexWorkerFunction>(
        searchWorker,
        'create-index'
    );
    const search = setupAsyncWorkerFunction<'search', SearchWorkerFunction>(searchWorker, 'search');

    return { search, createIndex, terminate: () => searchWorker.terminate() };
}
