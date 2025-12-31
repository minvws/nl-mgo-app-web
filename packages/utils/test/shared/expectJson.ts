import { expect } from 'vitest';

export function expectJson(value: unknown) {
    // replace undefined with null so it shows up in the json snapshot
    const json = JSON.stringify(value, (_key, value) => (value === undefined ? null : value), 4);
    return expect(json);
}
