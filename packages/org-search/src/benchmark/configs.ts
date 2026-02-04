/* v8 ignore start - this is only used for testing, not used in production */

import querySet from './data/queries.json' with { type: 'json' };
import { BenchmarkOptions } from './utils.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - this dataset is too large to include in the tsconfig
import { SearchConfig } from '../search/config.js';
import organizations from './data/organizations.json' with { type: 'json' };

interface FieldSet {
    name: string;
    properties: SearchConfig['properties'];
    boost: SearchConfig['boost'];
}

const fieldSetA: FieldSet = {
    name: 'A',
    properties: ['normalizedDisplayName', 'searchBlob'],
    boost: {
        normalizedDisplayName: 2,
        searchBlob: 1,
    },
};

function buildConfigs(algorithm: 'qps') {
    const tolerances = [0, 1];
    const thresholds = [0.2];
    const fieldSets = [fieldSetA];

    const configs: BenchmarkOptions[] = [];
    for (const fieldSet of fieldSets) {
        for (const tolerance of tolerances) {
            for (const threshold of thresholds) {
                configs.push({
                    name: `${algorithm}-${fieldSet.name}-T${tolerance}-H${threshold}`,
                    querySet,
                    organizations,
                    searchConfig: {
                        threshold,
                        tolerance,
                        ...fieldSet,
                    },
                });
            }
        }
    }
    return configs;
}

export const benchmarkConfigsQps = buildConfigs('qps');
