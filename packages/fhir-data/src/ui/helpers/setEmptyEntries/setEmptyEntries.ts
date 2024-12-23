import { type I18nContext } from '../../../i18n';
import {
    type SetEmptyEntriesHelper,
    type UiSchema,
    type UiSchemaGroup,
    type WithI18nContext,
} from '../../types';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry';

function processGroup(group: UiSchemaGroup, { formatMessage }: I18nContext): UiSchemaGroup {
    return {
        ...group,
        children: group.children.map((entry) => {
            return isEmptyUiEntry(entry)
                ? {
                      type: 'SINGLE_VALUE',
                      label: entry.label,
                      display: formatMessage('schema.empty_entry_display'),
                  }
                : entry;
        }),
    };
}

export const setEmptyEntries: WithI18nContext<SetEmptyEntriesHelper> = (context: I18nContext) => {
    return (schema: UiSchema): UiSchema => {
        return {
            ...schema,
            children: schema.children.map((x) => processGroup(x, context)),
        };
    };
};
