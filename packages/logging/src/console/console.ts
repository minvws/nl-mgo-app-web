import type { LogFunction, Logger } from '../index.js';

function getSafeConsoleMethod(method: keyof Console): LogFunction {
    const consoleMethod = console?.[method];
    if (typeof consoleMethod === 'function') {
        return (consoleMethod as LogFunction).bind(console);
    }
    return () => {};
}

export const consoleLogger: Logger = {
    debug: getSafeConsoleMethod('debug'),
    info: getSafeConsoleMethod('info'),
    warn: getSafeConsoleMethod('warn'),
    error: getSafeConsoleMethod('error'),
};
