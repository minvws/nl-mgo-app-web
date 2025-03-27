import { faker } from '@faker-js/faker';

export const integer64 = (value?: number) => {
    return value ?? faker.number.int();
};
