import { type FhirVersion } from '@minvws/mgo-fhir-types/fhirVersion';
import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { snakeCase } from 'lodash';
import { isNullish } from '../../utils';
import { type HealthUiSchemaContext } from '../context';
import { type HealthUiGroup, type UiElement } from '../types';
import { processValue } from './processValue';
import { type UiElementGeneratorHelpers } from './uiHelpers';

export function processObject(
    context: HealthUiSchemaContext,
    helpers: UiElementGeneratorHelpers,
    fhirVersion: `${FhirVersion}`,
    path: string,
    value: object,
    group: HealthUiGroup | null = null
) {
    const elements: (UiElement | HealthUiGroup)[] = [];
    const entries = Object.entries(value);
    for (const [key, value] of entries) {
        const valuePath = `${path}.${snakeCase(key)}`;
        if (isNullish(value)) {
            elements.push({
                label: context.formatMessage(valuePath as FhirMessagesIds),
                type: 'SINGLE_VALUE',
                display: undefined,
            });
        } else {
            elements.push(...processValue(context, helpers, fhirVersion, valuePath, value, group));
        }
    }
    return elements;
}
