import { DisplayValue, type UiElement } from '@minvws/mgo-hcim-ui';
import { Nullable } from '@minvws/mgo-utils';

export interface TableValue {
    readonly label: string;
    readonly value?: string;
}

function getDisplay(value: Nullable<DisplayValue>): string | undefined {
    return value?.display;
}

export function getTableValue(value: UiElement): TableValue {
    switch (value.type) {
        case 'SINGLE_VALUE':
            return { label: value.label, value: getDisplay(value.value) };
        case 'MULTIPLE_VALUES':
            return { label: value.label, value: value.value?.map(getDisplay)?.join(', ') };
        case 'MULTIPLE_GROUPED_VALUES':
            return { label: value.label, value: value.value?.flat().map(getDisplay).join(', ') };
        case 'REFERENCE_VALUE':
            return { label: value.label, value: value.display };
        case 'DOWNLOAD_LINK':
            return { label: value.label, value: value.url };
        case 'DOWNLOAD_BINARY':
            return { label: value.label, value: '-' };
        case 'REFERENCE_LINK':
            return { label: value.label, value: value.reference };
        default:
            throw new Error('Unknown UiElement type');
    }
}
