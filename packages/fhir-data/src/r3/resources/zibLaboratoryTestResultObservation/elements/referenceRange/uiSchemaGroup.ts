import { type HealthUiGroupFunction } from '../../../../../ui/types';
import { type ReferenceRange } from './referenceRange';

export const i18n = 'r3.zib_laboratory_test_result_observation.reference_range';

export const uiSchemaGroup: HealthUiGroupFunction<ReferenceRange> = (resource, context) => {
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
