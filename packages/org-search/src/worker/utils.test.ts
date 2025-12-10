/* eslint-disable @typescript-eslint/no-explicit-any */
import { faker } from '@faker-js/faker';
import { beforeEach, expect, it, vi } from 'vitest';

type Message = { requestId: number; type: string; payload: unknown };

type MessageHandler = (event: { data: Message }) => void;

type MockWorker = {
    addEventListener: (type: 'message', handler: MessageHandler) => void;
    removeEventListener: (type: 'message', handler: MessageHandler) => void;
    postMessage: (message: unknown) => void;
    emit: (message: Message) => void;
};

function createMockWorker(): MockWorker {
    const handlers = new Set<MessageHandler>();
    return {
        addEventListener: vi.fn((_, handler: MessageHandler) => {
            handlers.add(handler);
        }),
        removeEventListener: vi.fn((_, handler: MessageHandler) => {
            handlers.delete(handler);
        }),
        postMessage: vi.fn(),
        emit: (message: Message) => {
            for (const handler of Array.from(handlers)) {
                handler({ data: message });
            }
        },
    };
}

beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
});

it('rejects when worker is not available', async () => {
    const { setupAsyncWorkerFunction } = await import('./utils.js');
    const fn = setupAsyncWorkerFunction<'search', any>(undefined, 'search');
    await expect(fn('term')).rejects.toThrowError('Worker not available');
});

it('posts a request and resolves on matching response', async () => {
    const { setupAsyncWorkerFunction } = await import('./utils.js');
    const worker = createMockWorker();
    type Target = (query: string) => { hits: number };
    const workerFn = setupAsyncWorkerFunction<'search', Target>(worker, 'search');

    const arg = faker.lorem.word();
    const promise = workerFn(arg);

    expect(worker.postMessage).toHaveBeenCalledTimes(1);
    expect(worker.postMessage).toHaveBeenCalledWith({
        type: 'search',
        payload: arg,
        requestId: 0,
    });

    // emit unrelated events that should be ignored
    worker.emit({ type: 'other-response', requestId: 0, payload: { hits: 0 } });
    worker.emit({ type: 'search-response', requestId: 999, payload: { hits: 0 } });

    // emit correct response
    const result = { hits: 1 };
    worker.emit({ type: 'search-response', requestId: 0, payload: result });
    await expect(promise).resolves.toEqual(result);

    expect(worker.removeEventListener).toHaveBeenCalledTimes(1);
});

it('supports multiple concurrent requests and matches by requestId', async () => {
    const { setupAsyncWorkerFunction } = await import('./utils.js');
    const worker = createMockWorker();
    type Target = (query: string) => { hits: number };
    const workerFunc = setupAsyncWorkerFunction<'search', Target>(worker, 'search');

    const p1 = workerFunc('first');
    const p2 = workerFunc('second');

    expect(worker.postMessage).toHaveBeenNthCalledWith(1, {
        type: 'search',
        payload: 'first',
        requestId: 0,
    });
    expect(worker.postMessage).toHaveBeenNthCalledWith(2, {
        type: 'search',
        payload: 'second',
        requestId: 1,
    });

    // respond to second first
    worker.emit({ type: 'search-response', requestId: 1, payload: { hits: 2 } });
    // then respond to first
    worker.emit({ type: 'search-response', requestId: 0, payload: { hits: 1 } });

    await expect(p2).resolves.toEqual({ hits: 2 });
    await expect(p1).resolves.toEqual({ hits: 1 });

    expect(worker.removeEventListener).toHaveBeenCalledTimes(2);
});
