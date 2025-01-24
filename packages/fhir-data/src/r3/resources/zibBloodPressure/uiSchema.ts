import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibBloodPressure } from './zibBloodPressure';

export const i18n = 'r3.zib_blood_pressure';
export const uiSchema: UiSchemaFunction<ZibBloodPressure> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.effectiveDateTime ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.codeableConcept(`${i18n}.method`, resource.method),
                    ui.codeableConcept(
                        `${i18n}.cuff_type_loinc`,
                        resource.cuffTypeLOINC.valueCodeableConcept
                    ),
                    ui.codeableConcept(
                        `${i18n}.cuff_type_snomed`,
                        resource.cuffTypeSNOMED.valueCodeableConcept
                    ),
                    ui.codeableConcept(`${i18n}.bodySite`, resource.bodySite),
                    ui.codeableConcept(
                        `${i18n}.diastolic_endpoint`,
                        resource.diastolicEndpoint.valueCodeableConcept
                    ),
                    ui.quantity(`${i18n}.systolic_bp`, resource.systolicBP.valueQuantity),
                    ui.quantity(`${i18n}.diastolic_bp.code`, resource.diastolicBP.valueQuantity),
                    ui.quantity(
                        `${i18n}.average_blood_pressure_loinc`,
                        resource.averageBloodPressureLOINC.valueQuantity
                    ),
                    ui.quantity(
                        `${i18n}.average_blood_pressure_snomed`,
                        resource.averageBloodPressureSNOMED.valueQuantity
                    ),
                    ui.dateTime(`${i18n}.effective`, resource.effectiveDateTime),
                    ui.string(`${i18n}.comment`, resource.comment),
                    ui.codeableConcept(
                        `${i18n}.position_snomed`,
                        resource.positionSNOMED.valueCodeableConcept
                    ),
                    ui.codeableConcept(
                        `${i18n}.position_loinc`,
                        resource.positionLOINC.valueCodeableConcept
                    ),
                ],
            },
        ],
    };
};
