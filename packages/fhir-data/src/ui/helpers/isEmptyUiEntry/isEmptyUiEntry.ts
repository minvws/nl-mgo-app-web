import { isNullish } from '@minvws/mgo-mgo-utils';
import { type UiElement } from '../../types';

export function isEmptyUiEntry<T extends UiElement>(uiField: T) {
    switch (uiField.type) {
        case 'REFERENCE_VALUE':
        case 'REFERENCE_LINK':
        case 'DOWNLOAD_BINARY':
            return isNullish(uiField.reference);
        case 'SINGLE_VALUE':
            return isNullish(uiField.display);
        case 'MULTIPLE_VALUES':
        case 'MULTIPLE_GROUPED_VALUES':
            return isNullish(uiField.display) || !uiField.display.flat().length;
        case 'DOWNLOAD_LINK':
            return isNullish(uiField.url);
        default:
            throw new Error(`Unknown UI entry type: ${JSON.stringify(uiField)}`);
    }
}
