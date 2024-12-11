import {
    type SetEmptyEntriesHelper,
    type WithUiContext,
    type UiHelperContext,
    type UiSchema,
    type UiSchemaGroup,
} from '../../types';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry';

function processGroup(group: UiSchemaGroup, { formatMessage }: UiHelperContext): UiSchemaGroup {
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

export const setEmptyEntries: WithUiContext<SetEmptyEntriesHelper> = (context: UiHelperContext) => {
    return (schema: UiSchema): UiSchema => {
        return {
            ...schema,
            children: schema.children.map((x) => processGroup(x, context)),
        };
    };
};
