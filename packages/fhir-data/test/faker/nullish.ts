import { faker } from '@faker-js/faker';
import { type Nullable } from '../../src/types/Nullable';

export const nullish = <T = null>() => {
    return faker.helpers.arrayElement([null, undefined]) as Nullable<T>;
};
