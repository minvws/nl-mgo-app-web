import expected01 from './fixtures/zib-Product-01-output.json';
import input01 from './fixtures/zib-Product-01.json';

import { expect, test, vi } from 'vitest';
import { type Resource } from '../../../fhir';
import { parseResourceMeta } from './resourceMeta';
import { EMPTY_VALUE } from '../../type';
import { faker } from '$test';

test('returns the expected output', () => {
    const resourceMeta = parseResourceMeta(input01 as Resource);
    expect(resourceMeta).toEqual(expected01);
});

test('returns EMPTY_VALUE if falsy', () => {
    const resourceMeta = parseResourceMeta(false as unknown as Resource);
    expect(resourceMeta).toEqual(EMPTY_VALUE);
});

test('uses EMPTY_VALUE for profile if not provided', () => {
    const resourceMeta = parseResourceMeta({} as unknown as Resource);
    expect(resourceMeta?.profile).toEqual(EMPTY_VALUE);
});

test('logs warning if Resource contains multiple profiles', () => {
    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {});

    parseResourceMeta({
        meta: {
            profile: [faker.lorem.word(), faker.lorem.word()],
        },
    } as Resource);

    expect(consoleWarnMock.mock.calls[0][0]).toBe('Multiple profiles found for resource');

    consoleWarnMock.mockRestore();
});
