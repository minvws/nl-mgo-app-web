import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibMedicalDevice } from './zibMedicalDevice';

export const i18n = 'r3.zib_medical_device';
export const uiSchema: UiSchemaFunction<ZibMedicalDevice> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.device?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_product`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.code(`${i18n}.clinical_status`, resource.status),
                    ui.reference(`${i18n}.device`, resource.device),
                    ...ui.period(`${i18n}.whenUsed`, resource.whenUsed),
                    ui.dateTime(`${i18n}.recordedOn`, resource.recordedOn),
                ],
            },
            {
                label: `${i18n}.group_indication`,
                children: [
                    ui.annotation(`${i18n}.note`, resource.note),
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
};
