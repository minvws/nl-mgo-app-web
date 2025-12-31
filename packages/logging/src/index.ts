export type LogFunction = (...args: unknown[]) => void;

export interface Logger {
    debug: LogFunction;
    info: LogFunction;
    warn: LogFunction;
    error: LogFunction;
}

export type LogLevel = keyof Logger;

export { consoleLogger } from './console/console.js';
export { noopLogger } from './noop/noop.js';
