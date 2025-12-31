import { faker } from '@faker-js/faker';
import { beforeEach, expect, test, vi } from 'vitest';
import { program } from './program.js';

vi.mock('./program.js', () => ({
    program: {
        parse: vi.fn(),
    },
}));

beforeEach(() => {
    vi.resetModules();
    vi.resetAllMocks();
});

test('should parse process.argv', async () => {
    const argv = ['-c', 'tsconfig.json', '-o', 'schema.json', 'types.ts'];
    vi.stubGlobal('process', { argv });
    await import('./index.js');
    expect(program.parse).toHaveBeenCalledWith(argv);
});

test('should log and exit when program errors', async () => {
    const mockProcess = { argv: [] };
    vi.stubGlobal('process', mockProcess);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const error = new Error(faker.lorem.sentence());
    vi.mocked(program.parse).mockImplementation(() => {
        throw error;
    });
    await import('./index.js');
    expect(consoleSpy).toHaveBeenCalledWith(error);
    expect((mockProcess as any).exitCode).toBe(1); // eslint-disable-line @typescript-eslint/no-explicit-any

    consoleSpy.mockRestore();
});
