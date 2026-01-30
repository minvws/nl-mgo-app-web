/* v8 ignore start - this is only used for testing, not used in production */

import { SearchConfig } from '../search/search.js';
import querySet from './data/queries.json' with { type: 'json' };
import { BenchmarkOptions } from './utils.js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - this dataset is too large to include in the tsconfig
import organizations from './data/organizations.json' with { type: 'json' };

interface FieldSet {
    name: string;
    properties: SearchConfig['properties'];
    boost: SearchConfig['boost'];
}

const fieldSetA: FieldSet = {
    name: 'A',
    properties: ['normalizedName', 'normalizedTypes', 'city', 'qpsSearchBlob'],
    boost: {
        normalizedName: 3,
        normalizedTypes: 1.5,
        city: 1.2,
        qpsSearchBlob: 1,
    },
};

const fieldSetB: FieldSet = {
    name: 'B',
    properties: ['normalizedName', 'normalizedDisplayName', 'city', 'qpsSearchBlob'],
    boost: {
        normalizedName: 3,
        normalizedDisplayName: 2,
        city: 1.2,
        qpsSearchBlob: 1,
    },
};

const fieldSetC: FieldSet = {
    name: 'C',
    properties: ['normalizedName', 'qpsSearchBlob'],
    boost: {
        normalizedName: 2,
        qpsSearchBlob: 1,
    },
};

const fieldSetD: FieldSet = {
    name: 'D',
    properties: ['normalizedDisplayName', 'qpsSearchBlob'],
    boost: {
        normalizedDisplayName: 2,
        qpsSearchBlob: 1,
    },
};

function buildConfigs(algorithm: 'bm25' | 'qps' | 'pt15') {
    let tolerances = [0, 1];
    const thresholds = [0.2];
    const fieldSets = [fieldSetA, fieldSetB, fieldSetC, fieldSetD];

    if (algorithm === 'pt15') {
        tolerances = [0]; // pt15 only supports 0 tolerance
    }

    const configs: BenchmarkOptions[] = [];
    for (const fieldSet of fieldSets) {
        for (const tolerance of tolerances) {
            for (const threshold of thresholds) {
                configs.push({
                    name: `${algorithm}-${fieldSet.name}-T${tolerance}-H${threshold}`,
                    querySet,
                    organizations,
                    searchAlgorithm: algorithm,
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

export const benchmarkConfigsBm25 = buildConfigs('bm25');
export const benchmarkConfigsQps = buildConfigs('qps');
export const benchmarkConfigsPt15 = buildConfigs('pt15');
