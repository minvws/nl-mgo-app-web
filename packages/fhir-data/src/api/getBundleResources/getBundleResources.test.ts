import { faker } from '$test';
import { expect, test } from 'vitest';
import { getBundleResources } from './getBundleResources';

test('returns the expected output', () => {
    const resource1 = faker.fhir.medicationStatement();
    const resource2 = faker.fhir.medicationStatement();
    const bundle = faker.fhir.bundle({
        entry: [{ resource: resource1 }, { resource: resource2 }],
    });

    const results = getBundleResources(bundle);
    expect(results).toEqual([resource1, resource2]);
});

test('returns undefined if there are no resources', () => {
    const bundle = faker.fhir.bundle({
        entry: [],
    });

    const results = getBundleResources(bundle);
    expect(results).toBeUndefined();
});
