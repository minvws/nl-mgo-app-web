import { common } from '@minvws/mgo-hcim-ui';
import { type SummarySchemaFunction } from '../../../resourceTypes.js';
import { type ZibProblem } from './zibProblem.js';
/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.r4.zib2020/0.10.0-beta.1/files/2194816
 */
export const summary: SummarySchemaFunction<ZibProblem> = (resource, context) => {
    const { ui, formatMessage } = context;

    const i18n = 'r3.zib_problem';

    const bodySites = resource.bodySite?.map((bodySite) => ({
        label: formatMessage(`summary.${i18n}.group_body_site`),
        children: [
            ui.codeableConcept(`${i18n}.body_site`, bodySite),
            ui.codeableConcept(`${i18n}.body_site.laterality`, bodySite.laterality),
        ],
    })) ?? [
        {
            label: formatMessage(`summary.${i18n}.group_body_site`),
            children: [
                ui.codeableConcept(`${i18n}.body_site`, undefined),
                ui.codeableConcept(`${i18n}.body_site.laterality`, undefined),
            ],
        },
    ];

    const hasSingleBodySite = bodySites.length === 1;

    const label = resource.code?.coding.map((x) => x.display).join(', ') ?? formatMessage(i18n);

    return {
        label,
        children: [
            {
                label: formatMessage(`summary.${i18n}.group_about`),
                children: [
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ...(hasSingleBodySite ? bodySites[0].children : []),
                    ui.codeableConcept(
                        `${i18n}.verification_status`,
                        resource.verificationStatus.verificatieStatusCodelijst
                    ),
                    ui.codeableConcept(
                        `${i18n}.clinical_status`,
                        resource.clinicalStatus.problemStatusCodelist
                    ),
                    ui.annotation(`${i18n}.note`, resource.note),
                ],
            },
            ...(bodySites.length > 1 ? bodySites : []),
            {
                label: formatMessage(`summary.${i18n}.group_period_of_time`),
                children: [
                    ui.dateTime(`${i18n}.onset_date_time`, resource.onsetDateTime),
                    ui.dateTime(`${i18n}.abatement_date_time`, resource.abatementDateTime),
                ],
            },
            {
                label: formatMessage(`summary.${i18n}.group_health_professional`),
                children: [ui.reference(`${i18n}.asserter`, resource.asserter)],
            },
            common.summaryOptions(context, i18n, resource),
        ],
    };
};
