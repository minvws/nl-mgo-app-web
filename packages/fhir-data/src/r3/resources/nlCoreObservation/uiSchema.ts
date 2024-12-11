import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { isNonNullish } from '../../../utils/isNonNullish/isNonNullish';
import { type ZibAlcoholUse } from '../zibAlcoholUse/zibAlcoholUse';
import { type ZibDrugUse } from '../zibDrugUse/zibDrugUse';
import { type ZibFunctionalOrMentalStatus } from '../zibFunctionalOrMentalStatus/zibFunctionalOrMentalStatus';
import { type ZibLivingSituation } from '../zibLivingSituation/zibLivingSituation';
import { type ZibTobaccoUse } from '../zibTobaccoUse/zibTobaccoUse';
import { type NlCoreObservation } from './nlCoreObservation';

type ObservationLikeResource =
    | NlCoreObservation
    | ZibAlcoholUse
    | ZibDrugUse
    | ZibLivingSituation
    | ZibFunctionalOrMentalStatus
    | ZibTobaccoUse;

export const uiSchema: UiSchemaFunction<ObservationLikeResource> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'nl_core_observation';

    return {
        label: resource.identifier?.[0]?.value,
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
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
};
