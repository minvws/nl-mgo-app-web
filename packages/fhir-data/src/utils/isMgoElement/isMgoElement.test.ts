import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoElementMeta } from '../../resourceTypes';
import { isMgoElement } from './isMgoElement';

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
