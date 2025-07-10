import { type StructureDefinition } from '@minvws/mgo-fhir-types';
import _ from 'lodash';
import { normalizeLabel } from './normalizeLabel';

/**
 * This object contains the mapping of definitions that should share the same defaultlabels.
 */
const mirrorLabels = {
    ['zib_laboratory_test_result_observation']: 'gp_laboratory_result',
    ['zib_encounter']: 'gp_encounter',
    ['zib_address_information']: 'nl_core_address_information',
    ['zib_contact_person']: 'nl_core_contact_person',
    ['zib_healthcare_provider']: 'nl_core_healthcare_provider',
    ['zib_healthcare_provider_organization']: 'nl_core_healthcare_provider_organization',
    ['zib_health_professional_practitioner']: 'nl_core_health_professional_practitioner',
    ['zib_health_professional_practitioner_role']: 'nl_core_health_professional_practitioner_role',
    ['zib_patient']: 'nl_core_patient',
    ['zib_pharmaceutical_product']: 'nl_core_pharmaceutical_product',
    ['zib_vaccination_event']: 'nl_core_vaccination_event',
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

        if (definitionIdKey === 'zib_address_information') {
            console.log('key: ', key);
        }

        // when dealing with value[x] paths inside extensions, we move the extension: property to its parent
        // e.g. zib_address_information.line.extension:houseNumberIndication.value[x] -> zib_address_information.line.houseNumberIndication
        key = key.replace(/extension:(\w+)\.\w+(\[x\])$/g, '$1');
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
        key = key.replace(/(value[A-Z]\w+):\1($|\.)/g, '$1$2');
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
