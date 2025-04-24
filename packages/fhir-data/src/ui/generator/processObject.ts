import { type FhirVersion } from '@minvws/mgo-fhir-types/fhirVersion';
import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { isNullish } from '@minvws/mgo-mgo-utils';
import { snakeCase } from 'lodash';
import { type HealthUiSchemaContext } from '../context';
import { isUiSchemaGroup } from '../helpers/isUiSchemaGroup/isUiSchemaGroup';
import { type HealthUiGroup, type UiElement } from '../types';
import { processValue } from './processValue';
import { type UiElementGeneratorHelpers } from './uiHelpers';

export function processObject(
    context: HealthUiSchemaContext,
    helpers: UiElementGeneratorHelpers,
    fhirVersion: `${FhirVersion}`,
    path: string,
    value: object
) {
    const elements: (UiElement | HealthUiGroup)[] = [];
    const entries = Object.entries(value);
    for (const [key, value] of entries) {
        const valuePath = `${path}.${snakeCase(key)}`;
        if (isNullish(value)) {
            elements.push({
                label: context.formatLabel(valuePath as FhirMessagesIds, null),
                type: 'SINGLE_VALUE',
                display: undefined,
            });
        } else {
            elements.push(...processValue(context, helpers, fhirVersion, valuePath, value));
        }
    }

    let group: HealthUiGroup | null = null;
    // the match will always be successfull so the array fallback can't be tests
    /* c8 ignore next */
    if ((path.match(/\./g) || []).length >= 2 && elements.length > 1) {
        group = {
            label: path,
            children: [],
        };
    }

    if (group) {
        const uiElements = elements.map((x) => (isUiSchemaGroup(x) ? x.children : x)).flat();
        group.children.push(...uiElements);
        return [group];
    }

    return elements;
}
