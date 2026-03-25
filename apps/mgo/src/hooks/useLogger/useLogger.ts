import { appConfig } from '$/config';
import { consoleLogger, noopLogger } from '@minvws/mgo-logging';

export function useLogger() {
    const log = appConfig.enable_debug_logging ? consoleLogger : noopLogger;
    return { log };
}
