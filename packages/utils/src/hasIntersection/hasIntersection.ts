export function hasIntersection<T>(a: T[], b: T[]): boolean {
    const setB = new Set(b);
    return a.some((item) => setB.has(item));
}
