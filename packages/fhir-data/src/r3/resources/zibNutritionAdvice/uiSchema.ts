import { type HealthUiSchemaFunction } from '../../../ui';
import { valueOf } from '../../../ui/helpers/valueOf/valueOf';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibNutritionAdvice } from './zibNutritionAdvice';

export const i18n = 'r3.zib_nutrition_advice';
export const uiSchema: HealthUiSchemaFunction<ZibNutritionAdvice> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: valueOf(resource.identifier?.at(0)) ?? context.formatMessage(i18n),
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
