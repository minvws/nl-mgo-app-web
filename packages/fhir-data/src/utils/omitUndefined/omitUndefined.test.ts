import { expect, test } from 'vitest';
import { omitUndefined } from './omitUndefined';

test('omitUndefined', () => {
    expect(omitUndefined({ a: 1, b: undefined })).toEqual({ a: 1 });
});
