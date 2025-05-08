import { type StructureDefinition } from '@minvws/mgo-fhir-types';
import _ from 'lodash';
import { normalizeLabel } from './normalizeLabel';

/**
 * This object contains the mapping of definitions that should share the same defaultlabels.
 */
const mirrorLabels = {
    ['zib_laboratory_test_result_observation']: 'gp_laboratory_result',
};

/**
 * Converts a string to snake_case.
 * But it preserves dot (.) notation.
 *
 * @example
 * snakeCase('zibLaboratoryTest.resultObservation') -> 'zib_laboratory_test.result_observation'
 */
function snakeCase(value: string | undefined) {
    if (!value) return '';
    return value.replace(/[^.]+/g, (match) => _.snakeCase(match));
}

export function processDefinition(definition: StructureDefinition) {
    const { id: definitionId, type, differential } = definition;
    const diffElements = differential?.element ?? [];
    const definitionIdKey = snakeCase(definitionId);

    if (!definitionIdKey) {
        throw new Error('No id found for StructureDefinition');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mirrorDefinitionKey = (mirrorLabels as any)[definitionIdKey];

    const labels: Record<string, string> = {};

    diffElements.forEach(({ id, path, alias }) => {
        if (!path || !alias) return;
        if (alias.length > 1) {
            console.warn(
                `More than 1 aliases found  in ${definitionId} for path: ${path}, alias: ${alias}`
            );
        }

        let key = id!.replace(type, definitionIdKey);

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
        key = key.replace(/[^.]+/g, (match) => snakeCase(match));

        if (!labels[key]) {
            const label = normalizeLabel(alias[0]);
            labels[key] = label;

            if (mirrorDefinitionKey) {
                labels[key.replace(definitionIdKey, mirrorDefinitionKey)] = label;
            }
        } else {
            console.warn(`"${key}" already exists, unused value: ${alias[0]}`);
        }
    });

    return labels;
}
