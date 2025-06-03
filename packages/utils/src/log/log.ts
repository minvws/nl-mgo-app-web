/* eslint-disable @typescript-eslint/no-explicit-any */

function logWarning(message?: any, ...optionalParams: any[]) {
    if ((import.meta as any)?.env?.DEV) {
        console.warn(message, ...optionalParams);
    }
}

function logError(message?: any, ...optionalParams: any[]) {
    if ((import.meta as any)?.env?.DEV) {
        console.error(message, ...optionalParams);
    }
}

/**
 * A very simple utility to log warning or error messages during vite development mode
 */
export const log = {
    warn: logWarning,
    error: logError,
};
