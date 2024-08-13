import { faker } from '@faker-js/faker';
import { shuffle } from 'lodash';
import { type SetOptional } from 'type-fest';

export function collection<T>({
    min,
    max,
    factory,
}: {
    min?: number;
    max: number;
    factory: () => T;
}): T[] {
    return Array.from({ length: faker.number.int({ min, max }) }, factory);
}

/**
 * Randomly removes fields from the data object, but always keeps at least one.
 * Required fields can be specified to ensure that they are always included.
 */
export function mockOptionalFields<T extends object, R extends keyof T = never>(
    data: T,
    requiredFields?: R[]
): SetOptional<T, Exclude<keyof T, R>> {
    const entries = shuffle(Object.entries(data)).filter(([key, _value], i) => {
        return i === 0 || requiredFields?.includes(key as R) || Math.random() > 0.5;
    });
    return Object.fromEntries(entries) as SetOptional<T, Exclude<keyof T, R>>;
}
