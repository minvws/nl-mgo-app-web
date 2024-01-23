const NONCE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';
const NUM_NONCE_CHARS = NONCE_CHARS.length;
const positiveInteger = (arg: number) => arg && arg > 0 && arg !== Infinity;

/**
 * Generate a pseudo-random nonce that matches /^[0-9A-Za-z-._]{length}$/.
 */
export function generateNonce(length: number): string {
    if (!window.crypto) throw new Error('Browser does not support Web Cryptography');
    if (!positiveInteger(length)) throw new Error('Nonce length must be positive and finite');
    return window.crypto
        .getRandomValues(new Uint8Array(length))
        .reduce((result, char) => result + NONCE_CHARS[char % NUM_NONCE_CHARS], '');
}
