import { ui, type UiSchema } from '../../../ui';
import { oneOfValueX } from '../../../ui/special';
import { type GpJournalEntry } from './gpJournalEntry';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316995
 */
export function uiSchema(resource: GpJournalEntry): UiSchema {
    const profile = 'gp_journal_entry';
    return {
        label: resource.context?.display,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.multipleValues(`${profile}.identifier`, resource.identifier, ui.identifier),
                    ui.string(`${profile}.status`, resource.status),
                    ui.codeableConcept(`${profile}.code`, resource.code),
                    ui.reference(`${profile}.context`, resource.context),
                    ...oneOfValueX(`${profile}.effective`, resource, 'effective'),
                    ui.multipleValues(`${profile}.performer`, resource.performer, ui.reference),
                    ui.string(`${profile}.valueString`, resource.valueString),
                    ui.codeableConcept(`${profile}.ICPC_S`, resource.ICPC_S.valueCodeableConcept),
                    ui.codeableConcept(`${profile}.ICPC_E`, resource.ICPC_E.valueCodeableConcept),
                ],
            },
        ],
    };
}
