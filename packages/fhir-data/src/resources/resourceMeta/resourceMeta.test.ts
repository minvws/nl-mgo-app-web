import expected01 from './fixtures/zib-Product-01-output.json';
import input01 from './fixtures/zib-Product-01.json';

import { faker } from '$test';
import { expect, test, vi } from 'vitest';
import { type Resource } from '../../fhir';
import { parseResourceMeta } from './resourceMeta';
import { deepReplaceUndefined } from '../../parse/helpers';

test('returns the expected output', () => {
    const resourceMeta = deepReplaceUndefined(parseResourceMeta(input01 as Resource));
    expect(resourceMeta).toEqual(expected01);
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

test('can handle when there are is no profile', () => {
    const data = parseResourceMeta({
        meta: {
            profile: undefined,
        },
    } as Resource);

    expect(data.profile).toBe(null);
});
