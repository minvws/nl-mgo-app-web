import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibMedicalDeviceProduct } from './zibMedicalDeviceProduct';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317343
 */
export const uiSchema: UiSchemaFunction<ZibMedicalDeviceProduct> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const i18n = 'zib_medical_device_product';

    return {
        label: resource.id,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.reference(`${i18n}.patient`, resource.patient),
                    ui.annotation(`${i18n}.note`, resource.note),
                    ui.dateTime(`${i18n}.expiration_date`, resource.expirationDate),
                ],
            },
        ],
    };
};
