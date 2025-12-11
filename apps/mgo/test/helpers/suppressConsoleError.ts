import { vi, type MockInstance } from 'vitest';

type TestFunction = () => void | Promise<void>;

const mockConsoleError = () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
};

const restoreConsoleError = () => {
    const error = console.error as unknown as MockInstance;
    if (typeof error.mockRestore === 'function') {
        error.mockRestore();
    }
};

export async function suppressConsoleError(testFunc: TestFunction) {
    mockConsoleError();
    testFunc();
    restoreConsoleError();
}
