import { noopLogger } from '@minvws/mgo-logging';
import { existsSync, readFileSync, rmSync } from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { afterEach, expect, test } from 'vitest';
import { emitJsonSchema, TsJsonSchemaOptions } from './emitJsonSchema.js';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));
export const resolveCwdRelativePath = (path: string) => relative(process.cwd(), resolvePath(path));

const defaultOutputFile = resolvePath('./fixtures/01/schema.snap.json');

afterEach(() => {
    if (existsSync(defaultOutputFile)) {
        rmSync(defaultOutputFile);
    }
});

test('01 - generates and emits a JSON Schema file from a TypeScript file', async () => {
    const options: TsJsonSchemaOptions = {
        tsConfig: resolvePath('./fixtures/01/tsconfig.json'),
        sourceFile: resolvePath('./fixtures/01/types.ts'),
        outputFile: resolvePath('./fixtures/01/schema.snap.json'),
        logger: noopLogger,
    };

    emitJsonSchema(options);

    console.log(process.cwd());

    expect(existsSync(options.outputFile)).toBe(true);

    const content = readFileSync(options.outputFile, 'utf-8');
    const schema = JSON.parse(content);
    expect(schema).toHaveProperty('$schema', 'http://json-schema.org/draft-07/schema#');
});

test('01 - works when using relative paths', async () => {
    const options: TsJsonSchemaOptions = {
        tsConfig: resolveCwdRelativePath('./fixtures/01/tsconfig.json'),
        sourceFile: resolveCwdRelativePath('./fixtures/01/types.ts'),
        outputFile: resolveCwdRelativePath('./fixtures/01/schema.snap.json'),
        logger: noopLogger,
    };

    emitJsonSchema(options);

    expect(existsSync(options.outputFile)).toBe(true);
});

test('01 - works output file is set to a new directory', async () => {
    const newDirectory = './fixtures/01/new-directory';
    const options: TsJsonSchemaOptions = {
        tsConfig: resolveCwdRelativePath('./fixtures/01/tsconfig.json'),
        sourceFile: resolveCwdRelativePath('./fixtures/01/types.ts'),
        outputFile: resolveCwdRelativePath(`${newDirectory}/schema.snap.json`),
        logger: noopLogger,
    };

    emitJsonSchema(options);

    expect(existsSync(options.outputFile)).toBe(true);

    const newDirectoryPath = resolveCwdRelativePath(newDirectory);
    if (existsSync(newDirectoryPath)) {
        rmSync(newDirectoryPath, { recursive: true });
    }
});
