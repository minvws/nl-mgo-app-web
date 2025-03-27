import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import {
    DEFAULT_CONFIG,
    SchemaGenerator,
    SubNodeParser,
    createFormatter,
    createParser,
    createProgram,
    type ChainNodeParser,
    type CompletedConfig,
} from 'ts-json-schema-generator';
import { URL, fileURLToPath } from 'url';
import { GenericTypeAliasParser } from './GenericTypeAliasParser';
import { SchemaWithDefinitions, normalizeRefs } from './normalizeRefs';

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
    prs.addNodeParser(new GenericTypeAliasParser(program, prs as ChainNodeParser) as SubNodeParser);
});

const formatter = createFormatter(config);
const generator = new SchemaGenerator(program, parser, formatter, config);
const schema = generator.createSchema(config.type);

if (typeof schema.definitions !== 'object') {
    throw new Error('No definitions found');
}

/**
 * Function declarations are registered as an "UnknownType" under a wildcard key (*).
 * They are not used and quicktype does not support them, so they need to be removed.
 */
delete schema.definitions['*'];

/**
 * Remove encoded characters in references and replace them with a simplified name.
 * This is necessary for the mobile apps to be able to translate the json schemas into their own types.
 */
const normalizedSchema = normalizeRefs(schema as SchemaWithDefinitions);

/**
 * Any definitions with special characters in the name, means it is not used in a ref.
 * For now we remove them from the schema as they are not used by themselves.
 */
for (const name in normalizedSchema.definitions) {
    if (name !== encodeURIComponent(name)) {
        console.warn(`Dropping definition with special characters: ${name}`);
        delete normalizedSchema.definitions[name];
    }
}

const schemaString = JSON.stringify(normalizedSchema, null, 2);

const outputDir = dirname(outputFile);
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputFile, schemaString);
