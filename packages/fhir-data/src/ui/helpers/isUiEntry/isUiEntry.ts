import { type UiEntry } from '../../types';

export function isUiEntry<T extends UiEntry['type']>(
    entry: UiEntry,
    type: T
): entry is Extract<UiEntry, { type: T }> {
    return entry.type === type;
}
