import { type HealthUiGroup, type HealthUiSchema } from '../../types/index.js';
import { isEmptyUiEntry } from '../isEmptyUiEntry/isEmptyUiEntry.js';

function processGroup(group: HealthUiGroup) {
    return {
        ...group,
        children: group.children.filter((entry) => !isEmptyUiEntry(entry)),
    };
}

type SchemaLike = HealthUiSchema | HealthUiGroup | HealthUiGroup[];

function isSchemaGroup(schema: SchemaLike): schema is HealthUiGroup {
    return (schema as HealthUiGroup).children?.some((x) => typeof x.type === 'string');
}

function isSchemaGroupmockArray(schema: SchemaLike): schema is HealthUiGroup[] {
    return Array.isArray(schema) && schema?.some(isSchemaGroup);
}

function hasChildren(group: HealthUiGroup) {
    return group.children.length > 0;
}

export function dropEmptyEntries(schema: HealthUiSchema): HealthUiSchema;
export function dropEmptyEntries(schema: HealthUiGroup): HealthUiGroup;
export function dropEmptyEntries(schema: HealthUiGroup[]): HealthUiGroup[];
export function dropEmptyEntries(schema: SchemaLike): SchemaLike {
    if (isSchemaGroup(schema)) {
        return processGroup(schema);
    }

    if (isSchemaGroupmockArray(schema)) {
        return schema.map(processGroup).filter(hasChildren);
    }

    return {
        ...schema,
        children: schema.children.map(processGroup).filter(hasChildren),
    };
}
