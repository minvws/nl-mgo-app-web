import { expect, test } from 'vitest';
import { flushCallStack } from './flushCallStack';

async function singleAsyncCall() {
    await new Promise((resolve) => setTimeout(resolve));
}

async function tripleAsyncCall() {
    await new Promise((resolve) => setTimeout(resolve));
    await new Promise((resolve) => setTimeout(resolve));
    await new Promise((resolve) => setTimeout(resolve));
}

test('flushes callstack', async () => {
    let resolved = false;
    singleAsyncCall().then(() => {
        resolved = true;
    });
    expect(resolved).toBe(false);
    await flushCallStack();
    expect(resolved).toBe(true);
});

test('can flush multiple callstacks', async () => {
    let resolved = false;
    tripleAsyncCall().then(() => {
        resolved = true;
    });
    expect(resolved).toBe(false);
    await flushCallStack();
    expect(resolved).toBe(false);
    await flushCallStack(2);
    expect(resolved).toBe(true);
});
