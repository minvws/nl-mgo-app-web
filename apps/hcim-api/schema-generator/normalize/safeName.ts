export function isSafeName(name: string) {
    return /^[A-Za-z_]\w*$/.test(name);
}

/**
 * This function transforms a name with special characters into a safe name.
 * This is necessary for the mobile apps to be able to translate the json schemas into their own types.
 */
export function makeSafeName(name: string) {
    return name
        .replace(/</g, '_Of_')
        .replace(/[>"()]/g, '')
        .replace(/,/g, '__')
        .replace(/\W/g, '_')
        .replace(/^(\d)/, '_$1');
}
