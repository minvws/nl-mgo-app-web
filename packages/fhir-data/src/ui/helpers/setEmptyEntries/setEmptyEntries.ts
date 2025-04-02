import { type UiHelperContext } from '../../context';
import { type HealthUiGroup, type HealthUiSchema } from '../../types';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry';
import { isUiSchemaGroup } from '../isUiSchemaGroup/isUiSchemaGroup';

function processGroup(group: HealthUiGroup, { formatMessage }: UiHelperContext): HealthUiGroup {
    return {
        ...group,
        children: group.children.map((entry) => {
            return isEmptyUiEntry(entry) &&
                !['DOWNLOAD_LINK', 'DOWNLOAD_BINARY'].includes(entry.type)
                ? {
                      label: entry.label,
                      type: 'SINGLE_VALUE',
                      display: formatMessage('fhir.empty_value'),
                  }
                : entry;
        }),
    };
}

export function setEmptyEntries(context: UiHelperContext) {
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
