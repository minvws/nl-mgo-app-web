/**
 * A globally accessible / mutable configuration object.
 * Currently only used for disabling animations during unit tests.
 */
const config = {
    animations: true,
};

export function useConfig() {
    return config;
}
