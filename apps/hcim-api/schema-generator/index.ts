import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';
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
import { GenericTypeAliasParser } from './GenericTypeAliasParser.js';
import { normalizeRefs } from './normalize/normalizeRefs.js';
import { SchemaWithDefinitions } from './types.js';

export const resolvePath = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const tsConfig = resolvePath('../tsconfig.types.json');
const sourceFile = resolvePath('../src/types.ts'); // has to be a .ts file (not .d.ts)
const outputFile = resolvePath('../build/mgo-hcim-api.types.json');

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
console.log(`generating JSON Schema from from: ${sourceFile}`);
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
console.log(`normalizing JSON Schema definition names`);
const normalizedSchema = normalizeRefs(schema as SchemaWithDefinitions);

const schemaString = JSON.stringify(normalizedSchema, null, 2);

console.log(`writing JSON Schema to: ${outputFile}`);
const outputDir = dirname(outputFile);
if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
}

writeFileSync(outputFile, schemaString);

console.log(`✨ JSON Schema generated successfully!`);
