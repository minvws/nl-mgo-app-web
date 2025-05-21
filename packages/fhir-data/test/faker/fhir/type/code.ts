import { faker } from '@faker-js/faker';

export function code<T extends string>(
    values: T[] = ['usual', 'official', 'temp', 'secondary'] as T[]
): T {
    return faker.helpers.arrayElement(values);
}
