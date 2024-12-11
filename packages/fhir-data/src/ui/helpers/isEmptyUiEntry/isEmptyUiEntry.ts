import { isNullish } from '../../../utils';
import { type UiEntry } from '../../types';

export function isEmptyUiEntry<T extends UiEntry>(uiField: T) {
    switch (uiField.type) {
        case 'REFERENCE_VALUE':
            return isNullish(uiField.reference);
        case 'SINGLE_VALUE':
            return isNullish(uiField.display);
        case 'MULTIPLE_VALUES':
        case 'MULTIPLE_GROUPED_VALUES':
            return isNullish(uiField.display) || !uiField.display.flat().length;
        case 'DOWNLOAD_LINK':
            return isNullish(uiField.url);
        default:
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            throw new Error(`Unknown UI entry type: ${(uiField as any).type}`);
    }
}
