import { type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type ReferenceRange } from './referenceRange';

export const uiSchemaGroup: UiSchemaGroupFunction<ReferenceRange> = (resource, context) => {
    const i18n = 'zib_laboratory_test_result_observation.reference_range';
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(i18n),
        children: [
            ui.quantity(`${i18n}.low`, resource.low),
            ui.quantity(`${i18n}.high`, resource.high),
            ui.codeableConcept(`${i18n}.type`, resource.type),
        ],
    };
};
