import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { map } from '../../../utils';
import { uiSchemaGroup as encounterParticipantUiSchema } from '../../elements/encounterParticipant/uiSchemaGroup';
import { uiSchemaGroup as diagnosisUiSchema } from './elements/diagnosis/uiSchemaGroup';
import { uiSchemaGroup as hospitalizationUiSchema } from './elements/hospitalization/uiSchemaGroup';
import { type ZibEncounter } from './zibEncounter';

export const i18n = 'r3.zib_encounter';
export const uiSchema: HealthUiSchemaFunction<ZibEncounter> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const diagnosis = map(resource.diagnosis, (x) => diagnosisUiSchema(x, context), true);
    const participants = map(
        resource.participant,
        (x) => encounterParticipantUiSchema(x, context),
        true
    );

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
                    ...ui.helpers.getChildren(diagnosis),
                    ui.codeableConcept(`${i18n}.reason`, resource.reason),
                    ...ui.helpers.getChildren(
                        hospitalizationUiSchema(resource.hospitalization, context)
                    ),
                ],
            },
        ],
    };
};
