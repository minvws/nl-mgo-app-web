import { noopLogger } from '@minvws/mgo-logging';
import { expectJson } from '@minvws/mgo-utils/test/shared';
import { URL, fileURLToPath } from 'node:url';
import { SchemaGenerator } from 'ts-json-schema-generator';
import { afterEach, expect, test, vi } from 'vitest';
import { generateJsonSchema } from './jsonSchema.js';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

afterEach(() => vi.restoreAllMocks());

test('01 - generates a JSON Schema from a TypeScript file', async () => {
    const schema = generateJsonSchema({
        tsConfig: resolvePath('./fixtures/01/tsconfig.json'),
        sourceFile: resolvePath('./fixtures/01/types.ts'),
        logger: noopLogger,
    });

    await expectJson(schema).toMatchFileSnapshot('./fixtures/01/schema.snap.json');
});

test('02 - can handle generic type aliases', async () => {
    const schema = generateJsonSchema({
        tsConfig: resolvePath('./fixtures/02/tsconfig.json'),
        sourceFile: resolvePath('./fixtures/02/types.ts'),
        logger: noopLogger,
    });

    await expectJson(schema).toMatchFileSnapshot('./fixtures/02/schema.snap.json');
});

test('03 - generic type names are normalized', async () => {
    const schema = generateJsonSchema({
        tsConfig: resolvePath('./fixtures/03/tsconfig.json'),
        sourceFile: resolvePath('./fixtures/03/types.ts'),
        logger: noopLogger,
    });

    await expectJson(schema).toMatchFileSnapshot('./fixtures/03/schema.snap.json');
});

test('throws an error if the TS config file does not exist', async () => {
    const invalidPath = 'invalid/path/to/tsconfig.json';
    expect(() =>
        generateJsonSchema({
            tsConfig: invalidPath,
            sourceFile: resolvePath('./fixtures/01/types.ts'),
            logger: noopLogger,
        })
    ).toThrow(`TS config file does not exist: ${invalidPath}`);
});

test('throws an error if the source file does not exist', async () => {
    const invalidPath = 'invalid/path/to/types.ts';
    expect(() =>
        generateJsonSchema({
            tsConfig: resolvePath('./fixtures/01/tsconfig.json'),
            sourceFile: invalidPath,
            logger: noopLogger,
        })
    ).toThrow(`Source file does not exist: ${invalidPath}`);
});

test('Throws if no definitions are found', async () => {
    vi.spyOn(SchemaGenerator.prototype, 'createSchema').mockReturnValue({});

    expect(() =>
        generateJsonSchema({
            tsConfig: resolvePath('./fixtures/01/tsconfig.json'),
            sourceFile: resolvePath('./fixtures/01/types.ts'),
            logger: noopLogger,
        })
    ).toThrow('No definitions found');
});
