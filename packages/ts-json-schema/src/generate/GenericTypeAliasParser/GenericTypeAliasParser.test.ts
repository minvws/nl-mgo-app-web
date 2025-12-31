import { URL, fileURLToPath } from 'node:url';
import { DefinitionType, UnknownType, ts } from 'ts-json-schema-generator';
import { expect, test, vi } from 'vitest';
import { GenericTypeAliasParser } from './GenericTypeAliasParser.js';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

test('GenericTypeAliasParser falls back to UnknownType when no typeNode can be created', () => {
    const node = ts.createSourceFile(
        'test.ts',
        'type MyAlias = SomeType<string>;',
        ts.ScriptTarget.ESNext,
        true
    ).statements[0] as ts.TypeAliasDeclaration;

    const program = {
        getTypeChecker: () => ({
            getTypeAtLocation: () => ({}),
            typeToTypeNode: () => undefined,
        }),
    } as unknown as ts.Program;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parser = new GenericTypeAliasParser(program, { createType: vi.fn() } as any);

    const result = parser.createType(node) as DefinitionType;
    expect(result.getType()).toBeInstanceOf(UnknownType);
});
