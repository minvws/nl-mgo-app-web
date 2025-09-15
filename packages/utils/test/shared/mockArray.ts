function randomNumber(min: number, max: number) {
    if (min > max) {
        [min, max] = [max, min];
    }

    // eslint-disable-next-line sonarjs/pseudo-random
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function mockArray<T>({
    min = 0,
    max,
    factory,
}: {
    min?: number;
    max: number;
    factory: () => T;
}): T[] {
    return Array.from({ length: randomNumber(min, max) }, factory);
}
