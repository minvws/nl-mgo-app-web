import { type HealthUiGroupFunction } from '../../../../../ui/types';
import { type ProtocolApplied } from './protocolApplied';

export const i18n = 'r4.nl_core_vaccination_event.protocol_applied';

export const uiSchemaGroup: HealthUiGroupFunction<ProtocolApplied> = (resource, context) => {
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(i18n),
        children: [
            ui.reference(`${i18n}.authority`, resource.authority),
            ui.codeableConcept(`${i18n}.target_disease`, resource.targetDisease),
            ...ui.oneOfValueX(`${i18n}.dose_number`, resource, 'doseNumber'),
            ...ui.oneOfValueX(`${i18n}.series_doses`, resource, 'seriesDoses'),
        ],
    };
};
