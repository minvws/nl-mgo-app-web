import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type GpDiagnosticResult } from './gpDiagnosticResult';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316990
 */
export const uiSchema: UiSchemaFunction<GpDiagnosticResult> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'gp_diagnostic_result';
    return {
        label: resource.context?.display,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.identifier(`${profile}.identifier`, resource.identifier),
                    ui.reference(`${profile}.context`, resource.context),
                    ui.reference(`${profile}.subject`, resource.subject),
                    ui.dateTime(`${profile}.effective`, resource.effective),
                    ui.reference(`${profile}.performer`, resource.performer),
                    ui.string(`${profile}.status`, resource.status),
                    ui.codeableConcept(`${profile}.code`, resource.code),
                    ui.string(`${profile}.comment`, resource.comment),
                    ui.codeableConcept(`${profile}.method`, resource.method),
                    ...ui.oneOfValueX(`${profile}.value`, resource, 'value'),
                ],
            },
        ],
    };
};
