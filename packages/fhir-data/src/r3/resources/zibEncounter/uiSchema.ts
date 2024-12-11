import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { uiSchemaGroup as diagnosisUiSchema } from './elements/diagnosis/uiSchemaGroup';
import { uiSchemaGroup as hospitalizationUiSchema } from './elements/hospitalization/uiSchemaGroup';
import { uiSchemaGroup as encounterParticipantUiSchema } from '../../elements/encounterParticipant/uiSchemaGroup';
import { map } from '../../../utils';
import { type ZibEncounter } from './zibEncounter';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export const uiSchema: UiSchemaFunction<ZibEncounter> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'Encounter';
    const diagnosis = map(resource.diagnosis, (x) => diagnosisUiSchema(x, context), true);
    const participants = map(
        resource.participant,
        (x) => encounterParticipantUiSchema(x, context),
        true
    );

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
                    ...ui.helpers.getChildren(diagnosis),
                    ui.codeableConcept(`${profile}.reason`, resource.reason),
                    ...ui.helpers.getChildren(
                        hospitalizationUiSchema(resource.hospitalization, context)
                    ),
                ],
            },
        ],
    };
};
