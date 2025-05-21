import { expect, test } from 'vitest';
import { flushCallStack } from '../flushCallStack/flushCallStack';
import { defer } from './defer';

test('creates a deferred instance that does not resolve', async () => {
    const deferred = defer();
    let resolved = false;
    let rejected = false;

    deferred.promise
        .then(() => {
            resolved = true;
        })
        .catch(() => {
            rejected = true;
        });

    await flushCallStack();

    expect(resolved).toBe(false);
    expect(rejected).toBe(false);
});

test('deferred instance resolves when called', async () => {
    const deferred = defer();
    let resolved = false;
    let rejected = false;

    deferred.promise
        .then(() => {
            resolved = true;
        })
        .catch(() => {
            rejected = true;
        });

    deferred.resolve(null);

    await flushCallStack();

    expect(resolved).toBe(true);
    expect(rejected).toBe(false);
});

test('deferred instance rejects when called', async () => {
    const deferred = defer();
    let resolved = false;
    let rejected = false;
    let caughtError: Error | undefined;

    deferred.promise
        .then(() => {
            resolved = true;
        })
        .catch((error) => {
            caughtError = error;
            rejected = true;
        });

    const error = new Error('test error');
    deferred.reject(error);

    await flushCallStack();

    expect(caughtError).toBe(error);
    expect(resolved).toBe(false);
    expect(rejected).toBe(true);
});
