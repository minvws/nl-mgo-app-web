import { type HealthUiSchemaFunction } from '../../../ui';
import { type ZibAlert } from './zibAlert';

export const i18n = 'r3.zib_alert';
export const uiSchema: HealthUiSchemaFunction<ZibAlert> = (resource, context) => {
    const { ui, formatMessage } = context;

    const hcimAlert = {
        Condition: ui.reference(`${i18n}.concern_reference`, resource.concernReference),
        AlertType: ui.codeableConcept(`${i18n}.category`, resource.category),
        AlertName: ui.codeableConcept(`${i18n}.code`, resource.code),
        StartDateTime: ui.dateTime(`${i18n}.period.start`, resource.period?.start),
    };

    const hcimBasicElements = {
        IdentificationNumber: ui.identifier(`${i18n}.identifier`, resource.identifier),
        Author: ui.reference(`${i18n}.author`, resource.author),
    };

    return {
        label: formatMessage(i18n),
        children: [
            {
                label: resource.code?.coding?.[0]?.display ?? context.formatMessage(i18n),
                children: [
                    hcimAlert.Condition,
                    hcimAlert.AlertType,
                    hcimAlert.AlertName,
                    hcimAlert.StartDateTime,
                    hcimBasicElements.IdentificationNumber,
                    hcimBasicElements.Author,
                ],
            },
        ],
    };
};
