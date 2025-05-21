import { capitalize } from 'lodash';
import { organization } from '../../../ui/common/organization/organization';
import { summaryOptions } from '../../../ui/common/summaryOptions/summaryOptions';
import { type HealthUiSchemaFunction } from '../../../ui/types';
import { map } from '../../../utils';
import { zibInstructionsForUse } from '../../elements';
import { type ZibMedicationUse } from './zibMedicationUse';
/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export const summary: HealthUiSchemaFunction<ZibMedicationUse> = (resource, context) => {
    const { ui, formatMessage } = context;

    const instructions = map(
        resource.dosage,
        (x) => zibInstructionsForUse.summary(x, context),
        true
    );
    const hasSingleInstruction = instructions.length === 1;

    const i18n = `r3.zib_medication_use`;

    return {
        label: capitalize(resource.medicationReference?.display) || formatMessage(i18n),
        children: [
            {
                children: [
                    ...(hasSingleInstruction ? instructions[0].children : []),
                    ui.code(`summary.${i18n}.status`, resource.status, {
                        i18nCode: 'r3.zib_medication_use.status',
                    }),
                    ui.codeableConcept(`${i18n}.reason_code.text`, resource.reasonCode),
                ],
            },
            ...(hasSingleInstruction ? [] : instructions),
            {
                label: formatMessage(`summary.${i18n}.group_period`),
                children: [...ui.period(`${i18n}.effective_period`, resource.effectivePeriod)],
            },
            {
                label: formatMessage(`summary.${i18n}.group_prescriber`),
                children: [
                    ui.reference(`summary.${i18n}.prescriber`, resource.prescriber),
                    organization(context),
                ],
            },
            summaryOptions(context, i18n, resource),
        ],
    };
};
