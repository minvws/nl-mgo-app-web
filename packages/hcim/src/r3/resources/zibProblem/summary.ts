import { common, optional } from '@minvws/mgo-hcim-ui';
import { type SummarySchemaFunction } from '../../../resourceTypes.js';
import { type ZibProblem } from './zibProblem.js';

export const summary: SummarySchemaFunction<ZibProblem> = (resource, context) => {
    const { ui, formatMessage } = context;
    const i18n = 'r3.zib_problem';
    const label = resource.code?.coding.map((x) => x.display).join(', ') ?? formatMessage(i18n);
    return {
        label,
        children: [
            {
                children: [
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.codeableConcept(`${i18n}.body_site`, resource.bodySite),
                    ui.codeableConcept(
                        `${i18n}.clinical_status`,
                        resource.clinicalStatus.problemStatusCodelist
                    ),
                    ...optional(ui.annotation(`${i18n}.note`, resource.note)),
                ],
            },
            {
                label: formatMessage(`summary.${i18n}.group_period_of_time`),
                children: [
                    ui.dateTime(`${i18n}.onset_date_time`, resource.onsetDateTime),
                    ui.dateTime(`${i18n}.abatement_date_time`, resource.abatementDateTime),
                ],
            },
            {
                label: formatMessage(`summary.${i18n}.group_health_professional`),
                children: [common.organization(context, context.organization)],
            },
            common.summaryOptions(context, i18n, resource),
        ],
    };
};
