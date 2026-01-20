import { UiElement } from '../../types/schema.js';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry.js';

/**
 * A helper function to filter out empty elements in a health ui schema.
 * It works for single elements and arrays of elements.
 *
 * @example
 * ```typescript
 * // example usage in a ui schema group
 * children: [
 *     ...optional(ui.codeableConcept('r3.foo.code', resource.code)),
 *     ...optional(ui.period('r3.foo.period', resource.period)),
 * ]
 * ```
 */
export function optional<T extends UiElement>(elements: T | T[]): T[] {
    if (Array.isArray(elements)) {
        return elements.filter((x) => !isEmptyUiEntry(x));
    }

    return isEmptyUiEntry(elements) ? [] : [elements];
}
