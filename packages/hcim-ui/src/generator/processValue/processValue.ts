import { isMgoElement, isValueType } from '@minvws/mgo-hcim-parse';
import { isNullish, type Nullable } from '@minvws/mgo-utils';
import { type HealthUiGroup, type UiElement } from '../../types/index.js';
import { type GeneratorContext } from '../createGeneratorContext/createGeneratorContext.js';
import { getProfileKey } from '../getProfileKey/getProfileKey.js';
import { getUiElements } from '../getUiElements/getUiElements.js';
import { processArray } from '../processArray/processArray.js';
import { processMgoType } from '../processMgoType/processMgoType.js';
import { processObject } from '../processObject/processObject.js';

export function processValue(
    context: GeneratorContext,
    path: string,
    value: Nullable<unknown[] | object>
): (UiElement | HealthUiGroup)[] {
    let elements: (UiElement | HealthUiGroup)[] = [];
    let group: HealthUiGroup | undefined;

    if (isMgoElement(value)) {
        path = getProfileKey(context.fhirVersion, value._profile);
        group = {
            label: getProfileKey(context.fhirVersion, value._profile),
            children: [],
        };
    }

    if (isNullish(value)) {
        elements = [];
    } else if (isValueType(value)) {
        elements = processMgoType(context, path, value);
    } else if (Array.isArray(value)) {
        elements = processArray(context, path, value);
    } else if (typeof value === 'object') {
        elements = processObject(context, path, value);
    } else {
        console.error(`Failed to process path: ${path} with value:`, value);
    }

    if (group) {
        group.children = getUiElements(elements);
        return [group];
    }

    return elements;
}
