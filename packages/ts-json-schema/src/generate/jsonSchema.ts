import { consoleLogger, type Logger } from '@minvws/mgo-logging';
import assert from 'node:assert';
import { existsSync } from 'node:fs';
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
import { SchemaWithDefinitions } from '../schemaTypes.js';
import { GenericTypeAliasParser } from './GenericTypeAliasParser/GenericTypeAliasParser.js';
import { normalizeRefs } from './normalize/normalizeRefs.js';

export interface GenerateJsonSchemaOptions {
    tsConfig: string;
    sourceFile: string;
    logger?: Logger;
}

export function generateJsonSchema(options: GenerateJsonSchemaOptions): SchemaWithDefinitions {
    const { tsConfig, sourceFile, logger = consoleLogger } = options;

    assert(existsSync(tsConfig), `TS config file does not exist: ${tsConfig}`);
    assert(existsSync(sourceFile), `Source file does not exist: ${sourceFile}`);

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
        prs.addNodeParser(
            new GenericTypeAliasParser(program, prs as ChainNodeParser) as SubNodeParser
        );
    });

    const formatter = createFormatter(config);
    const generator = new SchemaGenerator(program, parser, formatter, config);

    logger.info(`generating JSON Schema from from: ${sourceFile}`);
    const schema = generator.createSchema(config.type);

    if (typeof schema.definitions !== 'object') {
        throw new Error('No definitions found');
    }

    /**
     * Function declarations are registered as an "UnknownType" under a wildcard key (*).
     * They are not used and some converters do not support them, so they need to be removed.
     */
    delete schema.definitions['*'];

    /**
     * Remove encoded characters in references and replace them with a simplified name.
     * This is necessary for the mobile apps to be able to translate the json schemas into their own types.
     */
    return normalizeRefs(schema as SchemaWithDefinitions);
}
