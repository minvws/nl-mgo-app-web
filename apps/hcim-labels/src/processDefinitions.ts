import { type FhirVersion, isFhirResource } from '@minvws/mgo-fhir';
import { processDefinition } from './processDefinition';

export async function processDefinitions(definitionFiles: string[], fhirVersion: FhirVersion) {
    const labels: Record<string, string> = {};

    for (const definitionFile of definitionFiles) {
        const definition = await import(definitionFile);

        if (!isFhirResource(definition, 'StructureDefinition')) {
            console.warn(`Matched file is not a StructureDefinition: ${definitionFile}`);
            continue;
        }

        const newLabels = processDefinition(definition);

        Object.entries(newLabels).forEach(([key, value]) => {
            const id = `${fhirVersion.toString().toLowerCase()}.${key}`;
            if (labels[id] && labels[id] !== value) {
                console.warn(
                    `label with key: ${id} already exists with value ${labels[id]}, received different value: ${value}`
                );
            } else {
                labels[id] = value;
            }
        });
    }

    return labels;
}
