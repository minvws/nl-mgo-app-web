import { type StructureDefinition } from '@minvws/mgo-fhir-types';
import _ from 'lodash';
import { normalizeLabel } from './normalizeLabel';

export function processDefinition(definition: StructureDefinition) {
    const { id: definitionId, type, differential } = definition;
    const diffElements = differential?.element ?? [];

    if (!definitionId) {
        throw new Error('No id found for StructureDefinition');
    }

    const labels: Record<string, string> = {};

    diffElements.forEach(({ id, path, alias }) => {
        if (!path || !alias) return;
        if (alias.length > 1) {
            console.warn(`More than 1 aliases found for path: ${path}, alias: ${alias}`);
        }

        let key = id!.replace(type, definitionId);
        // Drop unneccesary details from the id path and transform to snake_case
        key = key.replace(/extension:/g, '');
        key = key.replace(/.[\w]+(\[x\])?:/g, '.');
        key = key.replace(/\[x\]$/, '');
        key = key.replace(/[^.]+/g, (match) => _.snakeCase(match));

        if (!labels[key]) {
            labels[key] = normalizeLabel(alias[0]);
        } else {
            console.warn(`"${key}" already exists, unused value: ${alias[0]}`);
        }
    });

    return labels;
}
