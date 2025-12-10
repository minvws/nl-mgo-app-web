/* eslint-disable @typescript-eslint/no-explicit-any */

import { expect, test } from 'vitest';
import { faker } from '../../test/index.js';
import { createSearchIndex } from './search.js';

test('creates a search index', async () => {
    const organization = faker.custom.organization();
    const index = await createSearchIndex([organization]);
    const results = await index.search({ query: organization.displayName });
    expect(results.hits.length).toBe(1);
    expect(results.hits[0].id).toBe(organization.id);
});

test('can handle objects with undefined values', async () => {
    const organization = faker.custom.organization();
    (organization as any).displayName = undefined;
    (organization as any).aliases = undefined;
    (organization as any).careTypeDisplay = undefined;
    (organization as any).city = undefined;
    (organization as any).postalCode = undefined;
    (organization as any).addressLine = undefined;
    (organization as any).geoLat = undefined;
    (organization as any).geoLng = undefined;
    const index = await createSearchIndex([organization]);
    expect(index).toBeDefined();
});
