import { ui, type UiSchema } from '../../ui';
import { uiSchemaGroup as diagnosisUiSchema } from './elements/diagnosis/uiSchemaGroup';
import { uiSchemaGroup as hospitalizationUiSchema } from './elements/hospitalization/uiSchemaGroup';
import { uiSchemaGroup as participantUiSchema } from './elements/participant/uiSchemaGroup';
import { map } from '../../utils';
import { type ZibEncounter } from './zibEncounter';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317388
 */
export function uiSchema(resource: ZibEncounter): UiSchema {
    const profile = 'Encounter';
    const diagnosis = map(resource.diagnosis, diagnosisUiSchema, true);
    const participants = map(resource.participant, participantUiSchema, true);

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
                    ui.multipleValues(`${profile}.reason`, resource.reason, ui.codeableConcept),
                    ...ui.helpers.getChildren(hospitalizationUiSchema(resource.hospitalization)),
                ],
            },
        ],
    };
}
