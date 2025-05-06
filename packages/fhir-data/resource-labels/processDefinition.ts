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
            console.warn(
                `More than 1 aliases found  in ${definitionId} for path: ${path}, alias: ${alias}`
            );
        }

        let key = id!.replace(type, definitionId);

        // move extension: properties to its parent
        key = key.replace(/extension:/g, '');
        // move modifierExtension: properties to its parent
        key = key.replace(/modifierExtension:/g, '');
        // move coding: properties to its parent
        key = key.replace(/coding:/g, '');
        // move value[x]: properties to its parent
        key = key.replace(/\.\w+(\[x\]):/g, '.');
        // similar to value[x]: but where only a single type is used
        // e.g. valueCodeableConcept:valueCodeableConcept -> valueCodeableConcept
        key = key.replace(/(\w+):\1/g, '$1');
        // replace remaining : with .
        key = key.replace(/:/g, '.');
        // remove remaining [x] from the end of the key
        key = key.replace(/\[x\]$/, '');
        // convert to snake_case
        key = key.replace(/[^.]+/g, (match) => _.snakeCase(match));

        if (!labels[key]) {
            labels[key] = normalizeLabel(alias[0]);
        } else {
            console.warn(`"${key}" already exists, unused value: ${alias[0]}`);
        }
    });

    return labels;
}
