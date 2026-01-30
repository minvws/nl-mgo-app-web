/* v8 ignore start - this is only used for testing, not used in production */
import { benchmarkConfigsQps } from './configs.js';
import {
    BenchmarkResult,
    clearPreviousBenchmarkResults,
    createBenchmarkResults,
    saveBenchmarkResults,
} from './utils.js';

async function runBenchmarks() {
    await clearPreviousBenchmarkResults();
    const allBenchmarkResults: BenchmarkResult[] = [];
    const benchmarkConfigs = [
        // ...benchmarkConfigsBm25,
        // ...benchmarkConfigsPt15,
        ...benchmarkConfigsQps,
    ];

    for (const benchmark of benchmarkConfigs) {
        const result = await createBenchmarkResults(benchmark);
        allBenchmarkResults.push(result);
    }

    return allBenchmarkResults;
}

async function printTopBenchmarkResults(results: BenchmarkResult[], top: number) {
    const sortedResults = results.sort((a, b) => b.meanReciprocalRank - a.meanReciprocalRank);
    const topResults = sortedResults.slice(0, top);
    const logResults: string[] = [];

    for (let i = 0; i < topResults.length; i++) {
        const result = topResults[i];
        const prefix = `  ${i + 1}. ${result.name}`;
        const space = ' '.repeat(20 - prefix.length);
        logResults.push(
            `${prefix}${space}MRP: ${result.meanReciprocalRank.toFixed(4)}, FQ: ${result.failedQueries} / ${result.totalQueries}`
        );
        await saveBenchmarkResults(result, `${i + 1}.`);
    }

    console.log(`Top ${topResults.length} Results:`);
    console.log(logResults.join('\n'));
}

/**
 * Main function to run the benchmarks and print the top results.
 * Only used for testing different search configurations.
 * Not used in production.
 */
async function main() {
    const benchmarkResults = await runBenchmarks();
    await printTopBenchmarkResults(benchmarkResults, 10);
}

main();
