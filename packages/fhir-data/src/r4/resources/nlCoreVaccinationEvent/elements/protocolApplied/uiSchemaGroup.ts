import { type NonStrictUi, type UiSchemaGroupFunction } from '../../../../../ui/types';
import { type ProtocolApplied } from './protocolApplied';

export const uiSchemaGroup: UiSchemaGroupFunction<ProtocolApplied> = (resource, context) => {
    const profile = 'nl_core_vaccination_event.protocol_applied';
    const ui = context.ui as NonStrictUi;

    return {
        label: profile,
        children: [
            ui.reference(`${profile}.authority`, resource.authority),
            ui.codeableConcept(`${profile}.targetDisease`, resource.targetDisease),
            ...ui.oneOfValueX(`${profile}.doseNumber`, resource, 'doseNumber'),
            ...ui.oneOfValueX(`${profile}.seriesDoses`, resource, 'seriesDoses'),
        ],
    };
};
