export function includesAll<T>(a: readonly T[], b: readonly T[]): boolean {
    const setA = new Set(a);
    return b.every((item) => setA.has(item));
}
