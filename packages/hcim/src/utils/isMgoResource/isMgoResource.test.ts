import { faker } from '$test';
import { type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import { expect, test } from 'vitest';
import { isMgoResource } from './isMgoResource.js';

test('returns true for MgoResourceMeta', () => {
    const data: MgoResourceMeta = {
        id: faker.lorem.word(),
        referenceId: `${faker.lorem.word()}/${faker.lorem.word()}`,
        resourceType: faker.lorem.word(),
        profile: faker.fhir.nictizNlProfile(),
        fhirVersion: faker.fhir.fhirVersion(),
    };

    expect(isMgoResource(data)).toBe(true);
});

test('returns false for anything that is not MgoResourceMeta ', () => {
    const data = {
        id: faker.lorem.word(),
        resourceType: faker.lorem.word(),
    };

    expect(isMgoResource(data)).toBe(false);
});
