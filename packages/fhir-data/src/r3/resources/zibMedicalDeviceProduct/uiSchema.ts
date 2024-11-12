import { ui, type UiSchema } from '../../../ui';
import { type ZibMedicalDeviceProduct } from './zibMedicalDeviceProduct';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export function uiSchema(resource: ZibMedicalDeviceProduct): UiSchema {
    const i18n = 'zib_medical_device_product';

    return {
        label: resource.id,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.reference(`${i18n}.patient`, resource.patient),
                    ui.multipleValues(`${i18n}.note`, resource.note, ui.annotation),
                    ui.dateTime(`${i18n}.expiration_date`, resource.expirationDate),
                ],
            },
        ],
    };
}
