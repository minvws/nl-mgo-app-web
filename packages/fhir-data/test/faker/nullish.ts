import { faker } from '@faker-js/faker';
import { type Nullable } from '@minvws/mgo-utils';

export const nullish = <T = null>() => {
    return faker.helpers.arrayElement([null, undefined]) as Nullable<T>;
};
