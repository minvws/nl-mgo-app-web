import { faker } from '@faker-js/faker';
import { type InstantDateTimeString } from '@minvws/mgo-fhir-types';

export const instant = (date?: Date) => {
    return (date ?? faker.date.anytime()).toISOString() as InstantDateTimeString;
};
