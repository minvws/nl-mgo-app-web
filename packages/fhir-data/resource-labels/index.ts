import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import { dirname } from 'path';
import { URL, fileURLToPath } from 'url';
import { isFhirResource } from '../src/utils/isResource/isResource';
import { processDefinition } from './processDefinition';
import { type StructureDefinition } from 'fhir/r3';

/**
 * A small script to extract relevant labels from the published structure definitions.
 * NOTE: Ensure you download the structure definitions first using `pnpm run download:definitions`
 */

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const nictizDefinitionsDir = resolvePath('../fhir-definitions/nictiz.fhir.nl.stu3.zib2017');
const nictizFiles = globSync(`${nictizDefinitionsDir}/{zib,gp,nl-core}-*.json`);
const outputFile = resolvePath('../dist/i18n/resource-labels.json');

const labels: Record<string, string> = {};

for (const definitionFile of nictizFiles) {
    const definition = await import(definitionFile);
    if (!isFhirResource(definition, 'StructureDefinition')) {
        console.warn(`Matched file is not a StructureDefinition: ${definitionFile}`);
        continue;
    }

    const newLabels = processDefinition(definition as StructureDefinition);

    Object.entries(newLabels).forEach(([key, value]) => {
        if (labels[key] && labels[key] !== value) {
            console.warn(
                `label with key: ${key} already exists with value ${labels[key]}, received different value: ${value}`
            );
        } else {
            labels[key] = value;
        }
    });
}

const outputDir = dirname(outputFile);
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputFile, JSON.stringify(labels, null, 2));
