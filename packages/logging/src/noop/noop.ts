import type { Logger } from '../index.js';

const noop = () => {};

export const noopLogger: Logger = {
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
};
