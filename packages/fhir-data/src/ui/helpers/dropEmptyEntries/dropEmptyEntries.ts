import { type UiEntry, type UiSchema, type UiSchemaGroup } from '../../types';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry';

function processGroup(group: UiSchemaGroup) {
    return {
        ...group,
        children: group.children.filter((entry) => !isEmptyUiEntry(entry) || entry.showEmpty),
    };
}

function isSchemaGroup(schema: UiSchema | UiSchemaGroup): schema is UiSchemaGroup {
    return schema.children.some((x) => typeof (x as UiEntry).type === 'string');
}

function hasChildren(group: UiSchemaGroup) {
    return group.children.length > 0;
}

export function dropEmptyEntries(schema: UiSchema): UiSchema;
export function dropEmptyEntries(schema: UiSchemaGroup): UiSchemaGroup;
export function dropEmptyEntries(schema: UiSchema | UiSchemaGroup): UiSchema | UiSchemaGroup {
    if (isSchemaGroup(schema)) {
        return processGroup(schema);
    }

    return {
        ...schema,
        children: schema.children.map(processGroup).filter(hasChildren),
    };
}
