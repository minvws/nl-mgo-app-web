import { faker } from '@faker-js/faker';

export const date = (date?: Date) => {
    const dateString = (date || faker.date.anytime()).toISOString();
    const options = [dateString.slice(0, 4), dateString.slice(0, 7), dateString.slice(0, 10)];
    return faker.helpers.arrayElement(options);
};

export const dateTime = (date?: Date) => {
    return (date || faker.date.anytime()).toISOString();
};
