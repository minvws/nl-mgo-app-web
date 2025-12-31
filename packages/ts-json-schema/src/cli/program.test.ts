import { expect, test, vi } from 'vitest';
import { emitJsonSchema, TsJsonSchemaOptions } from '../emit/emitJsonSchema.js';
import { program } from './program.js';

vi.mock('../emit/emitJsonSchema.js', () => ({
    emitJsonSchema: vi.fn(),
}));

const mockEmitJsonSchema = vi.mocked(emitJsonSchema);

test('calls emitJsonSchema with correct args', () => {
    const options: TsJsonSchemaOptions = {
        sourceFile: 'types.ts',
        tsConfig: 'tsconfig.json',
        outputFile: 'schema.json',
    };

    const argv = ['-c', options.tsConfig, '-o', options.outputFile, options.sourceFile];

    program.parse(argv, { from: 'user' });

    expect(mockEmitJsonSchema).toHaveBeenCalledWith({
        tsConfig: options.tsConfig,
        sourceFile: options.sourceFile,
        outputFile: options.outputFile,
        logger: expect.any(Object),
    });
});
