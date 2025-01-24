import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type GpDiagnosticResult } from './gpDiagnosticResult';

export const i18n = 'r3.gp_diagnostic_result';

export const uiSchema: UiSchemaFunction<GpDiagnosticResult> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.context?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.reference(`${i18n}.context`, resource.context),
                    ui.reference(`${i18n}.subject`, resource.subject),
                    ui.dateTime(`${i18n}.effective`, resource.effective),
                    ui.reference(`${i18n}.performer`, resource.performer),
                    ui.string(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.string(`${i18n}.comment`, resource.comment),
                    ui.codeableConcept(`${i18n}.method`, resource.method),
                    ...ui.oneOfValueX(`${i18n}.value`, resource, 'value'),
                ],
            },
        ],
    };
};
