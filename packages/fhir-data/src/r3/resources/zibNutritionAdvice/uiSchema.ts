import { ui, type UiSchema } from '../../../ui';
import { type ZibNutritionAdvice } from './zibNutritionAdvice';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317294
 */
export function uiSchema(resource: ZibNutritionAdvice): UiSchema {
    const i18n = 'zib_nutrition_advice';

    return {
        label: resource.identifier?.at(0)?.value,
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.string(`${i18n}.comment`, resource.comment),
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.reference(`${i18n}.patient`, resource.patient),
                    ui.dateTime(`${i18n}.dateTime`, resource.dateTime),
                    ui.multipleValues(
                        `${i18n}.food_preference_modifier`,
                        resource.foodPreferenceModifier,
                        ui.codeableConcept
                    ),
                ],
            },
        ],
    };
}
