import { faker } from '$test';
import { expect, test } from 'vitest';
import { type MgoResourceMeta } from '../../resources/resourceMeta/resourceMeta';
import { isMgoResource } from './isMgoResource';

test('returns true for MgoResourceMeta', () => {
    const data: MgoResourceMeta = {
        id: faker.lorem.word(),
        resourceType: faker.lorem.word(),
        profile: faker.fhir.nictizNlProfile(),
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
