import { isUiSchemaGroup } from '../../helpers/isUiSchemaGroup/isUiSchemaGroup';
import { type HealthUiGroup, type UiElement } from '../../types';

export function getUiElements(elements: (UiElement | HealthUiGroup)[]): UiElement[] {
    return elements.map((x) => (isUiSchemaGroup(x) ? x.children : x)).flat();
}
