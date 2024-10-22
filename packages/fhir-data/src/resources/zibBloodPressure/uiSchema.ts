import { ui, type UiSchema } from '../../ui';
import { type ZibBloodPressure } from './zibBloodPressure';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317147
 */
export function uiSchema(resource: ZibBloodPressure): UiSchema {
    const profile = 'zib_blood_pressure';

    return {
        label: resource.effectiveDateTime,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.codeableConcept(`${profile}.method`, resource.method),
                    ui.codeableConcept(
                        `${profile}.cuff_type_loinc`,
                        resource.cuffTypeLOINC.valueCodeableConcept
                    ),
                    ui.codeableConcept(
                        `${profile}.cuff_type_snomed`,
                        resource.cuffTypeSNOMED.valueCodeableConcept
                    ),
                    ui.codeableConcept(`${profile}.bodySite`, resource.bodySite),
                    ui.codeableConcept(
                        `${profile}.diastolic_endpoint`,
                        resource.diastolicEndpoint.valueCodeableConcept
                    ),
                    ...ui.quantity(`${profile}.systolic_bp`, resource.systolicBP.valueQuantity),
                    ...ui.quantity(
                        `${profile}.diastolic_bp.code`,
                        resource.diastolicBP.valueQuantity
                    ),
                    ...ui.quantity(
                        `${profile}.average_blood_pressure_loinc`,
                        resource.averageBloodPressureLOINC.valueQuantity
                    ),
                    ...ui.quantity(
                        `${profile}.average_blood_pressure_snomed`,
                        resource.averageBloodPressureSNOMED.valueQuantity
                    ),
                    ui.dateTime(`${profile}.effective`, resource.effectiveDateTime),
                    ui.string(`${profile}.comment`, resource.comment),
                    ui.codeableConcept(
                        `${profile}.position_snomed`,
                        resource.positionSNOMED.valueCodeableConcept
                    ),
                    ui.codeableConcept(
                        `${profile}.position_loinc`,
                        resource.positionLOINC.valueCodeableConcept
                    ),
                ],
            },
        ],
    };
}
