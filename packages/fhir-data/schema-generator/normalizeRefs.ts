import capitalize from 'lodash/capitalize';
import cloneDeep from 'lodash/cloneDeep';
import { Schema } from 'ts-json-schema-generator';
import { SetRequired } from 'type-fest';

export type SchemaWithDefinitions = SetRequired<Schema, 'definitions'>;
type Definitions = NonNullable<Schema['definitions']>;
type JsonSchemaDefinition = Definitions[keyof Definitions];
type JsonSchema = Exclude<Definitions[keyof Definitions], boolean>;

function createUniqueName(
    name: string,
    definitions: Definitions,
    toRename: Record<string, string>
) {
    let finalNewName = name;
    const toRenameNames = Object.values(toRename);
    let n = 1;
    while (definitions![finalNewName] || toRenameNames.includes(finalNewName)) {
        n++;
        finalNewName = `${name}${n}`;
    }
    return finalNewName;
}

/**
 * Replaces all $ref values that contain encoded characters with a new simplified name.
 * Returns a map of old $ref values to new simplified names.
 */
function processDefinition(
    name: string,
    definition: JsonSchemaDefinition,
    definitions: Definitions,
    toRename: Record<string, string>
) {
    if (typeof definition === 'boolean') return toRename;

    if (definition?.type === 'object') {
        return processObjectDefinition(name, definition, definitions, toRename);
    } else if (definition?.type === 'array') {
        return processArrayDefinition(name, definition, definitions, toRename);
    }

    const ref = definition?.$ref;
    if (!ref || decodeURIComponent(ref) === ref) {
        return toRename;
    }

    toRename[ref] = toRename[ref] ?? createUniqueName(name, definitions, toRename);
    definition.$ref = `#/definitions/${toRename[ref]}`;

    return toRename;
}

function processObjectDefinition(
    name: string,
    definition: JsonSchema,
    definitions: Definitions,
    toRename: Record<string, string>
): Record<string, string> {
    if (!definition?.properties) return toRename;

    const properties = Object.entries(definition.properties);
    for (const [propName, prop] of properties) {
        const fullPropName = `${name}${capitalize(propName)}`;

        toRename = {
            ...toRename,
            ...processDefinition(fullPropName, prop, definitions, toRename),
        };
    }

    return toRename;
}

function processArrayDefinition(
    name: string,
    definition: JsonSchema,
    definitions: Definitions,
    toRename: Record<string, string>
): Record<string, string> {
    if (typeof definition?.items === 'boolean' || !definition?.items) return toRename;

    if (Array.isArray(definition.items)) {
        for (const item of definition.items) {
            toRename = {
                ...toRename,
                ...processDefinition(name, item, definitions, toRename),
            };
        }

        return toRename;
    }

    if (definition.items?.type === 'object') {
        return processObjectDefinition(name, definition.items, definitions, toRename);
    }

    return processDefinition(name, definition.items, definitions, toRename);
}

/**
 * This function replaces all references that contain encoded characters with a new simplified name.
 */
export function normalizeRefs(schema: SchemaWithDefinitions): SchemaWithDefinitions {
    const schemaClone = cloneDeep(schema);
    const definitions = Object.entries(schemaClone.definitions);

    let toRename: Record<string, string> = {};
    for (const [name, definition] of definitions) {
        toRename = {
            ...toRename,
            ...processDefinition(name, definition, schemaClone.definitions, toRename),
        };
    }

    for (const ref in toRename) {
        const newName = toRename[ref];
        const currentName = decodeURIComponent(ref.split('/').pop()!);
        const definition = schemaClone.definitions[currentName];
        if (!definition) {
            throw new Error(`Definition ${currentName} not found`);
        }
        delete schemaClone.definitions[currentName];
        schemaClone.definitions[newName] = definition;
    }

    return schemaClone;
}
