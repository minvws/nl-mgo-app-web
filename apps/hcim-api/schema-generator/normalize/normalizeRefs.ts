import { cloneDeep } from 'lodash-es';
import { JSONSchema7, JSONSchema7Definition, SchemaWithDefinitions } from '../types.js';
import { isSafeName, makeSafeName } from './safeName.js';

/**
 * This function replaces all references that contain encoded characters with a new simplified name.
 */
export function normalizeRefs(schema: SchemaWithDefinitions): SchemaWithDefinitions {
    const schemaClone = cloneDeep(schema);
    const definitions = Object.entries(schemaClone.definitions);

    let toRename: Record<string, string> = {};
    for (const [name, definition] of definitions) {
        if (!isSafeName(name)) {
            const safeName = makeSafeName(name);
            toRename[name] = safeName;
            schemaClone.definitions[safeName] = definition;
            delete schemaClone.definitions[name];
        }
    }

    for (const [, definition] of definitions) {
        replaceRefsInNode(definition, toRename);
    }

    return schemaClone;
}

function replaceRefsInNode(node: JSONSchema7Definition, toRename: Record<string, string>): void {
    if (!node) return;

    if (Array.isArray(node)) {
        for (const item of node) replaceRefsInNode(item, toRename);
        return;
    }

    if (typeof node === 'object') {
        replaceRefsInObject(node, toRename);
    }
}

function replaceRefsInObject(node: JSONSchema7, toRename: Record<string, string>): void {
    if (typeof node.$ref === 'string') {
        const refValue = node.$ref;
        const prefix = '#/definitions/';

        // Extract candidate name from the ref, handling both with and without the prefix
        const candidate = refValue.startsWith(prefix) ? refValue.slice(prefix.length) : refValue;
        const decodedCandidate = safeDecodeURIComponent(candidate);

        // If the mapped name exists, rewrite using the canonical prefix
        const mapped = toRename[candidate] ?? toRename[decodedCandidate];
        if (mapped) {
            node.$ref = `${prefix}${mapped}`;
        }
    }

    for (const key of Object.keys(node)) {
        replaceRefsInNode((node as Record<string, any>)[key], toRename);
    }
}

function safeDecodeURIComponent(value: string): string {
    try {
        return decodeURIComponent(value);
    } catch {
        return value;
    }
}
