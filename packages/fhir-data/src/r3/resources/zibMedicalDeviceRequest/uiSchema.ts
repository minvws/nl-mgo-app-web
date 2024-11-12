import { ui, type UiSchema } from '../../../ui';
import { type ZibMedicalDeviceRequest } from './zibMedicalDeviceRequest';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317263
 */
export function uiSchema(resource: ZibMedicalDeviceRequest): UiSchema {
    const profile = 'zib_medical_device_request';

    return {
        label: resource.occurrence?.start,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.string(`${profile}.status.order_status`, resource.status),
                    ...ui.period(`${profile}.occurrence_period`, resource.occurrence),
                    ...ui.valueX(`${profile}.code`, resource, 'code'),
                    ui.reference(`${profile}.perfomer`, resource.perfomer),
                ],
            },
        ],
    };
}
