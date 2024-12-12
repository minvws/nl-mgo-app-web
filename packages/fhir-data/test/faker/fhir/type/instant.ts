import { faker } from '@faker-js/faker';
import { type InstantDateTimeString } from '../../../../src/types/Fhir';

export const instant = (date?: Date) => {
    return (date ?? faker.date.anytime()).toISOString() as InstantDateTimeString;
};
