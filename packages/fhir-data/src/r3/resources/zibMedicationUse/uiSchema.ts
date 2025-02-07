import { capitalize } from 'lodash';
import { type HealthUiSchemaFunction } from '../../../ui';
import { type UiHelperContext } from '../../../ui/context/ui';
import { map } from '../../../utils';
import { uiSchemaGroup as zibInstructionsForUseUiSchema } from '../../elements/zibInstructionsForUse/uiSchemaGroup';
import { type ZibMedicationUse } from './zibMedicationUse';

export const i18n = 'r3.zib_medication_use';

export function getLabel(resource: ZibMedicationUse, { formatMessage }: UiHelperContext) {
    return capitalize(resource.medicationReference?.display) || formatMessage(i18n);
}

export const uiSchema: HealthUiSchemaFunction<ZibMedicationUse> = (resource, context) => {
    const { ui, formatMessage } = context;

    /**
     * https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279/~mappings
     */
    const hcimMedicationUse2 = {
        AsAgreedIndicator: ui.boolean(`${i18n}.as_agreed_indicator`, resource.asAgreedIndicator),
        Prescriber: ui.reference(`${i18n}.prescriber`, resource.prescriber),
        ReasonForChangeOrDiscontinuationOfUse: ui.codeableConcept(
            `${i18n}.reason_for_change_or_discontinuation_of_use`,
            resource.reasonForChangeOrDiscontinuationOfUse
        ),
        MedicationUseStopType: ui.code(`${i18n}.status`, resource.status),
        ProductUsed: ui.reference(`${i18n}.medication_reference`, resource.medicationReference),
        PeriodOfUsePeriod: ui.period(`${i18n}.effective_period`, resource.effectivePeriod),
        PeriodOfUseDuration: ui.duration(
            `${i18n}.effective_period.duration`,
            resource.effectiveDuration
        ),
        MedicationUseDateTime: ui.dateTime(`${i18n}.date_asserted`, resource.dateAsserted),
        UseIndicator: ui.code(`${i18n}.taken`, resource.taken),
        ReasonForUse: ui.codeableConcept(`${i18n}.reason_code.text`, resource.reasonCode),
        Comment: ui.annotation(`${i18n}.note`, resource.note),
    };

    const hcimInstructionsForUse = {
        InstructionsForUse: map(
            resource.dosage,
            (x) => zibInstructionsForUseUiSchema(x, context),
            true
        ).flat(),
        RepeatPeriodCyclicalSchedule: ui.duration(
            `${i18n}.repeat_period_cyclical_schedule`,
            resource.repeatPeriodCyclicalSchedule
        ),
    };

    return {
        label: getLabel(resource, context),
        children: [
            {
                label: formatMessage(`fhir.group_general_info`),
                children: [
                    hcimMedicationUse2.ProductUsed,
                    hcimMedicationUse2.MedicationUseDateTime,
                    ...hcimMedicationUse2.PeriodOfUsePeriod,
                    hcimMedicationUse2.PeriodOfUseDuration,
                    hcimMedicationUse2.Prescriber,
                    hcimMedicationUse2.ReasonForUse,
                    hcimMedicationUse2.AsAgreedIndicator,
                    hcimMedicationUse2.UseIndicator,
                    hcimMedicationUse2.MedicationUseStopType,
                    hcimMedicationUse2.ReasonForChangeOrDiscontinuationOfUse,
                    hcimInstructionsForUse.RepeatPeriodCyclicalSchedule,
                    ui.identifier(`${i18n}.medication_treatment`, resource.medicationTreatment),
                    hcimMedicationUse2.Comment,
                ],
            },
            ...hcimInstructionsForUse.InstructionsForUse.flat(),
        ],
    };
};
