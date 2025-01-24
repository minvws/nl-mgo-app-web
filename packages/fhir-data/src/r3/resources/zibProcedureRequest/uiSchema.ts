import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type ZibProcedureRequest } from './zibProcedureRequest';

export const i18n = 'r3.zib_procedure_request';
export const uiSchema: UiSchemaFunction<ZibProcedureRequest> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.code?.coding?.at(0)?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}`,
                children: [
                    ui.string(`${i18n}.status.order_status`, resource.status),
                    ...ui.period(`${i18n}.occurrence_period`, resource.occurrence),
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.reference(`${i18n}.perfomer`, resource.perfomer),
                ],
            },
        ],
    };
};
