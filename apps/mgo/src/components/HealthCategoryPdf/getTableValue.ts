import { type UiElement } from '@minvws/mgo-hcim-ui';

export interface TableValue {
    readonly label: string;
    readonly value?: string;
}

export function getTableValue(value: UiElement): TableValue {
    switch (value.type) {
        case 'SINGLE_VALUE':
            return { label: value.label, value: value.display };
        case 'MULTIPLE_VALUES':
            return { label: value.label, value: value.display?.join(', ') };
        case 'MULTIPLE_GROUPED_VALUES':
            return { label: value.label, value: value.display?.flat().join(', ') };
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
