import { ui, type UiSchema } from '../../../ui';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { type ZibAlcoholUse } from '../zibAlcoholUse/zibAlcoholUse';
import { type ZibDrugUse } from '../zibDrugUse/zibDrugUse';
import { type ZibFunctionalOrMentalStatus } from '../zibFunctionalOrMentalStatus/zibFunctionalOrMentalStatus';
import { type ZibLivingSituation } from '../zibLivingSituation/zibLivingSituation';
import { type ZibTobaccoUse } from '../zibTobaccoUse/zibTobaccoUse';
import { type NlCoreObservation } from './nlCoreObservation';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317041
 */
export function uiSchema(
    resource:
        | NlCoreObservation
        | ZibAlcoholUse
        | ZibDrugUse
        | ZibLivingSituation
        | ZibFunctionalOrMentalStatus
        | ZibTobaccoUse
): UiSchema {
    const i18n = 'nl_core_observation';

    return {
        label: resource.identifier?.[0]?.value,
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.multipleValues(`${i18n}.category`, resource.category, ui.codeableConcept),
                    ui.reference(`${i18n}.subject`, resource.subject),
                    ui.reference(`${i18n}.context`, resource.context),
                    Object.prototype.hasOwnProperty.call(resource, 'effectiveDateTime')
                        ? ui.dateTime(
                              `${i18n}.effective_date_time`,
                              (resource as NlCoreObservation).effectiveDateTime
                          )
                        : undefined,
                    ...ui.period(`${i18n}.effective_period`, resource.effectivePeriod),
                    ui.codeableConcept(`${i18n}.data_absent_reason`, resource.dataAbsentReason),
                    ui.string(`${i18n}.comment`, resource.comment),
                    ui.codeableConcept(`${i18n}.body_site`, resource.bodySite),
                ].filter(isNonNullish),
            },
        ],
    };
}
