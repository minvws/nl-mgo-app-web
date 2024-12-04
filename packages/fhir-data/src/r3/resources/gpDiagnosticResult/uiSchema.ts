import { ui, type UiSchema } from '../../../ui';
import { type GpDiagnosticResult } from './gpDiagnosticResult';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316990
 */
export function uiSchema(resource: GpDiagnosticResult): UiSchema {
    const profile = 'gp_diagnostic_result';
    return {
        label: resource.context?.display,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.multipleValues(`${profile}.identifier`, resource.identifier, ui.identifier),
                    ui.reference(`${profile}.context`, resource.context),
                    ui.reference(`${profile}.subject`, resource.subject),
                    ui.dateTime(`${profile}.effective`, resource.effective),
                    ui.multipleValues(`${profile}.performer`, resource.performer, ui.reference),
                    ui.string(`${profile}.status`, resource.status),
                    ui.codeableConcept(`${profile}.code`, resource.code),
                    ui.string(`${profile}.comment`, resource.comment),
                    ui.codeableConcept(`${profile}.method`, resource.method),
                    ...ui.oneOfValueX(`${profile}.value`, resource, 'value'),
                ],
            },
        ],
    };
}
