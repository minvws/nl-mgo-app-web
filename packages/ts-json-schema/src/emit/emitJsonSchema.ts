import { consoleLogger } from '@minvws/mgo-logging';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { generateJsonSchema, GenerateJsonSchemaOptions } from '../generate/jsonSchema.js';

export interface TsJsonSchemaOptions extends GenerateJsonSchemaOptions {
    outputFile: string;
}

function ensureAbsolutePath(path: string): string {
    return isAbsolute(path) ? path : resolve(process.cwd(), path);
}

function processOptions(options: TsJsonSchemaOptions): TsJsonSchemaOptions {
    return {
        ...options,
        tsConfig: ensureAbsolutePath(options.tsConfig),
        sourceFile: ensureAbsolutePath(options.sourceFile),
        outputFile: ensureAbsolutePath(options.outputFile),
    };
}

export function emitJsonSchema(options: TsJsonSchemaOptions): void {
    const { tsConfig, sourceFile, outputFile, logger = consoleLogger } = processOptions(options);

    const jsonSchema = generateJsonSchema({
        tsConfig,
        sourceFile,
        logger,
    });

    const schemaString = JSON.stringify(jsonSchema, null, 2);

    logger.info(`writing JSON Schema to: ${outputFile}`);

    const outputDir = dirname(outputFile);
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    writeFileSync(outputFile, schemaString);

    logger.info(`✨ JSON Schema generated successfully!`);
}
