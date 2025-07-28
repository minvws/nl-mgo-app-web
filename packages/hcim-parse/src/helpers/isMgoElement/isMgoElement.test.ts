import { faker } from '$test';
import { expect, test } from 'vitest';
import { MgoElementMeta } from '../../types.js';
import { isMgoElement } from './isMgoElement.js';

test('returns true for MgoElementMeta', () => {
    const data: MgoElementMeta = {
        _profile: faker.fhir.nictizNlProfile(),
    };

    expect(isMgoElement(data)).toBe(true);
});

test('returns false for anything that is not MgoElementMeta ', () => {
    const data = {};

    expect(isMgoElement(data)).toBe(false);
});
