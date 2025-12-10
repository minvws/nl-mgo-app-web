/* c8 ignore start - this is only used for testing, not used in production */

import { readdir, unlink, writeFile } from 'node:fs/promises';
import {
    createSearchIndex,
    CreateSearchIndexOptions,
    OrganizationItemDto,
    SearchConfig,
    SearchIndex,
} from '../search/search.js';

interface QuerySet {
    query: string;
    targetId: string;
}

interface QueryBenchmarkResult extends QuerySet {
    meanReciprocalRank: number;
    rank: string;
}

export interface BenchmarkOptions extends CreateSearchIndexOptions {
    name: string;
    querySet: QuerySet[];
    organizations: OrganizationItemDto[];
}

export interface BenchmarkResult {
    name: BenchmarkOptions['name'];
    searchConfig: SearchConfig | null;
    searchAlgorithm: BenchmarkOptions['searchAlgorithm'];
    meanReciprocalRank: number;
    failedQueries: number;
    totalQueries: number;
    queries: QueryBenchmarkResult[];
}

const benchmarkResultsDir = './results/';

async function runQueryBenchmark(searchIndex: SearchIndex, querySet: QuerySet) {
    const { hits } = await searchIndex.search({ query: querySet.query });
    const targetIndex = hits.findIndex((hit) => hit.id === querySet.targetId);
    const result: QueryBenchmarkResult = {
        ...querySet,
        meanReciprocalRank: 0,
        rank: `-1/${hits.length}`,
    };
    if (targetIndex >= 0) {
        result.meanReciprocalRank = 1 / (targetIndex + 1);
        result.rank = `${targetIndex + 1}/${hits.length}`;
    }
    return result;
}

export async function createBenchmarkResults(options: BenchmarkOptions) {
    console.log(`Creating benchmark results for ${options.name}...`);

    const benchmarkResult: BenchmarkResult = {
        name: options.name,
        searchAlgorithm: options.searchAlgorithm,
        meanReciprocalRank: -1,
        failedQueries: -1,
        totalQueries: options.querySet.length,
        searchConfig: options.searchConfig ?? null,
        queries: [],
    };

    const searchIndex = await createSearchIndex(options.organizations, {
        searchConfig: options.searchConfig,
        searchAlgorithm: options.searchAlgorithm,
    });

    for (const querySet of options.querySet) {
        const result = await runQueryBenchmark(searchIndex, querySet);
        benchmarkResult.queries.push(result);
    }

    benchmarkResult.meanReciprocalRank =
        benchmarkResult.queries.reduce((acc, result) => acc + result.meanReciprocalRank, 0) /
        benchmarkResult.queries.length;

    benchmarkResult.failedQueries = benchmarkResult.queries.filter(
        (result) => result.meanReciprocalRank === 0
    ).length;

    return benchmarkResult;
}

export async function saveBenchmarkResults(result: BenchmarkResult, prefix = '') {
    await writeFile(
        new URL(`${benchmarkResultsDir}${prefix}${result.name}.json`, import.meta.url),
        JSON.stringify(result, null, 2),
        { encoding: 'utf-8' }
    );
}

export async function clearPreviousBenchmarkResults() {
    const resultsDir = new URL(benchmarkResultsDir, import.meta.url);
    try {
        const files = await readdir(resultsDir);
        const jsonFiles = files.filter((fileName) => fileName.endsWith('.json'));
        await Promise.all(jsonFiles.map((fileName) => unlink(new URL(fileName, resultsDir))));
    } catch (error: unknown) {
        if ((error as { code?: string }).code !== 'ENOENT') {
            throw error;
        }
    }
}
