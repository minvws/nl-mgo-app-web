import { faker } from '@faker-js/faker';
import { type TimeString } from '@minvws/mgo-fhir-types';

export const time = (time?: Date) => {
    const dateString = (time ?? faker.date.anytime()).toISOString();
    const options = [
        dateString.slice(11, 19),
        dateString.slice(11, 21),
        dateString.slice(11, 22),
        dateString.slice(11, 23),
    ] as TimeString[];
    return faker.helpers.arrayElement(options);
};
