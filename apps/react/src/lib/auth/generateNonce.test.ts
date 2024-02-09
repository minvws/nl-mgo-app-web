import { expect, test, vi, afterEach } from 'vitest';

import { generateNonce } from './generateNonce.ts';

afterEach(() => {
    vi.unstubAllGlobals();
});

test('generateNonce generates random string /^[0-9A-Za-z-._]{length}$/', () => {
    for (let i = 0; i < 100; i++) {
        const length = Math.ceil(Math.random() * 100);
        const nonce = generateNonce(length);
        expect(nonce).toMatch(/^[0-9A-Za-z-._]+$/);
        expect(nonce).toHaveLength(length);
    }
});

test('generateNonce throws when window.crypto unavailable', () => {
    vi.stubGlobal('crypto', undefined);
    expect(() => generateNonce(42)).toThrow();
});

test('generateNonce throws when length not >=1', () => {
    expect(() => generateNonce(0)).toThrow();
    expect(() => generateNonce(-1)).toThrow();
    expect(() => generateNonce(1 / 0)).toThrow();
    expect(() => generateNonce(Number('-'))).toThrow();
    // @ts-expect-error: intentionally incorrect call
    expect(() => generateNonce()).toThrow();
});
