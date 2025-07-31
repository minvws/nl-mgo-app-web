import { common } from '@minvws/mgo-hcim-ui';
import { map } from '@minvws/mgo-utils';
import { capitalize } from 'lodash-es';
import { type SummarySchemaFunction } from '../../../resourceTypes.js';
import { zibInstructionsForUse } from '../../elements/index.js';
import { type ZibMedicationUse } from './zibMedicationUse.js';
/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export const summary: SummarySchemaFunction<ZibMedicationUse> = (resource, context) => {
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
                    common.organization(context, context.organization),
                ],
            },
            common.summaryOptions(context, i18n, resource),
        ],
    };
};
