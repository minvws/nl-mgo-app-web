import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { snakeCase } from 'lodash';
import {
    isPrimitiveValueType,
    isValueType,
    type PrimitiveValueType,
    type ValueType,
} from '../../parse/types';
import { type UiElement } from '../types';
import { type MgoValueType, type UiElementGeneratorHelpers } from './uiHelpers';

export function processValueType(
    { handleSingeUiType }: UiElementGeneratorHelpers,
    path: string,
    value: ValueType | PrimitiveValueType
) {
    const uiElements: UiElement[] = [];
    const uiElement = handleSingeUiType(path as FhirMessagesIds, value as MgoValueType);

    uiElements.push(...[uiElement].flat());

    /**
     * Sometimes there are extra values nested inside an existing valueType,
     * We include them in the UI schema as well.
     * See for an example: zibMedicationUse.effectivePeriod.duration
     */
    const entries = Object.entries(value);
    for (const [key, value] of entries) {
        if (!isValueType(value) && !isPrimitiveValueType(value)) {
            continue;
        }
        const extraUiElements = handleSingeUiType(
            `${path}.${snakeCase(key)}` as FhirMessagesIds,
            value as MgoValueType
        );
        uiElements.push(...[extraUiElements].flat());
    }
    return uiElements;
}
