import { ui, type UiSchema } from '../../../ui';
import { type ZibProcedureRequest } from './zibProcedureRequest';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317340
 */
export function uiSchema(resource: ZibProcedureRequest): UiSchema {
    const profile = 'zib_procedure_request';

    return {
        label: resource.code?.at(0)?.display,
        children: [
            {
                label: `${profile}`,
                children: [
                    ui.string(`${profile}.status.order_status`, resource.status),
                    ...ui.period(`${profile}.occurrence_period`, resource.occurrence),
                    ui.codeableConcept(`${profile}.code`, resource.code),
                    ui.reference(`${profile}.perfomer`, resource.perfomer),
                ],
            },
        ],
    };
}
