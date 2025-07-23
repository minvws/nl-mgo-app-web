import { faker } from '@faker-js/faker';

export const positiveInt = (value?: number) => {
    return value ?? faker.number.int({ min: 1 });
};
