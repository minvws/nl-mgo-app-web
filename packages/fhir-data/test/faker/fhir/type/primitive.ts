import { faker } from '@faker-js/faker';
import { type DateTimeString, type DateString } from '../../../../src/fhir';

export const date = (date?: Date) => {
    const dateString = (date || faker.date.anytime()).toISOString();
    const options = [
        dateString.slice(0, 4),
        dateString.slice(0, 7),
        dateString.slice(0, 10),
    ] as DateString[];
    return faker.helpers.arrayElement(options);
};

export const dateTime = (date?: Date) => {
    return (date || faker.date.anytime()).toISOString() as DateTimeString;
};
