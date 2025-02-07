import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibMedicalDeviceRequest } from './zibMedicalDeviceRequest';

export const i18n = 'r3.zib_medical_device_request';
export const uiSchema: HealthUiSchemaFunction<ZibMedicalDeviceRequest> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.occurrence?.start ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.string(`${i18n}.status.order_status`, resource.status),
                    ...ui.period(`${i18n}.occurrence_period`, resource.occurrence),
                    ...ui.oneOfValueX(`${i18n}.code`, resource, 'code'),
                    ui.reference(`${i18n}.perfomer`, resource.perfomer),
                ],
            },
        ],
    };
};
