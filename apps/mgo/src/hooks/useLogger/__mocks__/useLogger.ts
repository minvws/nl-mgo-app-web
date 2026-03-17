import { LogFunction, Logger } from '@minvws/mgo-logging';
import { vi, type Mock } from 'vitest';

type UseLoggerMethod = () => {
    log: Logger;
};

export const mockLogError: Mock<LogFunction> = vi.fn();
export const mockLogWarn: Mock<LogFunction> = vi.fn();
export const mockLogInfo: Mock<LogFunction> = vi.fn();
export const mockLogDebug: Mock<LogFunction> = vi.fn();

export const useLogger: Mock<UseLoggerMethod> = vi.fn(() => ({
    log: {
        error: mockLogError,
        warn: mockLogWarn,
        info: mockLogInfo,
        debug: mockLogDebug,
    },
}));

export function resetUseLoggerMock() {
    useLogger.mockClear();
    mockLogError.mockReset();
    mockLogWarn.mockReset();
    mockLogInfo.mockReset();
    mockLogDebug.mockReset();
}
