import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type GpJournalEntry } from './gpJournalEntry';

/**
 * @see: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2316995
 */
export const uiSchema: UiSchemaFunction<GpJournalEntry> = (resource, context) => {
    const ui = context.ui as NonStrictUi;
    const profile = 'gp_journal_entry';
    return {
        label: resource.context?.display,
        children: [
            {
                label: `${profile}.group_details`,
                children: [
                    ui.identifier(`${profile}.identifier`, resource.identifier),
                    ui.string(`${profile}.status`, resource.status),
                    ui.codeableConcept(`${profile}.code`, resource.code),
                    ui.reference(`${profile}.context`, resource.context),
                    ...ui.oneOfValueX(`${profile}.effective`, resource, 'effective'),
                    ui.reference(`${profile}.performer`, resource.performer),
                    ui.string(`${profile}.valueString`, resource.valueString),
                    ui.codeableConcept(`${profile}.ICPC_S`, resource.ICPC_S.valueCodeableConcept),
                    ui.codeableConcept(`${profile}.ICPC_E`, resource.ICPC_E.valueCodeableConcept),
                ],
            },
        ],
    };
};
