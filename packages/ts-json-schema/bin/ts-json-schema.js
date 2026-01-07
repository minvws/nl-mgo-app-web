#!/usr/bin/env node

/**
 * This is a shim to allow the CLI to be ran from other (internal) packages.
 * A file needs to be present during the (p)npm install step to
 * allow a symlink to be created.
 */
try {
    await import('../dist/cli/index.js');
} catch (err) {
    const code = err?.code;
    if (code === 'ERR_MODULE_NOT_FOUND' || code === 'MODULE_NOT_FOUND') {
        console.error(
            'ts-json-schema is not built yet.\n' +
                'Run: pnpm exec nx build @minvws/mgo-ts-json-schema\n' +
                'Then rerun your command.'
        );
        process.exitCode = 1;
    }
    throw err;
}
