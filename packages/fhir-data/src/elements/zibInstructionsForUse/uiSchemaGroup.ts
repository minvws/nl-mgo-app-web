import { ui } from '../../ui';
import { multipleValue } from '../../ui/helpers';
import { type UiSchemaGroup } from '../../ui/types';
import { uiSchemaGroup as scheduleUiSchemaGroup } from '../zibAdministrationSchedule/uiSchemaGroup';
import { type ZibInstructionsForUse } from './zibInstructionsForUse';

export function uiSchemaGroup(resource: ZibInstructionsForUse): UiSchemaGroup {
    const i18n = 'zib_instructions_for_use';

    const administrationSchedule = scheduleUiSchemaGroup(resource.timing).children;

    return {
        label: `${i18n}.group`,
        children: [
            multipleValue(
                `${i18n}.additional_instruction`,
                resource.additionalInstruction,
                ui.codeableConcept
            ),
            ui.codeableConcept(`${i18n}.as_needed`, resource.asNeeded),
            ...ui.quantity(`${i18n}.dose_quantity`, resource.doseQuantity),
            ...ui.range(`${i18n}.dose_range`, resource.doseRange),
            ...ui.ratio(`${i18n}.max_dose_per_period`, resource.maxDosePerPeriod),
            ...ui.ratio(`${i18n}.rate_ratio`, resource.rateRatio),
            ...ui.range(`${i18n}.rate_range`, resource.rateRange),
            ...ui.quantity(`${i18n}.rate_quantity`, resource.rateQuantity),

            ...administrationSchedule,
        ],
    };
}
