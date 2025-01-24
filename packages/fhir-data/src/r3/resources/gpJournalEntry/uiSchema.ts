import { type UiSchemaFunction } from '../../../ui';
import { type NonStrictUi } from '../../../ui/types';
import { type GpJournalEntry } from './gpJournalEntry';

export const i18n = 'r3.gp_journal_entry';
export const uiSchema: UiSchemaFunction<GpJournalEntry> = (resource, context) => {
    const ui = context.ui as NonStrictUi;

    return {
        label: resource.context?.display ?? context.formatMessage(i18n),
        children: [
            {
                label: `${i18n}.group_details`,
                children: [
                    ui.identifier(`${i18n}.identifier`, resource.identifier),
                    ui.string(`${i18n}.status`, resource.status),
                    ui.codeableConcept(`${i18n}.code`, resource.code),
                    ui.reference(`${i18n}.context`, resource.context),
                    ...ui.oneOfValueX(`${i18n}.effective`, resource, 'effective'),
                    ui.reference(`${i18n}.performer`, resource.performer),
                    ui.string(`${i18n}.valueString`, resource.valueString),
                    ui.codeableConcept(`${i18n}.ICPC_S`, resource.ICPC_S.valueCodeableConcept),
                    ui.codeableConcept(`${i18n}.ICPC_E`, resource.ICPC_E.valueCodeableConcept),
                ],
            },
        ],
    };
};
