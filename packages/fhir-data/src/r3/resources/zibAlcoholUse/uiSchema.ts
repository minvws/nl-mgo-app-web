import { type HealthUiSchemaFunction } from '../../../ui';
import { type ZibAlcoholUse } from '../zibAlcoholUse/zibAlcoholUse';

export const i18n = 'r3.zib_alcohol_use';

export const uiSchema: HealthUiSchemaFunction<ZibAlcoholUse> = (resource, context) => {
    const { ui, formatMessage } = context;

    /**
     * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317134
     */
    const hcimAlcoholUse = {
        StartDate: ui.dateTime(`${i18n}.effective_period.start`, resource.effectivePeriod?.start),
        EndDate: ui.dateTime(`${i18n}.effective_period.end`, resource.effectivePeriod?.end),
        AlcoholUseStatus: ui.codeableConcept(
            `${i18n}.value_codeable_concept`,
            resource.valueCodeableConcept
        ),
        Comment: ui.string(`${i18n}.comment`, resource.comment),
        Amount: ui.quantity(`${i18n}.amount.value_quantity`, resource.component.amount),
    };

    const hcimBasicElements = {
        IdentificationNumber: ui.identifier(`${i18n}.identifier`, resource.identifier),
        Subject: ui.reference(`${i18n}.subject`, resource.subject),
        Author: ui.reference(`fhir.x.performer`, resource.performer),
    };

    return {
        label: formatMessage(i18n),
        children: [
            {
                label: formatMessage(`fhir.group_general_info`),
                children: [
                    hcimAlcoholUse.StartDate,
                    hcimAlcoholUse.EndDate,
                    hcimAlcoholUse.AlcoholUseStatus,
                    hcimAlcoholUse.Comment,
                    hcimAlcoholUse.Amount,
                    hcimBasicElements.IdentificationNumber,
                    hcimBasicElements.Subject,
                    hcimBasicElements.Author,
                ],
            },
        ],
    };
};
