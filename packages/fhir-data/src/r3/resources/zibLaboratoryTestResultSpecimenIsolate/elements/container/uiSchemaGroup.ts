import { type HealthUiGroupFunction, type NonStrictUi } from '../../../../../ui/types';
import { type Container } from './container';

export const uiSchemaGroup: HealthUiGroupFunction<Container> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'r3.zib_laboratory_test_result_specimen_isolate.container';

    return {
        label: `${i18n}`,
        children: [
            ui.identifier(`${i18n}.identifier`, resource.identifier),
            ui.codeableConcept(`${i18n}.type`, resource.type),
        ],
    };
};
