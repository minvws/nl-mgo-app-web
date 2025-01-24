import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibMedicalDeviceProduct } from './zibMedicalDeviceProduct';

export const i18n = 'r3.zib_medical_device_product';
export const uiSchema: UiSchemaFunction<ZibMedicalDeviceProduct> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.id ?? context.formatMessage(i18n),
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
