import { consoleLogger } from '@minvws/mgo-logging';
import { Command } from 'commander';
import { emitJsonSchema, TsJsonSchemaOptions } from '../emit/emitJsonSchema.js';

export const program = new Command('emit-json-schema');

type RunCommandOptions = {
    tsConfig: string;
    outputFile: string;
};

export function runCommand(inputFile: string, options: RunCommandOptions) {
    const schemaOptions: TsJsonSchemaOptions = {
        sourceFile: inputFile,
        tsConfig: options.tsConfig,
        outputFile: options.outputFile,
        logger: consoleLogger,
    };
    emitJsonSchema(schemaOptions);
}

program
    .description('Emit a JSON Schema from a TypeScript file')
    .argument('<input-file>', 'The input TypeScript file')
    .requiredOption('-c, --ts-config <path>', 'The path to the TS config file')
    .requiredOption('-o, --output-file <path>', 'The path to the output file')
    .action(runCommand);
