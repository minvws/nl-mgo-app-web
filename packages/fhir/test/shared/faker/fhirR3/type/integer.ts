import { faker } from '@faker-js/faker';

export const integer = (value?: number) => {
    return value ?? faker.number.int();
};
