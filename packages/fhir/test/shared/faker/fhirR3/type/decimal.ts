import { faker } from '@faker-js/faker';

export const decimal = (decimal?: number) => {
    return decimal ?? faker.number.float();
};
