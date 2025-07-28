import { expect, test } from 'vitest';
import { passThrough } from './passThrough.js';

test.each([0, 1, '', '0', false, true, {}, []])('does not change value for %j', (value) => {
    expect(passThrough(value)).toBe(value);
});
