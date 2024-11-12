import { faker } from '@faker-js/faker';
import { type DateTimeString } from '../../../../src/types/Fhir';

export const dateTime = (date?: Date) => {
    return (date ?? faker.date.anytime()).toISOString() as DateTimeString;
};
