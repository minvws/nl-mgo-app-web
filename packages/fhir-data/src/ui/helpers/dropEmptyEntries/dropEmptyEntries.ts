import { type UiSchema, type UiSchemaGroup } from '../../types';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry';

function processGroup(group: UiSchemaGroup) {
    return {
        ...group,
        children: group.children.filter((entry) => !isEmptyUiEntry(entry)),
    };
}

type SchemaLike = UiSchema | UiSchemaGroup | UiSchemaGroup[];

function isSchemaGroup(schema: SchemaLike): schema is UiSchemaGroup {
    return (schema as UiSchemaGroup).children?.some((x) => typeof x.type === 'string');
}

function isSchemaGroupCollection(schema: SchemaLike): schema is UiSchemaGroup[] {
    return Array.isArray(schema) && schema?.some(isSchemaGroup);
}

function hasChildren(group: UiSchemaGroup) {
    return group.children.length > 0;
}

export function dropEmptyEntries(schema: UiSchema): UiSchema;
export function dropEmptyEntries(schema: UiSchemaGroup): UiSchemaGroup;
export function dropEmptyEntries(schema: UiSchemaGroup[]): UiSchemaGroup[];
export function dropEmptyEntries(schema: SchemaLike): SchemaLike {
    if (isSchemaGroup(schema)) {
        return processGroup(schema);
    }

    if (isSchemaGroupCollection(schema)) {
        return schema.map(processGroup).filter(hasChildren);
    }

    return {
        ...schema,
        children: schema.children.map(processGroup).filter(hasChildren),
    };
}
