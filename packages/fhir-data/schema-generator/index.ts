import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import {
    DEFAULT_CONFIG,
    SchemaGenerator,
    createFormatter,
    createParser,
    createProgram,
    type ChainNodeParser,
    type CompletedConfig,
} from 'ts-json-schema-generator';
import { URL, fileURLToPath } from 'url';
import { GenericTypeAliasParser } from './GenericTypeAliasParser';

// @ts-expect-error module is set to 'esnext' in tsconfig, but this file is not part of the source code
export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const tsConfig = resolvePath('../tsconfig.json');
const schemaPath = resolvePath('../dist/schema');
const sourceFile = resolve(schemaPath, './typescript/types.ts'); // has to be a .ts file (not .d.ts)
const outputFile = resolve(schemaPath, './json/types.json');

const config: CompletedConfig = {
    ...DEFAULT_CONFIG,
    path: sourceFile,
    tsconfig: tsConfig,
    type: '*',
    functions: 'hide',
    jsDoc: 'none',
};

const program = createProgram(config);
const parser = createParser(program, config, (prs) => {
    prs.addNodeParser(new GenericTypeAliasParser(program, prs as ChainNodeParser));
});

const formatter = createFormatter(config);
const generator = new SchemaGenerator(program, parser, formatter, config);
const schema = generator.createSchema(config.type);

/**
 * Function declarations are registered as an "UnknownType" under a wildcard key (*).
 * They are not used and quicktype does not support them, so they need to be removed.
 */
delete schema.definitions['*'];

const schemaString = JSON.stringify(schema, null, 2);

const outputDir = dirname(outputFile);
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputFile, schemaString);
