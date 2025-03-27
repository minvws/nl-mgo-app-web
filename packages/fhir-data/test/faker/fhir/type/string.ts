import { faker } from '@faker-js/faker';

export function string(value?: string) {
    return value ?? faker.lorem.word();
}
