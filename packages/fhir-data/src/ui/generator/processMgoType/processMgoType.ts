import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { isNullish } from '@minvws/mgo-utils';
import { snakeCase } from 'lodash';
import {
    isExtensionValue,
    isValueType,
    type MgoType,
    type PrimitiveValueType,
    type ValueType,
} from '../../../parse/types';
import { type HealthUiGroup, type UiElement } from '../../types';
import { type GeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { getUiElements } from '../getUiElements/getUiElements';

function processNestedArray(
    context: GeneratorContext,
    path: string,
    value: unknown[]
): (UiElement | HealthUiGroup)[] {
    return value.map((item) => processNestedValue(context, path, item).flat()).flat();
}

function processNestedValue(
    context: GeneratorContext,
    path: string,
    value: unknown
): (UiElement | HealthUiGroup)[] {
    if (isNullish(value)) {
        return [];
    } else if (isExtensionValue(value) && isValueType(value)) {
        return [context.createUiElement(path as FhirMessagesIds, value as MgoType)].flat();
    } else if (Array.isArray(value)) {
        return processNestedArray(context, path, value);
    } else if (typeof value === 'object') {
        return processNestedObject(context, path, value!);
    }
    return [];
}

function processNestedObject(
    context: GeneratorContext,
    path: string,
    value: object
): (UiElement | HealthUiGroup)[] {
    const uiElements: (UiElement | HealthUiGroup)[] = [];
    const entries = Object.entries(value);
    for (const [key, value] of entries) {
        uiElements.push(...processNestedValue(context, `${path}.${snakeCase(key)}`, value));
    }
    return uiElements;
}

export function processMgoType(
    context: GeneratorContext,
    path: string,
    value: ValueType | PrimitiveValueType
) {
    const { createUiElement } = context;
    const elements: (UiElement | HealthUiGroup)[] = [];
    const uiElement = createUiElement(path as FhirMessagesIds, value as MgoType);

    elements.push(...[uiElement].flat());

    /**
     * Sometimes there are extra values nested inside an existing valueType,
     * We include them in the UI schema as well.
     * See for an example: zibMedicationUse.effectivePeriod.duration
     */

    const extraUiElements = processNestedObject(context, path, value);
    elements.push(...[extraUiElements].flat());
    if (extraUiElements.length) {
        return [
            {
                label: path,
                children: getUiElements(elements),
            } satisfies HealthUiGroup,
        ];
    }

    return elements;
}
