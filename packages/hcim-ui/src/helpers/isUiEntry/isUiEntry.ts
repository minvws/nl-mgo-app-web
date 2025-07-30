import { type UiElement } from '../../types/index.js';

export function isUiEntry<T extends UiElement['type']>(
    entry: UiElement,
    type: T
): entry is Extract<UiElement, { type: T }> {
    return entry.type === type;
}
