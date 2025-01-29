import { type I18nContext } from '../../../i18n';
import { type UiHelperContext } from '../../context/ui';
import { type UiSchema, type UiSchemaGroup } from '../../types';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry';
import { isUiSchemaGroup } from '../isUiSchemaGroup/isUiSchemaGroup';

function processGroup(group: UiSchemaGroup, { formatMessage }: I18nContext): UiSchemaGroup {
    return {
        ...group,
        children: group.children.map((entry) => {
            return isEmptyUiEntry(entry) &&
                !['DOWNLOAD_LINK', 'DOWNLOAD_BINARY'].includes(entry.type)
                ? {
                      type: 'SINGLE_VALUE',
                      label: entry.label,
                      display: formatMessage('schema.empty_entry_display'),
                  }
                : entry;
        }),
    };
}

export function setEmptyEntries(context: UiHelperContext) {
    return <T extends UiSchema | UiSchemaGroup | UiSchemaGroup[]>(schema: T): T => {
        if (Array.isArray(schema)) {
            return schema.map((x) => processGroup(x, context)) as T;
        }

        if (isUiSchemaGroup(schema)) {
            return processGroup(schema, context) as T;
        }

        return {
            ...schema,
            children: schema.children.map((x) => processGroup(x, context)),
        };
    };
}
