import { expect, test } from 'vitest';
import { faker } from '../../test/index.js';
import { createBenchmarkResults } from '../benchmark/utils.js';
import { createSearchIndex } from './search.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - this dataset is too large to include in the tsconfig
import organizations from '../benchmark/data/organizations.json' with { type: 'json' };
import querySet from '../benchmark/data/queries.json' with { type: 'json' };

test('creates a search index', async () => {
    const organization = faker.custom.organizationDto();
    const index = await createSearchIndex([organization]);
    const results = await index.search({ query: organization.display_name! });
    expect(results.hits.length).toBe(1);
    expect(results.hits[0].id).toBe(organization.id);
});

const minimumMeanReciprocalRank = 0.8;
test(`default configuration scores a minimum of ${minimumMeanReciprocalRank} on the benchmark data set`, async () => {
    const benchmarkResult = await createBenchmarkResults({
        name: 'default',
        organizations,
        querySet,
    });
    expect(benchmarkResult.meanReciprocalRank).toBeGreaterThan(minimumMeanReciprocalRank);
});
