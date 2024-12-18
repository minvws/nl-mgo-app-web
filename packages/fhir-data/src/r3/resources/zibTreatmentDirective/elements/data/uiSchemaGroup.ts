import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Data } from './data';

export const uiSchemaGroup: UiSchemaGroupFunction<Data> = (resource, context) => {
    const i18n = 'r3.zib_treatment_directive.data';
    const ui = context.ui as NonStrictUi;

    return {
        label: i18n,
        children: [
            ui.code(`${i18n}.meaning`, resource.meaning),
            ui.reference(`${i18n}.reference`, resource.reference),
        ],
    };
};
