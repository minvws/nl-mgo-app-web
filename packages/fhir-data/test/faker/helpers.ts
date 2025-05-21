import { faker } from '@faker-js/faker';

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
