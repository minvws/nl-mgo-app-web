import { type UiContext } from '../../context/index.js';
import { type HealthUiGroup, type HealthUiSchema } from '../../types/index.js';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry.js';
import { isUiSchemaGroup } from '../isUiSchemaGroup/isUiSchemaGroup.js';

function processGroup(group: HealthUiGroup, { formatMessage }: UiContext): HealthUiGroup {
    return {
        ...group,
        children: group.children.map((entry) => {
            return isEmptyUiEntry(entry) &&
                !['DOWNLOAD_LINK', 'DOWNLOAD_BINARY'].includes(entry.type)
                ? {
                      label: entry.label,
                      type: 'SINGLE_VALUE',
                      value: { display: formatMessage('fhir.empty_value') },
                  }
                : entry;
        }),
    };
}

export function setEmptyEntries(context: UiContext) {
    return <T extends HealthUiSchema | HealthUiGroup | HealthUiGroup[]>(schema: T): T => {
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
