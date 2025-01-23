import { faker } from '@faker-js/faker';
import { type DateTimeString } from '@minvws/mgo-fhir-types';

export const dateTime = (date?: Date) => {
    return (date ?? faker.date.anytime()).toISOString() as DateTimeString;
};
