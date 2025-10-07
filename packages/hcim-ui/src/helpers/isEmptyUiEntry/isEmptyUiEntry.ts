import { isNullish } from '@minvws/mgo-utils';
import { type UiElement } from '../../types/index.js';

export function isEmptyUiEntry<T extends UiElement>(uiField: T) {
    switch (uiField.type) {
        case 'REFERENCE_VALUE':
            return isNullish(uiField.reference) && isNullish(uiField.display);
        case 'REFERENCE_LINK':
        case 'DOWNLOAD_BINARY':
            return isNullish(uiField.reference);
        case 'SINGLE_VALUE':
            return isNullish(uiField.value?.display);
        case 'MULTIPLE_VALUES':
        case 'MULTIPLE_GROUPED_VALUES':
            return isNullish(uiField.value) || !uiField.value.flat().length;
        case 'DOWNLOAD_LINK':
            return isNullish(uiField.url);
        default:
            throw new Error(`Unknown UI entry type: ${JSON.stringify(uiField)}`);
    }
}
