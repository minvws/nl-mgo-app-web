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

/**
 * Supress and return any errors thrown, also ensure it is not logged to the console.
 */
export async function supressError(testFunc: TestFunction) {
    let error;
    mockConsoleError();

    try {
        testFunc();
    } catch (e) {
        error = e;
    }

    restoreConsoleError();
    return error;
}
