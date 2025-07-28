import { isUiSchemaGroup } from '../../helpers/isUiSchemaGroup/isUiSchemaGroup.js';
import { type HealthUiGroup, type UiElement } from '../../types/index.js';

export function getUiElements(elements: (UiElement | HealthUiGroup)[]): UiElement[] {
    return elements.map((x) => (isUiSchemaGroup(x) ? x.children : x)).flat();
}
