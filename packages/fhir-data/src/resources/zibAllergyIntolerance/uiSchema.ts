import { ui, type UiSchema } from '../../ui';
import { type ZibAllergyIntolerance } from './zibAllergyIntolerance';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317138
 */
export function uiSchema(resource: ZibAllergyIntolerance): UiSchema {
    const i18n = 'zib_allergy_intolerance';

    return {
        label: resource.identifier?.at(0)?.value,
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${i18n}.clinical_status`, resource.clinicalStatus),
                    ui.code(`${i18n}.verification_status`, resource.verificationStatus),
                    ui.code(`${i18n}.type`, resource.type),
                    ui.multipleValues(`${i18n}.category`, resource.category, ui.code),
                    ui.code(`${i18n}.criticality`, resource.criticality),
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.reference(`${i18n}.patient`, resource.patient),
                ],
            },
        ],
    };
}
