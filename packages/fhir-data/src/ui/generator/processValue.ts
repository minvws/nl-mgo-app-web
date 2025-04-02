import { type FhirVersion } from '@minvws/mgo-fhir-types/fhirVersion';
import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { isPrimitiveValueType, isValueType } from '../../parse/types';
import { isMgoElement } from '../../types/Fhir';
import { type Nullable } from '../../types/Nullable';
import { isNullish } from '../../utils';
import { type HealthUiSchemaContext } from '../context';
import { isUiSchemaGroup } from '../helpers/isUiSchemaGroup/isUiSchemaGroup';
import { type HealthUiGroup, type UiElement } from '../types';
import { processArray } from './processArray';
import { processObject } from './processObject';
import { processValueType } from './processValueType';
import { getProfileKey } from './profileKey';
import { type UiElementGeneratorHelpers } from './uiHelpers';

export function processValue(
    context: HealthUiSchemaContext,
    helpers: UiElementGeneratorHelpers,
    fhirVersion: `${FhirVersion}`,
    path: string,
    value: Nullable<unknown[] | object>,
    group: HealthUiGroup | null = null
): (UiElement | HealthUiGroup)[] {
    if (isMgoElement(value)) {
        const { _profile, ...rest } = value;
        path = getProfileKey(fhirVersion, _profile);
        value = rest;

        if (!group) {
            group = {
                label: context.formatMessage(path as FhirMessagesIds),
                children: [],
            };
        }
    }

    let elements: (UiElement | HealthUiGroup)[] = [];

    if (isNullish(value)) {
        elements = [];
    } else if (isValueType(value) || isPrimitiveValueType(value)) {
        elements = processValueType(helpers, path, value);
    } else if (Array.isArray(value)) {
        elements = processArray(context, helpers, fhirVersion, path, value);
    } else if (typeof value === 'object') {
        elements = processObject(context, helpers, fhirVersion, path, value);
    } else {
        console.error(`Failed to process path: ${path} with value:`, value);
    }

    if (group) {
        const uiElements = elements.map((x) => (isUiSchemaGroup(x) ? x.children : x)).flat();
        group.children.push(...uiElements);
        return [group];
    }

    return elements;
}
