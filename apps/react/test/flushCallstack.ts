// save reference to the real setTimeout so we can still flush the callstack even when timers are faked.
const realSetTimeout = setTimeout;

/**
 * Flushes the Promise stack by awaiting a new immediate Promise.
 * @returns {Promise<void>} The Promise to be awaited for flush
 */
export async function flushCallStack(stackCount = 1) {
    while (stackCount >= 1) {
        await new Promise((resolve) => realSetTimeout(resolve));
        stackCount--;
    }
}
