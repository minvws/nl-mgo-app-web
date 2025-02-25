import { type HealthUiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibAlert } from './zibAlert';

export const i18n = 'r3.zib_alert';
export const uiSchema: HealthUiSchemaFunction<ZibAlert> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.code?.coding?.[0]?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_general_information`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
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
};
