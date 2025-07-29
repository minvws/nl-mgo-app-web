import { FhirVersion } from '@minvws/mgo-fhir';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { dirname } from 'path';
import { URL, fileURLToPath } from 'url';
import { processDefinitions } from './processDefinitions';

/**
 * A small script to extract relevant labels from the published structure definitions.
 * NOTE: Ensure you download the structure definitions first using `pnpm run download:definitions`
 */

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const outputDir = resolvePath('../../intl/src/locales/static/raw/nl');

const dirR4NlCore = resolvePath('../fhir-definitions/nictiz.fhir.nl.r4.nl-core');
const dirR4Zib2020 = resolvePath('../fhir-definitions/nictiz.fhir.nl.r4.zib2020');
const dirR3Zib2017 = resolvePath('../fhir-definitions/nictiz.fhir.nl.stu3.zib2017');

const r4NlCore = globSync(`${dirR4NlCore}/nl-core-*.json`);
const r4Zibs = globSync(`${dirR4Zib2020}/zib-*.json`);
const r3Zibs = globSync(`${dirR3Zib2017}/{zib,gp,nl-core}-*.json`);

async function extractLabels(files: string[], fhirVersion: FhirVersion, fileName: string) {
    const outputFile = `${outputDir}/${fileName}.json`;
    const dir = dirname(outputFile);
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }

    const labels = await processDefinitions(files, fhirVersion);
    writeFileSync(outputFile, JSON.stringify(labels, null, 2));
}

await extractLabels([...r4Zibs, ...r4NlCore], FhirVersion.R4, 'r4-resource-labels');
await extractLabels(r3Zibs, FhirVersion.R3, 'r3-resource-labels');
