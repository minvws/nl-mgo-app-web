import { faker } from '@faker-js/faker';

export const unsignedInt = (value?: number) => {
    return value ?? faker.number.int({ min: 0 });
};
