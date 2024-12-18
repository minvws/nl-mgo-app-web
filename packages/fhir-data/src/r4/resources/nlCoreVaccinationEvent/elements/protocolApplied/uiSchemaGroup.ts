import { type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type ProtocolApplied } from './protocolApplied';

export const uiSchemaGroup: UiSchemaGroupFunction<ProtocolApplied> = (resource, context) => {
    const profile = 'r4.nl_core_vaccination_event.protocol_applied';
    const { ui, formatMessage } = context;

    return {
        label: formatMessage(profile),
        children: [
            ui.reference(`${profile}.authority`, resource.authority),
            ui.codeableConcept(`${profile}.target_disease`, resource.targetDisease),
            ...ui.oneOfValueX(`${profile}.dose_number`, resource, 'doseNumber'),
            ...ui.oneOfValueX(`${profile}.series_doses`, resource, 'seriesDoses'),
        ],
    };
};
