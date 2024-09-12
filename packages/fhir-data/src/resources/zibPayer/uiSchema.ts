import { ui, type UiSchema } from '../../ui';
import { uiSchemaGroup as groupingUiSchema } from './elements/grouping/uiSchemaGroup';
import { type ZibPayer } from './zibPayer';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317307
 */
export function uiSchema(resource: ZibPayer): UiSchema {
    const i18n = 'zib_payer';

    return {
        label: resource.identifier?.at(0)?.value,
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.multipleValue(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.type`, resource.type),
                    ui.reference(`${i18n}.policy_holder`, resource.policyHolder),
                    ui.reference(`${i18n}.subscriber`, resource.subscriber),
                    ui.string(`${i18n}.subscriber_id`, resource.subscriberId),
                    ui.reference(`${i18n}.beneficiary`, resource.beneficiary),
                    ui.codeableConcept(`${i18n}.relationship`, resource.relationship),
                    ...ui.period(`${i18n}.period`, resource.period),
                    ui.multipleValue(`${i18n}.payor`, resource.payor, ui.reference),
                    ui.string(`${i18n}.dependent`, resource.dependent),
                    ui.string(`${i18n}.sequence`, resource.sequence),
                    ui.positiveInt(`${i18n}.order`, resource.order),
                    ui.string(`${i18n}.network`, resource.network),
                    ui.multipleValue(`${i18n}.contract`, resource.contract, ui.reference),
                ],
            },
            groupingUiSchema(resource.grouping),
        ],
    };
}
