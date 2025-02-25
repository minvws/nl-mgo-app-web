import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as encounterParticipantUiSchema } from '../../elements/encounterParticipant/uiSchemaGroup';
import { type GpEncounter } from './gpEncounter';

export const i18n = 'r3.gp_encounter';

export const uiSchema: HealthUiSchemaFunction<GpEncounter> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    const participants = map(
        resource.participant,
        (x) => encounterParticipantUiSchema(x, context),
        true
    ).flat();

    return {
        label: resource.serviceProvider?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.coding(`${i18n}.class`, resource.class),
                    ...ui.helpers.getChildren(participants),
                    ui.reference(`${i18n}.serviceProvider`, resource.serviceProvider),
                    ...ui.period(`${i18n}.period`, resource.period),
                    ui.codeableConcept(`${i18n}.reason`, resource.reason),
                ],
            },
        ],
    };
};
