import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type Container } from './container';

export const uiSchemaGroup: UiSchemaGroupFunction<Container> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'r3.zib_laboratory_test_result_specimen.container';

    return {
        label: `${i18n}`,
        children: [
            ui.identifier(`${i18n}.identifier`, resource.identifier),
            ui.codeableConcept(`${i18n}.type`, resource.type),
        ],
    };
};
