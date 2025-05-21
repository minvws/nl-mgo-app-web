import { isNullish, type Nullable } from '@minvws/mgo-mgo-utils';
import { isValueType } from '../../../parse/types';
import { isMgoElement } from '../../../utils';
import { type HealthUiGroup, type UiElement } from '../../types';
import { type GeneratorContext } from '../createGeneratorContext/createGeneratorContext';
import { getProfileKey } from '../getProfileKey/getProfileKey';
import { getUiElements } from '../getUiElements/getUiElements';
import { processArray } from '../processArray/processArray';
import { processMgoType } from '../processMgoType/processMgoType';
import { processObject } from '../processObject/processObject';

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
