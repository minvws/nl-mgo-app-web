import { ui } from '../../../../../ui';
import { oneOfValueX } from '../../../../../ui/special';
import { type UiSchemaGroup } from '../../../../../ui/types';
import { type ProtocolApplied } from './protocolApplied';

export function uiSchemaGroup(resource: ProtocolApplied): UiSchemaGroup {
    const profile = 'nl_core_vaccination_event.protocol_applied';

    return {
        label: profile,
        children: [
            ui.reference(`${profile}.authority`, resource.authority),
            ui.multipleValues(
                `${profile}.targetDisease`,
                resource.targetDisease,
                ui.codeableConcept
            ),
            ...oneOfValueX(`${profile}.doseNumber`, resource, 'doseNumber'),
            ...oneOfValueX(`${profile}.seriesDoses`, resource, 'seriesDoses'),
        ],
    };
}
