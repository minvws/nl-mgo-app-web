import { ui, type UiSchema } from '../../ui';
import { type ZibMedicalDevice } from './zibMedicalDevice';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317253
 */
export function uiSchema(resource: ZibMedicalDevice): UiSchema {
    const i18n = 'zib_medical_device';

    return {
        label: resource.device?.display,
        children: [
            {
                label: `${i18n}.group_product`,
                children: [
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${i18n}.clinical_status`, resource.status),
                    ui.reference(`${i18n}.device`, resource.device),
                    ...ui.period(`${i18n}.whenUsed`, resource.whenUsed),
                    ui.dateTime(`${i18n}.recordedOn`, resource.recordedOn),
                ],
            },
            {
                label: `${i18n}.group_indication`,
                children: [
                    ui.multipleValues(`${i18n}.note`, resource.note, ui.annotation),
                    ui.codeableConcept(`${i18n}.bodySite`, resource.bodySite),
                    ui.codeableConcept(`${i18n}.laterality`, resource.laterality),
                    ui.reference(`${i18n}.reason`, resource.reason),
                ],
            },
            {
                label: `${i18n}.group_general`,
                children: [
                    ui.reference(`${i18n}.patient`, resource.patient),
                    ui.reference(`${i18n}.source`, resource.source),
                    ui.reference(`${i18n}.organization`, resource.organization),
                    ui.reference(`${i18n}.practitioner`, resource.practitioner),
                ],
            },
        ],
    };
}
