import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibNutritionAdvice } from './zibNutritionAdvice';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317294
 */
export const uiSchema: UiSchemaFunction<ZibNutritionAdvice> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'zib_nutrition_advice';

    return {
        label: resource.identifier?.at(0)?.value,
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.string(`${i18n}.comment`, resource.comment),
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.reference(`${i18n}.patient`, resource.patient),
                    ui.dateTime(`${i18n}.dateTime`, resource.dateTime),
                    ui.codeableConcept(
                        `${i18n}.food_preference_modifier`,
                        resource.foodPreferenceModifier
                    ),
                ],
            },
        ],
    };
};
