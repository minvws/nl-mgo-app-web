import { ui, type UiSchema } from '../../ui';
import { type ZibAlert } from './zibAlert';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317136
 */
export function uiSchema(resource: ZibAlert): UiSchema {
    const i18n = 'zib_alert';

    return {
        label: i18n,
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.multipleValues(`${i18n}.identifier`, resource.identifier, ui.identifier),
                    ui.code(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.category`, resource.category),
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.reference(`${i18n}.subject`, resource.subject),
                    ...ui.period(`${i18n}.period`, resource.period),
                    ui.reference(`${i18n}.encounter`, resource.encounter),
                    ui.reference(`${i18n}.author`, resource.author),
                ],
            },
        ],
    };
}
