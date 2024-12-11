import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { uiSchemaGroup as encounterParticipantUiSchema } from '../../elements/encounterParticipant/uiSchemaGroup';
import { map } from '../../../utils';
import { type GpEncounter } from './gpEncounter';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316991
 */
export const uiSchema: UiSchemaFunction<GpEncounter> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'Encounter';
    const participants = map(
        resource.participant,
        (x) => encounterParticipantUiSchema(x, context),
        true
    ).flat();

    return {
        label: resource.serviceProvider?.display,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.coding(`${profile}.class`, resource.class),
                    ...ui.helpers.getChildren(participants),
                    ui.reference(`${profile}.serviceProvider`, resource.serviceProvider),
                    ...ui.period(`${profile}.period`, resource.period),
                    ui.codeableConcept(`${profile}.reason`, resource.reason),
                ],
            },
        ],
    };
};
